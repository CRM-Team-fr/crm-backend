const mongoose = require("mongoose");

const orderReturnItemSchema = new mongoose.Schema(
    {

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        productName: {
            type: String,
            required: [true, "Product name is required."],
            trim: true
        },

        quantity: {
            type: Number,
            required: [true, "Quantity is required."],
            min: [1, "Quantity must be at least 1."]
        },

        unitPrice: {
            type: Number,
            required: [true, "Unit price is required."],
            min: [0, "Unit price cannot be negative."]
        },

        lineTotal: {
            type: Number,
            required: true
        }

    },
    { _id: true, versionKey: false }
);

const orderReturnSchema = new mongoose.Schema(
    {

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },

        customerProfile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CustomerProfile",
            required: true
        },

        items: {
            type: [orderReturnItemSchema],
            required: true,
            validate: {
                validator: function (v) {
                    return v.length > 0;
                },
                message: "At least one item is required."
            }
        },

        returnType: {
            type: String,
            enum: ["full", "partial"],
            required: true
        },

        reason: {
            type: String,
            required: [true, "Return reason is required."],
            trim: true,
            maxlength: [500, "Reason must not exceed 500 characters."]
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "completed"],
            default: "pending"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

// ---------------- Indexes ----------------

orderReturnSchema.index({ order: 1, createdAt: -1 });
orderReturnSchema.index({ customerProfile: 1, createdAt: -1 });
orderReturnSchema.index({ status: 1 });
orderReturnSchema.index({ createdBy: 1 });

// ---------------- Instance Methods ----------------

orderReturnSchema.methods.isPending = function () {
    return this.status === "pending";
};

orderReturnSchema.methods.isApproved = function () {
    return this.status === "approved";
};

orderReturnSchema.methods.isRejected = function () {
    return this.status === "rejected";
};

orderReturnSchema.methods.isCompleted = function () {
    return this.status === "completed";
};

orderReturnSchema.methods.canTransitionTo = function (newStatus) {
    const current = this.status;

    const allowedTransitions = {
        pending: ["approved", "rejected"],
        approved: ["completed", "rejected"],
        rejected: [],
        completed: []
    };

    return allowedTransitions[current]?.includes(newStatus) || false;
};

module.exports = mongoose.model("OrderReturn", orderReturnSchema);
