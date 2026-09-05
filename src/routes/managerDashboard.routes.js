const express = require("express");

const router = express.Router();

const managerDashboardController = require("../controllers/managerDashboard.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// ----------------------------
// Get Manager Dashboard
// ----------------------------

router.get(
    "/",
    authenticate,
    authorize("manager", "admin"),
    managerDashboardController.getManagerDashboard
);

module.exports = router;
