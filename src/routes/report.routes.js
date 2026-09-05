const express = require("express");

const router = express.Router();

const reportController = require("../controllers/report.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// ----------------------------
// Sales Report
// ----------------------------

router.get(
    "/sales",
    authenticate,
    authorize("admin", "manager", "salesperson"),
    reportController.getSalesReport
);

// ----------------------------
// Customer Report
// ----------------------------

router.get(
    "/customers",
    authenticate,
    authorize("admin", "manager", "salesperson"),
    reportController.getCustomerReport
);

// ----------------------------
// Product Report
// ----------------------------

router.get(
    "/products",
    authenticate,
    authorize("admin", "manager"),
    reportController.getProductReport
);

// ----------------------------
// Inventory Report
// ----------------------------

router.get(
    "/inventory",
    authenticate,
    authorize("admin", "manager"),
    reportController.getInventoryReport
);

// ----------------------------
// Payment Report
// ----------------------------

router.get(
    "/payments",
    authenticate,
    authorize("admin", "manager", "salesperson"),
    reportController.getPaymentReport
);

// ----------------------------
// Salesperson Report
// ----------------------------

router.get(
    "/salesperson/:salespersonId",
    authenticate,
    authorize("admin", "manager", "salesperson"),
    reportController.getSalespersonReport
);

// ----------------------------
// Manager Report
// ----------------------------

router.get(
    "/manager/:managerId",
    authenticate,
    authorize("admin", "manager"),
    reportController.getManagerReport
);

module.exports = router;
