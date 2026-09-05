const { body } = require("express-validator");

const registerCustomerValidator = [

    body("Name")
        .trim()
        .notEmpty()
        .withMessage("Name is required."),

    body("phoneNumber")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required.")
        .isMobilePhone("en-IN")
        .withMessage("Invalid phone number."),

    body("businessName")
        .trim()
        .notEmpty()
        .withMessage("Business name is required."),

    body("businessType")
        .trim()
        .notEmpty()
        .withMessage("Business type is required."),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required."),

    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required."),

    body("state")
        .trim()
        .notEmpty()
        .withMessage("State is required."),

    body("pincode")
        .trim()
        .notEmpty()
        .withMessage("Pincode is required.")
        .isPostalCode("IN")
        .withMessage("Invalid Indian pincode.")

];

const customerLoginValidator = [

    body("phoneNumber")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required.")
        .isMobilePhone("en-IN")
        .withMessage("Invalid phone number.")

];

const employeeLoginValidator = [

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Invalid email."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")

];

const changePasswordValidator = [

    body("currentPassword")
        .notEmpty()
        .withMessage("Current password is required."),

    body("newPassword")
        .notEmpty()
        .withMessage("New password is required.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")

];

module.exports = {

    registerCustomerValidator,

    customerLoginValidator,

    employeeLoginValidator,

    changePasswordValidator

};