const { body, param } = require("express-validator");

const createOrderReturnValidator = [

    body("orderId")
        .notEmpty()
        .withMessage("Order ID is required.")
        .isMongoId()
        .withMessage("Invalid order ID."),

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

    body("returnType")
        .trim()
        .notEmpty()
        .withMessage("Return type is required.")
        .isIn(["full", "partial"])
        .withMessage("Invalid return type. Only full and partial are allowed."),

    body("reason")
        .trim()
        .notEmpty()
        .withMessage("Return reason is required.")
        .isLength({ max: 500 })
        .withMessage("Reason must not exceed 500 characters.")

];

const updateOrderReturnStatusValidator = [

    param("returnId")
        .notEmpty()
        .withMessage("Return ID is required.")
        .isMongoId()
        .withMessage("Invalid return ID."),

    body("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required.")
        .isIn(["pending", "approved", "rejected", "completed"])
        .withMessage("Invalid return status.")

];

module.exports = {

    createOrderReturnValidator,

    updateOrderReturnStatusValidator

};
