const { body, param } = require("express-validator");

const createOrderValidator = [

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

    body("quotationId")
        .optional()
        .isMongoId()
        .withMessage("Invalid quotation ID."),

    body("paymentStatus")
        .optional()
        .isIn(["pending", "partial", "paid", "overdue", "cancelled"])
        .withMessage("Invalid payment status."),

    body("orderStatus")
        .optional()
        .isIn(["pending", "confirmed", "processing", "completed", "cancelled"])
        .withMessage("Invalid order status."),

    body("notes")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Notes must not exceed 500 characters.")

];

const updateOrderStatusValidator = [

    param("orderId")
        .notEmpty()
        .withMessage("Order ID is required.")
        .isMongoId()
        .withMessage("Invalid order ID."),

    body("orderStatus")
        .trim()
        .notEmpty()
        .withMessage("Order status is required.")
        .isIn(["pending", "confirmed", "processing", "completed", "cancelled"])
        .withMessage("Invalid order status.")

];

const updatePaymentStatusValidator = [

    param("orderId")
        .notEmpty()
        .withMessage("Order ID is required.")
        .isMongoId()
        .withMessage("Invalid order ID."),

    body("paymentStatus")
        .trim()
        .notEmpty()
        .withMessage("Payment status is required.")
        .isIn(["pending", "partial", "paid", "overdue", "cancelled"])
        .withMessage("Invalid payment status.")

];

module.exports = {

    createOrderValidator,

    updateOrderStatusValidator,

    updatePaymentStatusValidator

};
