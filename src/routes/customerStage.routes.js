const express = require("express");

const customerStageController = require("../controllers/customerStage.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const { updateCustomerStageValidator } = require("../validators/customerStage.validator");
const validate = require("../middlewares/validation.middleware");

const router = express.Router();

// Get all available customer stages
// Accessible at: /api/activities/stages (Assuming it is mounted on /api/activities)
router.get(
    "/stages",
    authenticate,
    authorize("admin", "salesperson"),
    customerStageController.getAvailableStages
);

// Update customer stage by ID directly
// Accessible at: /api/activities/:customerProfileId
router.patch(
    "/:customerProfileId/stage",
    authenticate,
    authorize("admin", "salesperson"),
    updateCustomerStageValidator,
    validate,
    customerStageController.updateCustomerStage
);

module.exports = router;