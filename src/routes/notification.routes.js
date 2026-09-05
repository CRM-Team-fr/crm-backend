const express = require("express");

const router = express.Router();

const notificationController = require("../controllers/notification.controller");

const authenticate = require("../middlewares/auth.middleware");

// ----------------------------
// Get User Notifications
// ----------------------------

router.get(
    "/",
    authenticate,
    notificationController.getUserNotifications
);

// ----------------------------
// Get Notification Summary
// ----------------------------

router.get(
    "/summary",
    authenticate,
    notificationController.getNotificationSummary
);

// ----------------------------
// Mark All Notifications as Read (defined before /:id/read to avoid ambiguity)
// ----------------------------

router.patch(
    "/read-all",
    authenticate,
    notificationController.markAllNotificationsAsRead
);

// ----------------------------
// Mark Notification as Read
// ----------------------------

router.patch(
    "/:notificationId/read",
    authenticate,
    notificationController.markNotificationAsRead
);

module.exports = router;
