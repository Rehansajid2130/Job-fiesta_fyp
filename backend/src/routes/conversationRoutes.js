const express = require('express');
const router = express.Router();
const {
  getConversations,
  getOrCreateConversation,
  getMessages,
  sendMessage,
  rateCandidate,
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getConversations)
  .post(getOrCreateConversation);

router.route('/messages')
  .post(sendMessage);

router.route('/:conversationId/messages')
  .get(getMessages);

router.route('/:id/rate')
  .post(rateCandidate);

module.exports = router;
