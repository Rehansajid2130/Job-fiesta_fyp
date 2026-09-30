const Notification = require('../models/Notification');
const { sendSuccess, sendError, asyncHandler } = require('../utils/response');

/**
 * @desc    Get user notifications with unread count
 * @route   GET /api/notifications
 * @access  Private
 */
const getNotifications = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;

  const [notifications, unreadCount] = await Promise.all([
    Notification.find({ recipient: currentUserId })
      .sort({ createdAt: -1 })
      .limit(50),
    Notification.countDocuments({ recipient: currentUserId, read: false }),
  ]);

  const formatted = notifications.map((n) => ({
    id: n._id.toString(),
    _id: n._id,
    title: n.title,
    message: n.message,
    type: n.type,
    link: n.link,
    read: n.read,
    unread: !n.read,
    time: formatTimeAgo(n.createdAt),
    createdAt: n.createdAt,
  }));

  return sendSuccess(res, formatted, 'Notifications retrieved successfully', 200, {
    count: formatted.length,
    unreadCount,
  });
});

/**
 * @desc    Mark single notification as read
 * @route   PATCH /api/notifications/:id/read
 * @access  Private
 */
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({
    _id: req.params.id,
    recipient: req.user._id,
  });

  if (!notification) {
    return sendError(res, 'Notification not found', 404);
  }

  notification.read = true;
  await notification.save();

  return sendSuccess(res, notification, 'Notification marked as read');
});

/**
 * @desc    Mark all user notifications as read
 * @route   PATCH /api/notifications/read-all
 * @access  Private
 */
const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user._id, read: false },
    { $set: { read: true } }
  );

  return sendSuccess(res, {}, 'All notifications marked as read');
});

/**
 * @desc    Delete notification
 * @route   DELETE /api/notifications/:id
 * @access  Private
 */
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndDelete({
    _id: req.params.id,
    recipient: req.user._id,
  });

  if (!notification) {
    return sendError(res, 'Notification not found', 404);
  }

  return sendSuccess(res, {}, 'Notification deleted successfully');
});

// Helper for relative timestamps
function formatTimeAgo(date) {
  if (!date) return 'Recently';
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
