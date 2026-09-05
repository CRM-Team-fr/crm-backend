const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const {
    createProductValidator,
    updateProductValidator,
    stockAdjustmentValidator
} = require("../validators/product.validator");
const validate = require("../middlewares/validation.middleware");
const { uploadProductImage, cloudinaryUploadMiddleware } = require("../middlewares/upload.middleware");

// ----------------------------
// Create Product (Admin, Manager)
// ----------------------------

router.post(
    "/",
    authenticate,
    authorize("admin", "manager"),
    uploadProductImage.single("image"),
    cloudinaryUploadMiddleware,
    createProductValidator,
    validate,
    productController.createProduct
);

// ----------------------------
// Get Products (All authenticated roles)
// ----------------------------

router.get(
    "/",
    authenticate,
    productController.getProducts
);

// ----------------------------
// Get Product By ID (All authenticated roles)
// ----------------------------

router.get(
    "/:productId",
    authenticate,
    productController.getProductById
);

// ----------------------------
// Update Product (Admin, Manager)
// ----------------------------

router.patch(
    "/:productId",
    authenticate,
    authorize("admin", "manager"),
    uploadProductImage.single("image"),
    cloudinaryUploadMiddleware,
    updateProductValidator,
    validate,
    productController.updateProduct
);

// ----------------------------
// Update Product Status (Admin, Manager)
// ----------------------------

router.patch(
    "/:productId/status",
    authenticate,
    authorize("admin", "manager"),
    productController.updateProductStatus
);

// ----------------------------
// Adjust Stock (Admin, Manager)
// ----------------------------

router.patch(
    "/:productId/stock",
    authenticate,
    authorize("admin", "manager"),
    stockAdjustmentValidator,
    validate,
    productController.adjustStock
);

// ----------------------------
// Get Inventory Movements (Admin, Manager)
// ----------------------------

router.get(
    "/:productId/movements",
    authenticate,
    authorize("admin", "manager"),
    productController.getInventoryMovements
);

// ----------------------------
// Delete Product (Admin, Manager)
// ----------------------------

router.delete(
    "/:productId",
    authenticate,
    authorize("admin", "manager"),
    productController.deleteProduct
);

module.exports = router;
