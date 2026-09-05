const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
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

        discount: {
            type: Number,
            default: 0,
            min: [0, "Discount cannot be negative."],
            max: [100, "Discount cannot exceed 100%."]
        },

        tax: {
            type: Number,
            default: 0,
            min: [0, "Tax cannot be negative."],
            max: [100, "Tax cannot exceed 100%."]
        },

        lineTotal: {
            type: Number,
            required: true
        }

    },
    { _id: true, versionKey: false }
);

const orderSchema = new mongoose.Schema(
    {

        customerProfile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CustomerProfile",
            required: true
        },

        salesperson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        quotation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quotation",
            default: null
        },

        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: function (v) {
                    return v.length > 0;
                },
                message: "At least one item is required."
            }
        },

        subtotal: {
            type: Number,
            required: true,
            default: 0
        },

        discount: {
            type: Number,
            default: 0,
            min: [0, "Discount cannot be negative."]
        },

        tax: {
            type: Number,
            default: 0,
            min: [0, "Tax cannot be negative."]
        },

        grandTotal: {
            type: Number,
            required: true,
            default: 0
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "partial", "paid", "overdue", "cancelled"],
            default: "pending"
        },

        orderStatus: {
            type: String,
            enum: ["pending", "confirmed", "processing", "completed", "cancelled"],
            default: "pending"
        },

        notes: {
            type: String,
            trim: true,
            maxlength: [500, "Notes must not exceed 500 characters."]
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

orderSchema.index({ customerProfile: 1, createdAt: -1 });
orderSchema.index({ salesperson: 1, createdAt: -1 });
orderSchema.index({ quotation: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdBy: 1 });

// ---------------- Instance Methods ----------------

orderSchema.methods.isPending = function () {
    return this.orderStatus === "pending";
};

orderSchema.methods.isConfirmed = function () {
    return this.orderStatus === "confirmed";
};

orderSchema.methods.isProcessing = function () {
    return this.orderStatus === "processing";
};

orderSchema.methods.isCompleted = function () {
    return this.orderStatus === "completed";
};

orderSchema.methods.isCancelled = function () {
    return this.orderStatus === "cancelled";
};

orderSchema.methods.isPaymentPending = function () {
    return this.paymentStatus === "pending";
};

orderSchema.methods.isPaymentPaid = function () {
    return this.paymentStatus === "paid";
};

orderSchema.methods.canTransitionTo = function (newStatus) {
    const current = this.orderStatus;

    const allowedTransitions = {
        pending: ["confirmed", "cancelled"],
        confirmed: ["processing", "cancelled"],
        processing: ["completed", "cancelled"],
        completed: [],
        cancelled: []
    };

    return allowedTransitions[current]?.includes(newStatus) || false;
};

module.exports = mongoose.model("Order", orderSchema);







