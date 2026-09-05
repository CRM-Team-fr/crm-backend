const { body, param } = require("express-validator");

const createPaymentValidator = [

    body("orderId")
        .notEmpty()
        .withMessage("Order ID is required.")
        .isMongoId()
        .withMessage("Invalid order ID."),

    body("amount")
        .notEmpty()
        .withMessage("Payment amount is required.")
        .isFloat({ min: 0.01 })
        .withMessage("Payment amount must be greater than 0."),

    body("paymentMethod")
        .trim()
        .notEmpty()
        .withMessage("Payment method is required.")
        .isIn(["cash", "bank_transfer", "upi", "cheque", "card", "other"])
        .withMessage("Invalid payment method."),

    body("paymentDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid payment date format."),

    body("transactionReference")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Transaction reference must not exceed 100 characters."),

    body("notes")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Notes must not exceed 500 characters.")

];

const getPaymentsValidator = [

    param("customerProfileId")
        .notEmpty()
        .withMessage("Customer Profile ID is required.")
        .isMongoId()
        .withMessage("Invalid customer profile ID.")

];

module.exports = {

    createPaymentValidator,

    getPaymentsValidator

};
