const express = require("express");

const router = express.Router();

const salespersonPerformanceController = require("../controllers/salespersonPerformance.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// ----------------------------
// Get Salesperson Comparison
// ----------------------------

router.get(
    "/comparison",
    authenticate,
    authorize("admin", "manager"),
    salespersonPerformanceController.getSalespersonComparison
);

// ----------------------------
// Get Salesperson Performance
// ----------------------------

router.get(
    "/:salespersonId",
    authenticate,
    authorize("admin", "manager", "salesperson"),
    salespersonPerformanceController.getSalespersonPerformance
);

module.exports = router;
