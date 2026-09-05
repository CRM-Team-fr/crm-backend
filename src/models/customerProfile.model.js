const mongoose = require("mongoose");
const CUSTOMER_STAGES = require("../constants/customerStages");

const customerProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        businessName: {
            type: String,
            required: true,
            trim: true
        },

        businessType: {
            type: String,
             required: true,
             trim: true
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
             required: true,
             trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        pincode: {
            type: String,
            required: true,
            trim: true
        },


        

        assignedSalesperson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        customerStage: {
            type: String,
            enum: CUSTOMER_STAGES,
            default: "new"
        },

        totalOrders: {
            type: Number,
            default: 0
        },

        totalRevenue: {
            type: Number,
            default: 0
        },

        outstandingAmount: {
            type: Number,
            default: 0
        },

        lastContactedAt: {
            type: Date,
            default: null
        },

        nextFollowUpAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// ---------------- Static Methods ----------------

customerProfileSchema.statics.findByUserId = function (userId) {
    return this.findOne({ user: userId });
};

customerProfileSchema.statics.findBySalesperson = function (salespersonId) {
    return this.find({
        assignedSalesperson: salespersonId
    }).populate("user");
};

// ---------------- Instance Methods ----------------

customerProfileSchema.methods.assignSalesperson = function (salespersonId) {
    this.assignedSalesperson = salespersonId;
};

customerProfileSchema.methods.updateStage = function (stage) {
    this.customerStage = stage;
};

// ---------------- Indexes ----------------

customerProfileSchema.index({
    assignedSalesperson: 1
});

customerProfileSchema.index({
    customerStage: 1
});

customerProfileSchema.index({
    city: 1,
    state: 1
});

module.exports = mongoose.model(
    "CustomerProfile",
    customerProfileSchema
);