const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const {
    createOrderValidator,
    updateOrderStatusValidator,
    updatePaymentStatusValidator
} = require("../validators/order.validator");
const validate = require("../middlewares/validation.middleware");

// ----------------------------
// Create Order (Admin, Manager, Salesperson)
// ----------------------------

router.post(
    "/",
    authenticate,
    authorize("admin", "manager", "salesperson", "customer"),
    createOrderValidator,
    validate,
    orderController.createOrder
);

// ----------------------------
// Get Orders (All authenticated roles)
// ----------------------------

router.get(
    "/",
    authenticate,
    orderController.getOrders
);

// ----------------------------
// Get Order By ID (All authenticated roles)
// ----------------------------

router.get(
    "/:orderId",
    authenticate,
    orderController.getOrderById
);

// ----------------------------
// Update Order Status (Admin, Manager, Salesperson)
// ----------------------------

router.patch(
    "/:orderId/status",
    authenticate,
    authorize("admin", "salesperson"),
    updateOrderStatusValidator,
    validate,
    orderController.updateOrderStatus
);

// ----------------------------
// Update Payment Status (Admin, Assigned Salesperson)
// ----------------------------

router.patch(
    "/:orderId/payment",
    authenticate,
    authorize("admin", "salesperson"),
    updatePaymentStatusValidator,
    validate,
    orderController.updatePaymentStatus
);

// ----------------------------
// Get Customer Orders (All authenticated roles)
// ----------------------------

router.get(
    "/customer/:customerProfileId",
    authenticate,
    orderController.getCustomerOrders
);

// ----------------------------
// Get Salesperson Orders (Admin, Manager)
// ----------------------------

router.get(
    "/salesperson/:salespersonId",
    authenticate,
    authorize("admin", "manager"),
    orderController.getSalespersonOrders
);

module.exports = router;
