const { body, param } = require("express-validator");

const createQuotationValidator = [

    body("customerProfileId")
        .notEmpty()
        .withMessage("Customer Profile ID is required.")
        .isMongoId()
        .withMessage("Invalid customer profile ID."),

    body("items")
        .isArray({ min: 1 })
        .withMessage("At least one item is required."),

    body("items.*.product")
        .notEmpty()
        .withMessage("Product ID is required for each item.")
        .isMongoId()
        .withMessage("Invalid product ID."),

    body("items.*.quantity")
        .notEmpty()
        .withMessage("Quantity is required for each item.")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1."),

    body("items.*.discount")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Item discount must be between 0 and 100."),

    body("items.*.tax")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Item tax must be between 0 and 100."),

    body("validUntil")
        .optional()
        .isISO8601()
        .withMessage("Invalid valid until date format."),

    body("notes")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Notes must not exceed 500 characters.")

];

const updateQuotationStatusValidator = [

    param("quotationId")
        .notEmpty()
        .withMessage("Quotation ID is required.")
        .isMongoId()
        .withMessage("Invalid quotation ID."),

    body("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required.")
        .isIn(["draft", "sent", "accepted", "rejected", "expired", "cancelled", "converted"])
        .withMessage("Invalid quotation status.")

];

const updateQuotationValidator = [

    param("quotationId")
        .notEmpty()
        .withMessage("Quotation ID is required.")
        .isMongoId()
        .withMessage("Invalid quotation ID."),

    body("items")
        .optional()
        .isArray({ min: 1 })
        .withMessage("At least one item is required."),

    body("items.*.product")
        .optional()
        .notEmpty()
        .withMessage("Product ID is required for each item.")
        .isMongoId()
        .withMessage("Invalid product ID."),

    body("items.*.quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1."),

    body("items.*.discount")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Item discount must be between 0 and 100."),

    body("items.*.tax")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Item tax must be between 0 and 100."),

    body("validUntil")
        .optional()
        .isISO8601()
        .withMessage("Invalid valid until date format."),

    body("notes")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Notes must not exceed 500 characters.")

];

module.exports = {

    createQuotationValidator,

    updateQuotationStatusValidator,

    updateQuotationValidator

};
