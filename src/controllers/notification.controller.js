const notificationService = require("../services/notification.service");

// ----------------------------
// Get User Notifications
// ----------------------------

const getUserNotifications = async (req, res, next) => {

    try {

        const result = await notificationService.getUserNotifications(

            req.user._id,

            req.query

        );

        return res.status(200).json({

            success: true,

            ...result

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Notification Summary
// ----------------------------

const getNotificationSummary = async (req, res, next) => {

    try {

        const summary = await notificationService.getNotificationSummary(req.user._id);

        return res.status(200).json({

            success: true,

            summary

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Mark Notification as Read
// ----------------------------

const markNotificationAsRead = async (req, res, next) => {

    try {

        const { notificationId } = req.params;

        const notification = await notificationService.markNotificationAsRead(

            notificationId,

            req.user._id

        );

        return res.status(200).json({

            success: true,

            message: "Notification marked as read.",

            notification

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Mark All Notifications as Read
// ----------------------------

const markAllNotificationsAsRead = async (req, res, next) => {

    try {

        const result = await notificationService.markAllNotificationsAsRead(req.user._id);

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

module.exports = {

    getUserNotifications,

    getNotificationSummary,

    markNotificationAsRead,

    markAllNotificationsAsRead

};
