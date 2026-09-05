const express = require("express");

const customerActivityController = require("../controllers/customerActivity.controller");

const 
    authenticate
 = require("../middlewares/auth.middleware");

const 
    authorize
 = require("../middlewares/role.middleware");
const { createActivityValidator } = require("../validators/activity.validator");
const validate = require("../middlewares/validation.middleware");

const router = express.Router();

// Create Activity (Salesperson/Admin)
router.post(
    "/",
    authenticate,
    authorize("admin", "salesperson"),
    createActivityValidator,
    validate,
    customerActivityController.createActivity
);

// Get Customer Timeline
router.get(
    "/customer/:customerProfileId",
    authenticate,
    authorize("admin", "salesperson", "customer"),
    customerActivityController.getCustomerActivities
);

// Delete Activity (Admin Only)
router.delete(
    "/:activityId",
    authenticate,
    authorize("admin"),
    customerActivityController.deleteActivity
);

module.exports = router;