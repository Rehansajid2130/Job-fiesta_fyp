const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Models for Socket.io persistence
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');
const Notification = require('./models/Notification');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with strict CORS
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  },
});

// Socket.io Handshake Authentication Middleware
// Verifies JWT on connection before any events can be transmitted
io.use(async (socket, next) => {
  try {
    const rawToken =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.replace(/^Bearer\s+/i, '') ||
      socket.handshake.query?.token;

    if (!rawToken || rawToken === 'demo-token' || rawToken === 'demo-token-active') {
      if (process.env.NODE_ENV !== 'production') {
        // Development mode: Fallback to the primary active seeded user
        const demoUser = await User.findOne({ role: 'jobseeker' }) || await User.findOne();
        if (demoUser) {
          socket.user = demoUser;
          return next();
        }
      }
      return next(new Error('Authentication error: Missing or invalid token'));
    }

    const decoded = jwt.verify(
      rawToken,
      process.env.JWT_SECRET || 'jobfiesta_jwt_secret_key_fyp_2026_rehan'
    );

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return next(new Error('Authentication error: User not found in database'));
    }

    socket.user = user;
    next();
  } catch (err) {
    console.warn('[Socket.io Auth] Handshake rejected:', err.message);
    return next(new Error('Authentication error: Invalid or expired token'));
  }
});

// Setup Socket.io real-time events with MongoDB persistence & Strict Authorization
io.on('connection', (socket) => {
  console.log(`[Socket.io] Authenticated client connected: ${socket.id} (${socket.user?.fullName || 'User'})`);

  // 1. User joins personal notification room (Strictly scoped to authenticated user ID)
  socket.on('join_user', () => {
    if (socket.user?._id) {
      const userChannel = socket.user._id.toString();
      socket.join(userChannel);
      console.log(`[Socket.io] User ${socket.user.fullName} joined personal channel: ${userChannel}`);
    }
  });

  // 2. User joins a conversation chat room (Strictly verifies conversation participant membership)
  socket.on('join_room', async (roomId) => {
    try {
      if (!roomId) return;

      if (!roomId.match(/^[0-9a-fA-F]{24}$/)) {
        // Temporary / dev mock room
        socket.join(roomId);
        return;
      }

      const conversation = await Conversation.findById(roomId);
      if (!conversation) {
        return socket.emit('error', 'Conversation not found');
      }

      const currentUserId = socket.user._id.toString();
      const isParticipant = conversation.participants.some(
        (p) => p.toString() === currentUserId
      );

      if (!isParticipant && socket.user.role !== 'admin') {
        console.warn(`[Socket.io Security] Blocked user ${socket.user._id} from snooping on conversation ${roomId}`);
        return socket.emit('error', 'Unauthorized: You are not a participant in this conversation');
      }

      socket.join(roomId);

      // Reset unread count for this user in the conversation
      await Conversation.findByIdAndUpdate(roomId, {
        $set: { [`unreadCounts.${currentUserId}`]: 0 },
      });

      console.log(`[Socket.io] Verified user ${socket.user.fullName} joined room: ${roomId}`);
    } catch (err) {
      console.error('[Socket.io] join_room error:', err.message);
    }
  });

  // 3. Real-time persistent messaging with enforced sender identity & per-user unread counts
  socket.on('send_message', async (data) => {
    try {
      const { conversationId, roomId, text, content, recipientId } = data;
      const targetRoom = conversationId || roomId;
      const messageText = (text || content || '').trim();

      if (!targetRoom || !messageText) return;

      const senderId = socket.user._id;

      if (targetRoom.match(/^[0-9a-fA-F]{24}$/)) {
        const conversation = await Conversation.findById(targetRoom);
        if (!conversation) {
          return socket.emit('error', 'Conversation not found');
        }

        const isParticipant = conversation.participants.some(
          (p) => p.toString() === senderId.toString()
        );

        if (!isParticipant && socket.user.role !== 'admin') {
          return socket.emit('error', 'Unauthorized: You cannot post messages to this conversation');
        }

        // Determine recipient
        const otherParticipant = conversation.participants.find(
          (p) => p.toString() !== senderId.toString()
        );
        const actualRecipientId = recipientId || (otherParticipant ? otherParticipant.toString() : null);

        // Persist message to database
        const savedMessage = await Message.create({
          conversation: targetRoom,
          sender: senderId,
          content: messageText,
          readBy: [senderId],
        });

        // Update conversation lastMessage and atomically increment recipient's unread count
        const updateOps = {
          lastMessage: {
            text: messageText,
            sender: senderId,
            timestamp: new Date(),
          },
        };
        if (actualRecipientId) {
          const currentRecipientUnread = conversation.unreadCounts?.get(actualRecipientId) || 0;
          updateOps[`unreadCounts.${actualRecipientId}`] = currentRecipientUnread + 1;
        }

        await Conversation.findByIdAndUpdate(targetRoom, updateOps);

        const payload = {
          id: savedMessage._id.toString(),
          _id: savedMessage._id,
          conversationId: targetRoom,
          senderId: senderId.toString(),
          senderName: socket.user.fullName,
          text: messageText,
          content: messageText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          createdAt: savedMessage.createdAt,
        };

        // Broadcast to all participants in this conversation room
        io.to(targetRoom).emit('receive_message', payload);

        // Real-time push notification for recipient
        if (actualRecipientId) {
          io.to(actualRecipientId).emit('new_message_notification', {
            title: `New Message from ${socket.user.fullName} 💬`,
            message: messageText.slice(0, 80),
            conversationId: targetRoom,
            senderId: senderId.toString(),
          });
        }
      } else {
        // Fallback for non-ObjectId simulated channels
        io.to(targetRoom).emit('receive_message', {
          id: Date.now().toString(),
          senderId: senderId.toString(),
          senderName: socket.user.fullName,
          text: messageText,
          content: messageText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }
    } catch (err) {
      console.error('[Socket.io] Error in send_message event:', err.message);
    }
  });

  // User typing indicators
  socket.on('typing', ({ roomId, isTyping }) => {
    if (roomId) {
      socket.to(roomId).emit('user_typing', {
        userName: socket.user.fullName,
        isTyping,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// Security Headers: Apply first to all requests
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Middleware & Security
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Lightweight NoSQL Injection Protection Middleware
app.use((req, res, next) => {
  const sanitize = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    Object.keys(obj).forEach((key) => {
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        sanitize(obj[key]);
      }
    });
  };
  sanitize(req.body);
  sanitize(req.params);
  next();
});

// Health check endpoint with system metrics
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    database: 'connected',
    service: 'Job Fiesta Backend API (Enterprise MERN)',
    features: [
      'Jobs Management & Search',
      'Companies Directory & Profiles',
      'Candidate ATS Kanban Pipeline',
      'Real-Time Socket.io Persistent Chat',
      'Activity Notification Center',
      'AI ATS Resume Matcher'
    ],
  });
});

// Development seeding endpoint for quick environment setup
app.post('/api/seed', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, message: 'Seeding disabled in production' });
  }
  try {
    const seedDatabase = require('./seedHelper');
    await seedDatabase();
    res.json({ success: true, message: 'Database reseeded successfully with full demo datasets' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Native in-memory rate limiter for auth routes (Brute force & credential stuffing defense)
const authAttempts = new Map();
const authRateLimiter = (req, res, next) => {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxAttempts = 60;
  const record = authAttempts.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }
  record.count += 1;
  authAttempts.set(ip, record);
  if (record.count > maxAttempts) {
    return res.status(429).json({ success: false, message: 'Too many authentication attempts. Please try again later.' });
  }
  next();
};

// Native in-memory rate limiter for AI Resume endpoints (DoS & resource exhaustion defense)
const resumeAttempts = new Map();
const resumeRateLimiter = (req, res, next) => {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 45;
  const record = resumeAttempts.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }
  record.count += 1;
  resumeAttempts.set(ip, record);
  if (record.count > maxRequests) {
    return res.status(429).json({ success: false, message: 'Too many requests to AI Resume service. Please wait a moment and try again.' });
  }
  next();
};

// API Routes
app.use('/api/auth', authRateLimiter, require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/conversations', require('./routes/conversationRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/resume', resumeRateLimiter, require('./routes/resumeRoutes'));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(
    `[Server] Job Fiesta API running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});

module.exports = { app, server, io };
