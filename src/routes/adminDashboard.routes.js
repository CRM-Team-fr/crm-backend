const express = require("express");

const router = express.Router();

const adminDashboardController = require("../controllers/adminDashboard.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// ----------------------------
// Get Admin Dashboard
// ----------------------------

router.get(
    "/",
    authenticate,
    authorize("admin"),
    adminDashboardController.getAdminDashboard
);

module.exports = router;
