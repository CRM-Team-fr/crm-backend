const express = require("express");

const router = express.Router();

const followUpController =
require("../controllers/followUp.controller");

const authenticate =
require("../middlewares/auth.middleware");

const authorize =
require("../middlewares/role.middleware");
const {
    createFollowUpValidator,
    completeFollowUpValidator,
    rescheduleFollowUpValidator,
    cancelFollowUpValidator
} = require("../validators/followUp.validator");
const validate = require("../middlewares/validation.middleware");

// ---------------------------------
// Create Follow-up
// ---------------------------------

router.post(

    "/",

    authenticate,

    authorize("admin", "salesperson"),

    createFollowUpValidator,

    validate,

    followUpController.createFollowUp

);

// ---------------------------------
// My Follow-ups
// ---------------------------------

router.get(

    "/my",

    authenticate,

    authorize("salesperson"),

    followUpController.getMyFollowUps

);

// ---------------------------------
// Customer Follow-ups
// ---------------------------------

router.get(

    "/customer/:customerProfileId",

    authenticate,

    authorize("admin", "salesperson"),

    followUpController.getCustomerFollowUps

);

// ---------------------------------
// Today's Follow-ups
// ---------------------------------

router.get(

    "/today",

    authenticate,

    authorize("salesperson"),

    followUpController.getTodaysFollowUps

);

// ---------------------------------
// Overdue Follow-ups
// ---------------------------------

router.get(

    "/overdue",

    authenticate,

    authorize("salesperson"),

    followUpController.getOverdueFollowUps

);

// ---------------------------------
// Team Follow-ups (Manager)
// ---------------------------------

router.get(

    "/team",

    authenticate,

    authorize("manager"),

    followUpController.getTeamFollowUps

);

// ---------------------------------
// Complete Follow-up
// ---------------------------------

router.patch(

    "/:followUpId/complete",

    authenticate,

    authorize("admin", "salesperson"),

    completeFollowUpValidator,

    validate,

    followUpController.completeFollowUp

);

// ---------------------------------
// Reschedule Follow-up
// ---------------------------------

router.patch(

    "/:followUpId/reschedule",

    authenticate,

    authorize("admin", "salesperson"),

    rescheduleFollowUpValidator,

    validate,

    followUpController.rescheduleFollowUp

);

// ---------------------------------
// Cancel Follow-up
// ---------------------------------

router.patch(

    "/:followUpId/cancel",

    authenticate,

    authorize("admin", "salesperson"),

    cancelFollowUpValidator,

    validate,

    followUpController.cancelFollowUp

);

// ---------------------------------
// Delete Follow-up
// ---------------------------------

router.delete(

    "/:followUpId",

    authenticate,

    authorize("admin"),

    followUpController.deleteFollowUp

);

module.exports = router;