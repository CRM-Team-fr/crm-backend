const express = require("express");

const router = express.Router();

const quotationController = require("../controllers/quotation.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const {
    createQuotationValidator,
    updateQuotationStatusValidator,
    updateQuotationValidator
} = require("../validators/quotation.validator");
const validate = require("../middlewares/validation.middleware");

// ----------------------------
// Create Quotation (Admin, Manager, Salesperson)
// ----------------------------

router.post(
    "/",
    authenticate,
    authorize("admin", "manager", "salesperson"),
    createQuotationValidator,
    validate,
    quotationController.createQuotation
);

// ----------------------------
// Get Quotations (All authenticated roles)
// ----------------------------

router.get(
    "/",
    authenticate,
    quotationController.getQuotations
);

// ----------------------------
// Get Quotation By ID (All authenticated roles)
// ----------------------------

router.get(
    "/:quotationId",
    authenticate,
    quotationController.getQuotationById
);

// ----------------------------
// Update Quotation (Admin, Manager, Salesperson - draft only)
// ----------------------------

router.patch(
    "/:quotationId",
    authenticate,
    authorize("admin", "manager", "salesperson"),
    updateQuotationValidator,
    validate,
    quotationController.updateQuotation
);

// ----------------------------
// Update Quotation Status (Admin, Manager, Salesperson)
// ----------------------------

router.patch(
    "/:quotationId/status",
    authenticate,
    authorize("admin", "manager", "salesperson", "customer"),
    updateQuotationStatusValidator,
    validate,
    quotationController.updateQuotationStatus
);

// ----------------------------
// Convert Quotation to Order (Admin, Manager, Salesperson)
// ----------------------------

router.post(
    "/:quotationId/convert",
    authenticate,
    authorize("admin", "manager", "salesperson"),
    quotationController.convertQuotationToOrder
);

// ----------------------------
// Get Customer Quotations (Admin, Manager, Salesperson, Customer)
// ----------------------------

router.get(
    "/customer/:customerProfileId",
    authenticate,
    quotationController.getCustomerQuotations
);

// ----------------------------
// Get Salesperson Quotations (Admin, Manager)
// ----------------------------

router.get(
    "/salesperson/:salespersonId",
    authenticate,
    authorize("admin", "manager"),
    quotationController.getSalespersonQuotations
);

// ----------------------------
// Delete Quotation (Admin, Manager)
// ----------------------------

router.delete(
    "/:quotationId",
    authenticate,
    authorize("admin", "manager"),
    quotationController.deleteQuotation
);

module.exports = router;
