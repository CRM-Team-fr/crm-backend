const express = require("express");

const router = express.Router();

const salespersonDashboardController = require("../controllers/salespersonDashboard.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

router.get(
    "/:salespersonId",
    authenticate,
    authorize("admin", "manager", "salesperson"),
    salespersonDashboardController.getSalespersonDashboard
);

module.exports = router;
