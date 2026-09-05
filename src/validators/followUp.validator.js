const { body } = require("express-validator");

const createFollowUpValidator = [

    body("customerProfileId")
        .notEmpty()
        .withMessage("Customer Profile ID is required.")
        .isMongoId()
        .withMessage("Invalid customer profile ID."),

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ max: 100 })
        .withMessage("Title must not exceed 100 characters."),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters."),

    body("followUpDate")
        .notEmpty()
        .withMessage("Follow-up date is required.")
        .isISO8601()
        .withMessage("Invalid date format."),

    body("taskType")
        .trim()
        .notEmpty()
        .withMessage("Task type is required.")
        .isIn([
            "call",
            "meeting",
            "visit",
            "email",
            "whatsapp",
            "quotation",
            "catalogue",
            "payment",
            "sample",
            "other"
        ])
        .withMessage("Invalid task type."),

    body("priority")
        .trim()
        .notEmpty()
        .withMessage("Priority is required.")
        .isIn(["low", "medium", "high", "urgent"])
        .withMessage("Invalid priority.")

];

const completeFollowUpValidator = [

    body("outcome")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Outcome must not exceed 500 characters."),

    body("remarks")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Remarks must not exceed 500 characters."),

    body("nextFollowUp")
        .optional()
        .isObject()
        .withMessage("nextFollowUp must be an object."),

    body("nextFollowUp.title")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Next follow-up title must not exceed 100 characters."),

    body("nextFollowUp.description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Next follow-up description must not exceed 500 characters."),

    body("nextFollowUp.followUpDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid next follow-up date format."),

    body("nextFollowUp.taskType")
        .optional()
        .trim()
        .isIn([
            "call",
            "meeting",
            "visit",
            "email",
            "whatsapp",
            "quotation",
            "catalogue",
            "payment",
            "sample",
            "other"
        ])
        .withMessage("Invalid next follow-up task type."),

    body("nextFollowUp.priority")
        .optional()
        .trim()
        .isIn(["low", "medium", "high", "urgent"])
        .withMessage("Invalid next follow-up priority.")

];

const rescheduleFollowUpValidator = [

    body("followUpDate")
        .notEmpty()
        .withMessage("Follow-up date is required.")
        .isISO8601()
        .withMessage("Invalid date format.")

];

const cancelFollowUpValidator = [

    body("reason")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Reason must not exceed 500 characters.")

];

module.exports = {

    createFollowUpValidator,

    completeFollowUpValidator,

    rescheduleFollowUpValidator,

    cancelFollowUpValidator

};
