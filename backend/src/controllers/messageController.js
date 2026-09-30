const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { sendSuccess, sendError, asyncHandler } = require('../utils/response');

/**
 * @desc    Get all active conversations for the authenticated user
 * @route   GET /api/conversations
 * @access  Private
 */
const getConversations = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;

  const conversations = await Conversation.find({
    participants: currentUserId,
  })
    .populate('participants', 'fullName email avatar role headline company')
    .sort({ 'lastMessage.timestamp': -1, updatedAt: -1 });

  // Map to frontend-friendly format matching Figma chat interface
  const formatted = conversations.map((conv) => {
    const otherParticipant = conv.participants.find(
      (p) => p._id.toString() !== currentUserId.toString()
    ) || conv.participants[0] || {};

    return {
      id: conv._id.toString(),
      _id: conv._id,
      participantId: otherParticipant._id,
      participantName: otherParticipant.fullName || 'User',
      participantRole: otherParticipant.headline || (otherParticipant.role === 'recruiter' ? 'Recruiter' : 'Candidate'),
      participantAvatar: otherParticipant.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces',
      company: otherParticipant.company || '',
      lastMessage: conv.lastMessage?.text || '',
      lastMessageSender: conv.lastMessage?.sender,
      date: conv.lastMessage?.timestamp ? new Date(conv.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent',
      rated: conv.rated,
      rating: conv.rating,
      reviewText: conv.reviewText,
      updatedAt: conv.updatedAt,
    };
  });

  return sendSuccess(res, formatted, 'Conversations retrieved successfully', 200, {
    count: formatted.length,
  });
});

/**
 * @desc    Get or create a conversation with a specific user
 * @route   POST /api/conversations
 * @access  Private
 */
const getOrCreateConversation = asyncHandler(async (req, res) => {
  const { participantId } = req.body;
  const currentUserId = req.user._id;

  if (!participantId) {
    return sendError(res, 'Participant ID is required', 400);
  }

  if (participantId.toString() === currentUserId.toString()) {
    return sendError(res, 'Cannot start conversation with yourself', 400);
  }

  const targetUser = await User.findById(participantId);
  if (!targetUser) {
    return sendError(res, 'Participant not found', 404);
  }

  // Look for existing conversation between these two users
  let conversation = await Conversation.findOne({
    participants: { $all: [currentUserId, participantId] },
  }).populate('participants', 'fullName email avatar role headline company');

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [currentUserId, participantId],
      lastMessage: {
        text: 'Conversation started',
        sender: currentUserId,
        timestamp: new Date(),
      },
    });

    conversation = await Conversation.findById(conversation._id).populate(
      'participants',
      'fullName email avatar role headline company'
    );
  }

  return sendSuccess(res, conversation, 'Conversation ready', 200);
});

/**
 * @desc    Get messages for a conversation
 * @route   GET /api/messages/:conversationId
 * @access  Private
 */
const getMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const currentUserId = req.user._id;

  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    return sendError(res, 'Conversation not found', 404);
  }

  // Verify participant membership
  const isParticipant = conversation.participants.some(
    (p) => p.toString() === currentUserId.toString()
  );
  if (!isParticipant && req.user.role !== 'admin') {
    return sendError(res, 'Not authorized to view messages in this conversation', 403);
  }

  const messages = await Message.find({ conversation: conversationId })
    .populate('sender', 'fullName avatar role')
    .sort({ createdAt: 1 });

  const formattedMessages = messages.map((m) => ({
    id: m._id.toString(),
    _id: m._id,
    senderId: m.sender?._id,
    senderName: m.sender?.fullName,
    senderAvatar: m.sender?.avatar,
    senderRole: m.sender?.role,
    sender: m.sender?._id.toString() === currentUserId.toString() ? 'user' : 'other',
    text: m.content,
    content: m.content,
    timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    createdAt: m.createdAt,
  }));

  return sendSuccess(res, formattedMessages, 'Messages retrieved successfully', 200, {
    count: formattedMessages.length,
  });
});

/**
 * @desc    Send a message in a conversation (REST fallback / persistence)
 * @route   POST /api/messages
 * @access  Private
 */
const sendMessage = asyncHandler(async (req, res) => {
  const { conversationId, content } = req.body;
  const currentUserId = req.user._id;

  if (!conversationId || !content || !content.trim()) {
    return sendError(res, 'Conversation ID and message content are required', 400);
  }

  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    return sendError(res, 'Conversation not found', 404);
  }

  const isParticipant = conversation.participants.some(
    (p) => p.toString() === currentUserId.toString()
  );
  if (!isParticipant) {
    return sendError(res, 'Not authorized to post to this conversation', 403);
  }

  const message = await Message.create({
    conversation: conversationId,
    sender: currentUserId,
    content: content.trim(),
    readBy: [currentUserId],
  });

  // Update conversation's last message
  conversation.lastMessage = {
    text: content.trim(),
    sender: currentUserId,
    timestamp: new Date(),
  };
  await conversation.save();

  // Find recipient for notification
  const recipientId = conversation.participants.find(
    (p) => p.toString() !== currentUserId.toString()
  );

  if (recipientId) {
    await Notification.create({
      recipient: recipientId,
      sender: currentUserId,
      title: `New Message from ${req.user.fullName || 'User'} 💬`,
      message: content.trim().slice(0, 100),
      type: 'message',
      link: '/chat',
    });
  }

  const populated = await Message.findById(message._id).populate('sender', 'fullName avatar role');

  return sendSuccess(res, populated, 'Message sent successfully', 201);
});

/**
 * @desc    Rate jobseeker / candidate in conversation
 * @route   POST /api/conversations/:id/rate
 * @access  Private (Recruiter)
 */
const rateCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, reviewText } = req.body;

  const conversation = await Conversation.findById(id);
  if (!conversation) {
    return sendError(res, 'Conversation not found', 404);
  }

  conversation.rated = true;
  conversation.rating = Number(rating) || 5;
  conversation.reviewText = reviewText || '';
  await conversation.save();

  return sendSuccess(res, conversation, 'Candidate rating submitted successfully');
});

module.exports = {
  getConversations,
  getOrCreateConversation,
  getMessages,
  sendMessage,
  rateCandidate,
};
