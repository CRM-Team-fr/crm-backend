const { body } = require("express-validator");

const createActivityValidator = [

    body("customerProfileId")
        .notEmpty()
        .withMessage("Customer Profile ID is required.")
        .isMongoId()
        .withMessage("Invalid customer profile ID."),

    body("activityType")
        .trim()
        .notEmpty()
        .withMessage("Activity type is required.")
        .isIn(["note", "call", "meeting", "email"])
        .withMessage("Invalid activity type."),

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ max: 100 })
        .withMessage("Title must not exceed 100 characters."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required.")
        .isLength({ max: 1000 })
        .withMessage("Description must not exceed 1000 characters."),

    body("metadata")
        .optional()
        .isObject()
        .withMessage("Metadata must be an object.")

];

module.exports = {

    createActivityValidator

};
