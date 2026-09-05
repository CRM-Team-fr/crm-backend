const mongoose = require("mongoose");

const inventoryMovementSchema = new mongoose.Schema(
    {

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        type: {
            type: String,
            enum: ["stock_in", "stock_out", "adjustment", "damaged", "returned", "order", "cancellation"],
            required: [true, "Movement type is required."]
        },

        quantity: {
            type: Number,
            required: [true, "Quantity is required."]
        },

        previousStock: {
            type: Number,
            required: [true, "Previous stock is required."]
        },

        newStock: {
            type: Number,
            required: [true, "New stock is required."]
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        reason: {
            type: String,
            trim: true,
            maxlength: [200, "Reason must not exceed 200 characters."]
        },

        reference: {
            type: String,
            trim: true,
            maxlength: [100, "Reference must not exceed 100 characters."]
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

// ---------------- Indexes ----------------

inventoryMovementSchema.index({ product: 1, createdAt: -1 });
inventoryMovementSchema.index({ performedBy: 1 });
inventoryMovementSchema.index({ type: 1 });

// ---------------- Static Methods ----------------

inventoryMovementSchema.statics.findByProduct = function (productId) {
    return this.find({ product: productId }).sort({ createdAt: -1 });
};

inventoryMovementSchema.statics.findByType = function (type) {
    return this.find({ type }).sort({ createdAt: -1 });
};

module.exports = mongoose.model(
    "InventoryMovement",
    inventoryMovementSchema
);
