const mongoose = require("mongoose");

const quotationItemSchema = new mongoose.Schema(
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

const quotationSchema = new mongoose.Schema(
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

        items: {
            type: [quotationItemSchema],
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

        status: {
            type: String,
            enum: ["draft", "sent", "accepted", "rejected", "expired", "cancelled", "converted"],
            default: "draft"
        },

        validUntil: {
            type: Date,
            default: null
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

quotationSchema.index({ customerProfile: 1, createdAt: -1 });
quotationSchema.index({ salesperson: 1, createdAt: -1 });
quotationSchema.index({ status: 1 });
quotationSchema.index({ createdBy: 1 });

// ---------------- Instance Methods ----------------

quotationSchema.methods.isDraft = function () {
    return this.status === "draft";
};

quotationSchema.methods.isSent = function () {
    return this.status === "sent";
};

quotationSchema.methods.isAccepted = function () {
    return this.status === "accepted";
};

quotationSchema.methods.isRejected = function () {
    return this.status === "rejected";
};

quotationSchema.methods.isExpired = function () {
    return this.status === "expired";
};

quotationSchema.methods.isCancelled = function () {
    return this.status === "cancelled";
};

quotationSchema.methods.isConverted = function () {
    return this.status === "converted";
};

quotationSchema.methods.isEditable = function () {
    return ["draft"].includes(this.status);
};

quotationSchema.methods.isDeletable = function () {
    return ["draft", "sent", "rejected", "expired", "cancelled"].includes(this.status);
};

quotationSchema.methods.canTransitionTo = function (newStatus) {
    const current = this.status;

    const allowedTransitions = {
        draft: ["sent", "cancelled"],
        sent: ["accepted", "rejected", "expired", "cancelled"],
        accepted: ["converted", "cancelled"],
        rejected: [],
        expired: [],
        cancelled: [],
        converted: []
    };

    return allowedTransitions[current]?.includes(newStatus) || false;
};

module.exports = mongoose.model("Quotation", quotationSchema);
