const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema(
    {

        customerProfile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CustomerProfile",
            required: true,
            index: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        followUpDate: {
            type: Date,
            required: true
        },

        taskType: {
            type: String,
            enum: [
                "call",
                "meeting",
                "visit",
                "email",
                "whatsapp",
                "quotation",
                "catalogue",
                "payment",
                "sample",
                "other"
            ],
            default: "call"
        },

        priority: {
            type: String,
            enum: [
                "low",
                "medium",
                "high",
                "urgent"
            ],
            default: "medium"
        },

        status: {
            type: String,
            enum: [
                "pending",
                "completed",
                "missed",
                "cancelled"
            ],
            default: "pending"
        },

        outcome: {
            type: String,
            default: ""
        },

        remarks: {
            type: String,
            default: ""
        },

        completedAt: {
            type: Date,
            default: null
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

// -----------------------
// Static Methods
// -----------------------

followUpSchema.statics.findPending = function () {

    return this.find({

        status: "pending"

    });

};

followUpSchema.statics.findPendingByCustomerProfile = function (
    customerProfileId
) {

    return this.find({

        customerProfile: customerProfileId,

        status: "pending"

    })
    .sort({

        followUpDate: 1

    });

};

// -----------------------
// Instance Methods
// -----------------------

followUpSchema.methods.complete = function (outcome, remarks = "") {

    this.status = "completed";

    this.completedAt = new Date();

    this.outcome = outcome;

    this.remarks = remarks;

};

followUpSchema.methods.cancel = function (reason = "") {

    this.status = "cancelled";

    this.remarks = reason;

};

// -----------------------
// Indexes
// -----------------------

followUpSchema.index({

    customerProfile: 1,

    status: 1

});

followUpSchema.index({

    followUpDate: 1

});

followUpSchema.index({

    status: 1,

    followUpDate: 1

});

module.exports = mongoose.model(
    "FollowUp",
    followUpSchema
);