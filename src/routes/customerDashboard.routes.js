const express = require("express");

const router = express.Router();

const customerDashboardController = require("../controllers/customerDashboard.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// ----------------------------
// Get Customer Dashboard
// ----------------------------

router.get(
    "/:customerProfileId",
    authenticate,
    authorize("admin", "manager", "salesperson", "customer"),
    customerDashboardController.getCustomerDashboard
);

module.exports = router;
