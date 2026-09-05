const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {

        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        type: {
            type: String,
            enum: [
                "quotation_created",
                "quotation_sent",
                "quotation_accepted",
                "quotation_rejected",
                "follow_up_due",
                "follow_up_overdue",
                "order_created",
                "order_completed",
                "payment_received",
                "payment_overdue",
                "low_stock",
                "order_cancelled",
                "return_approved",
                "return_rejected",
                "return_completed"
            ],
            required: [true, "Notification type is required."]
        },

        title: {
            type: String,
            required: [true, "Notification title is required."],
            trim: true
        },

        message: {
            type: String,
            required: [true, "Notification message is required."],
            trim: true
        },

        isRead: {
            type: Boolean,
            default: false
        },

        referenceEntity: {
            type: String,
            enum: ["quotation", "order", "payment", "follow_up", "product", "return"],
            required: true
        },

        referenceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

// ---------------- Indexes ----------------

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ referenceEntity: 1, referenceId: 1 });

// ---------------- Instance Methods ----------------

notificationSchema.methods.isUnread = function () {
    return !this.isRead;
};

notificationSchema.methods.markAsRead = function () {
    this.isRead = true;
};

module.exports = mongoose.model("Notification", notificationSchema);
