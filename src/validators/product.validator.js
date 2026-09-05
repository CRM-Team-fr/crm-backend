const { body, param } = require("express-validator");

const createProductValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required.")
        .isLength({ max: 100 })
        .withMessage("Product name must not exceed 100 characters."),

    body("SKU")
        .trim()
        .notEmpty()
        .withMessage("SKU is required.")
        .isLength({ max: 50 })
        .withMessage("SKU must not exceed 50 characters.")
        .matches(/^[A-Z0-9\-]+$/)
        .withMessage("SKU must contain only uppercase letters, numbers, and hyphens."),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required.")
        .isLength({ max: 50 })
        .withMessage("Category must not exceed 50 characters."),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters."),

    body("sellingPrice")
        .notEmpty()
        .withMessage("Selling price is required.")
        .isFloat({ min: 0 })
        .withMessage("Selling price must be a non-negative number."),

    body("costPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Cost price must be a non-negative number."),

    body("tax")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Tax must be between 0 and 100."),

    body("unit")
        .trim()
        .notEmpty()
        .withMessage("Unit is required.")
        .isLength({ max: 20 })
        .withMessage("Unit must not exceed 20 characters."),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer."),

    body("minimumStock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Minimum stock must be a non-negative integer."),

    body("status")
        .optional()
        .isIn(["active", "inactive"])
        .withMessage("Invalid status. Only active and inactive are allowed.")

];

const updateProductValidator = [

    param("productId")
        .notEmpty()
        .withMessage("Product ID is required.")
        .isMongoId()
        .withMessage("Invalid product ID."),

    body("name")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Product name must not exceed 100 characters."),

    body("SKU")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("SKU must not exceed 50 characters.")
        .matches(/^[A-Z0-9\-]+$/)
        .withMessage("SKU must contain only uppercase letters, numbers, and hyphens."),

    body("category")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("Category must not exceed 50 characters."),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters."),

    body("sellingPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Selling price must be a non-negative number."),

    body("costPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Cost price must be a non-negative number."),

    body("tax")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Tax must be between 0 and 100."),

    body("unit")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("Unit must not exceed 20 characters."),

    body("minimumStock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Minimum stock must be a non-negative integer."),

    body("status")
        .optional()
        .isIn(["active", "inactive"])
        .withMessage("Invalid status. Only active and inactive are allowed.")

];

const stockAdjustmentValidator = [

    param("productId")
        .notEmpty()
        .withMessage("Product ID is required.")
        .isMongoId()
        .withMessage("Invalid product ID."),

    body("type")
        .trim()
        .notEmpty()
        .withMessage("Movement type is required.")
        .isIn(["stock_in", "stock_out", "adjustment", "damaged", "returned"])
        .withMessage("Invalid movement type."),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required.")
        .isInt({ min: 1 })
        .withMessage("Quantity must be a positive integer."),

    body("reason")
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage("Reason must not exceed 200 characters."),

    body("reference")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Reference must not exceed 100 characters.")

];

module.exports = {

    createProductValidator,

    updateProductValidator,

    stockAdjustmentValidator

};
