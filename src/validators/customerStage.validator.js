const { body, param } = require("express-validator");

const updateCustomerStageValidator = [

    param("customerProfileId")
        .notEmpty()
        .withMessage("Customer Profile ID is required.")
        .isMongoId()
        .withMessage("Invalid customer profile ID."),

    body("customerStage")
        .trim()
        .notEmpty()
        .withMessage("Customer stage is required.")

];

module.exports = {

    updateCustomerStageValidator

};
