const express = require("express");

const router = express.Router();

const orderReturnController = require("../controllers/orderReturn.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const {
    createOrderReturnValidator,
    updateOrderReturnStatusValidator
} = require("../validators/orderReturn.validator");
const validate = require("../middlewares/validation.middleware");

// ----------------------------
// Create Order Return (Admin, Manager, Salesperson, Customer)
// ----------------------------

router.post(
    "/",
    authenticate,
    authorize("admin", "manager", "salesperson", "customer"),
    createOrderReturnValidator,
    validate,
    orderReturnController.createOrderReturn
);

// ----------------------------
// Update Order Return Status (Admin, Manager)
// ----------------------------

router.patch(
    "/:returnId/status",
    authenticate,
    authorize("admin", "manager"),
    updateOrderReturnStatusValidator,
    validate,
    orderReturnController.updateOrderReturnStatus
);

// ----------------------------
// Get Order Returns (All authenticated roles)
// ----------------------------

router.get(
    "/order/:orderId",
    authenticate,
    orderReturnController.getOrderReturns
);

// ----------------------------
// Get Customer Returns (All authenticated roles)
// ----------------------------

router.get(
    "/customer/:customerProfileId",
    authenticate,
    orderReturnController.getCustomerReturns
);

// ----------------------------
// Get All Returns (Admin, Manager)
// ----------------------------

router.get(
    "/",
    authenticate,
    authorize("admin", "manager"),
    orderReturnController.getAllReturns
);

// ----------------------------
// Get Order Return By ID (All authenticated roles; service enforces ownership)
// ----------------------------

router.get(
    "/:returnId",
    authenticate,
    orderReturnController.getOrderReturnById
);

module.exports = router;
