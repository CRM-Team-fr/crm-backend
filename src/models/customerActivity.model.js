const mongoose = require("mongoose");

const customerActivitySchema = new mongoose.Schema(
    {
        customerProfile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CustomerProfile",
            required: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        activityType: {
            type: String,
            enum: [
                "note",
                "call",
                "meeting",
                "email",
                "follow_up",
                "quotation",
                "order",
                "stage_changed",
                "system"
            ],
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        isPinned: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// ---------- Instance Methods ----------

customerActivitySchema.methods.pin = function () {
    this.isPinned = true;
};

customerActivitySchema.methods.unpin = function () {
    this.isPinned = false;
};

// ---------- Static Methods ----------

customerActivitySchema.statics.findCustomerTimeline = function (customerProfileId) {

    return this.find({
        customerProfile: customerProfileId
    })
        .populate({
            path: "createdBy",
            select: "Name role"
        })
        .sort({
            createdAt: -1
        });

};

// ---------- Indexes ----------

customerActivitySchema.index({
    customerProfile: 1,
    createdAt: -1
});

customerActivitySchema.index({
    createdBy: 1
});

customerActivitySchema.index({
    activityType: 1
});

module.exports = mongoose.model(
    "CustomerActivity",
    customerActivitySchema
);