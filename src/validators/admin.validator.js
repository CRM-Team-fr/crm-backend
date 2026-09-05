const { body, param } = require("express-validator");

const createEmployeeValidator = [

    body("Name")
        .trim()
        .notEmpty()
        .withMessage("Name is required."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Invalid email."),

    body("phoneNumber")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required.")
        .isMobilePhone("en-IN")
        .withMessage("Invalid phone number."),

    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required.")
        .isIn(["manager", "salesperson"])
        .withMessage("Invalid role. Only manager and salesperson are allowed.")

];

const approveCustomerValidator = [

    body("customerId")
        .notEmpty()
        .withMessage("Customer ID is required.")
        .isMongoId()
        .withMessage("Invalid customer ID.")

];

const assignSalespersonValidator = [

    body("customerId")
        .notEmpty()
        .withMessage("Customer ID is required.")
        .isMongoId()
        .withMessage("Invalid customer ID."),

    body("salespersonId")
        .notEmpty()
        .withMessage("Salesperson ID is required.")
        .isMongoId()
        .withMessage("Invalid salesperson ID.")

];

const approveAndAssignValidator = [

    body("customerId")
        .notEmpty()
        .withMessage("Customer ID is required.")
        .isMongoId()
        .withMessage("Invalid customer ID."),

    body("salespersonId")
        .notEmpty()
        .withMessage("Salesperson ID is required.")
        .isMongoId()
        .withMessage("Invalid salesperson ID.")

];

const updateCustomerStatusValidator = [

    body("customerId")
        .notEmpty()
        .withMessage("Customer ID is required.")
        .isMongoId()
        .withMessage("Invalid customer ID."),

    body("status")
        .notEmpty()
        .withMessage("Status is required.")
        .isIn(["approved", "suspended"])
        .withMessage("Status must be approved or suspended.")

];

const removeEmployeeValidator = [

    param("employeeId")
        .notEmpty()
        .withMessage("Employee ID is required.")
        .isMongoId()
        .withMessage("Invalid employee ID.")

];

module.exports = {

    createEmployeeValidator,

    approveCustomerValidator,

    assignSalespersonValidator,

    approveAndAssignValidator,

    removeEmployeeValidator,

    updateCustomerStatusValidator

};
