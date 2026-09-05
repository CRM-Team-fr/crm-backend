// ----------------------------
// Notification DTO
// ----------------------------

const buildNotification = (notification) => {

    if (!notification) return null;

    return {

        id: notification._id,

        recipient: notification.recipient,

        type: notification.type,

        title: notification.title,

        message: notification.message,

        isRead: notification.isRead,

        referenceEntity: notification.referenceEntity,

        referenceId: notification.referenceId,

        createdAt: notification.createdAt,

        updatedAt: notification.updatedAt

    };

};

// ----------------------------
// Notification List DTO
// ----------------------------

const buildNotificationList = (notifications = []) => {

    return notifications.map(buildNotification);

};

// ----------------------------
// Notification Summary DTO
// ----------------------------

const buildNotificationSummary = (summary) => {

    if (!summary) return null;

    return {

        total: summary.total,

        unread: summary.unread,

        read: summary.read

    };

};

module.exports = {

    buildNotification,

    buildNotificationList,

    buildNotificationSummary

};
