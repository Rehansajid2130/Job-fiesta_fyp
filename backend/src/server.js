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

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  },
});

// Setup Socket.io real-time events with MongoDB persistence
io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  // User joins their personal notification room
  socket.on('join_user', (userId) => {
    if (userId) {
      socket.join(userId);
      console.log(`[Socket.io] User ${userId} joined personal notification channel`);
    }
  });

  // User joins a conversation chat room
  socket.on('join_room', (roomId) => {
    if (roomId) {
      socket.join(roomId);
      console.log(`[Socket.io] Socket ${socket.id} joined room: ${roomId}`);
    }
  });

  // Real-time persistent messaging
  socket.on('send_message', async (data) => {
    try {
      const { conversationId, roomId, senderId, text, content, recipientId } = data;
      const targetRoom = conversationId || roomId;
      const messageText = (text || content || '').trim();

      if (targetRoom && messageText) {
        // If targetRoom is a valid MongoDB ObjectId, persist to database
        let savedMessage = null;
        if (targetRoom.match(/^[0-9a-fA-F]{24}$/) && senderId && senderId.match(/^[0-9a-fA-F]{24}$/)) {
          savedMessage = await Message.create({
            conversation: targetRoom,
            sender: senderId,
            content: messageText,
            readBy: [senderId],
          });

          await Conversation.findByIdAndUpdate(targetRoom, {
            lastMessage: {
              text: messageText,
              sender: senderId,
              timestamp: new Date(),
            },
          });
        }

        const payload = {
          ...data,
          id: savedMessage ? savedMessage._id.toString() : Date.now().toString(),
          _id: savedMessage ? savedMessage._id : undefined,
          text: messageText,
          content: messageText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        // Broadcast to all participants in this conversation room
        io.to(targetRoom).emit('receive_message', payload);

        // Real-time notification for recipient
        if (recipientId) {
          io.to(recipientId).emit('new_message_notification', {
            title: 'New Message 💬',
            message: messageText.slice(0, 80),
            conversationId: targetRoom,
          });
        }
      }
    } catch (err) {
      console.error('[Socket.io] Error in send_message event:', err.message);
    }
  });

  // User typing indicators
  socket.on('typing', ({ roomId, userName, isTyping }) => {
    if (roomId) {
      socket.to(roomId).emit('user_typing', { userName, isTyping });
    }
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/conversations', require('./routes/conversationRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

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
