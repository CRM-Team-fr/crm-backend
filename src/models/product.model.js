const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Product name is required."],
            trim: true,
            maxlength: [100, "Product name must not exceed 100 characters."]
        },

        SKU: {
            type: String,
            required: [true, "SKU is required."],
            trim: true,
            unique: true,
            uppercase: true,
            maxlength: [50, "SKU must not exceed 50 characters."]
        },

        category: {
            type: String,
            required: [true, "Category is required."],
            trim: true,
            maxlength: [50, "Category must not exceed 50 characters."]
        },

        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description must not exceed 500 characters."]
        },

        sellingPrice: {
            type: Number,
            required: [true, "Selling price is required."],
            min: [0, "Selling price cannot be negative."]
        },

        costPrice: {
            type: Number,
            min: [0, "Cost price cannot be negative."]
        },

        tax: {
            type: Number,
            default: 0,
            min: [0, "Tax cannot be negative."],
            max: [100, "Tax cannot exceed 100%."]
        },

        unit: {
            type: String,
            required: [true, "Unit is required."],
            trim: true,
            maxlength: [20, "Unit must not exceed 20 characters."]
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: [0, "Stock cannot be negative."]
        },

        minimumStock: {
            type: Number,
            required: true,
            default: 0,
            min: [0, "Minimum stock cannot be negative."]
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        image: {
            type: String,
            default: null
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

// ---------------- Indexes ----------------

productSchema.index({ category: 1 });
productSchema.index({ status: 1 });
productSchema.index({ stock: 1 });
productSchema.index({ createdAt: -1 });

// ---------------- Instance Methods ----------------

productSchema.methods.isLowStock = function () {
    return this.stock <= this.minimumStock && this.stock > 0;
};

productSchema.methods.isOutOfStock = function () {
    return this.stock === 0;
};

productSchema.methods.isActive = function () {
    return this.status === "active";
};

// ---------------- Static Methods ----------------

productSchema.statics.findActive = function () {
    return this.find({ status: "active" });
};

productSchema.statics.findLowStock = function () {
    return this.find({
        stock: { $lte: "$minimumStock", $gt: 0 },
        status: "active"
    });
};

productSchema.statics.findOutOfStock = function () {
    return this.find({
        stock: 0,
        status: "active"
    });
};

module.exports = mongoose.model("Product", productSchema);
