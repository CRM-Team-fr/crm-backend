const orderService = require("../services/order.service");

// ----------------------------
// Create Order
// ----------------------------

const createOrder = async (req, res, next) => {

    try {

        const order = await orderService.createOrder(req.body, req.user);

        return res.status(201).json({

            success: true,

            message: "Order created successfully.",

            order

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Orders
// ----------------------------

const getOrders = async (req, res, next) => {

    try {

        const result = await orderService.getOrders(req.query, req.user);

        return res.status(200).json({

            success: true,

            ...result

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Order By ID
// ----------------------------

const getOrderById = async (req, res, next) => {

    try {

        const { orderId } = req.params;

        const order = await orderService.getOrderById(orderId, req.user);

        return res.status(200).json({

            success: true,

            order

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Update Order Status
// ----------------------------

const updateOrderStatus = async (req, res, next) => {

    try {

        const { orderId } = req.params;

        const order = await orderService.updateOrderStatus(
            orderId,
            req.body.orderStatus,
            req.user
        );

        return res.status(200).json({

            success: true,

            message: "Order status updated successfully.",

            order

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Update Payment Status
// ----------------------------

const updatePaymentStatus = async (req, res, next) => {

    try {

        const { orderId } = req.params;

        const order = await orderService.updatePaymentStatus(
            orderId,
            req.body.paymentStatus,
            req.user
        );

        return res.status(200).json({

            success: true,

            message: "Payment status updated successfully.",

            order

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Customer Orders
// ----------------------------

const getCustomerOrders = async (req, res, next) => {

    try {

        const { customerProfileId } = req.params;

        const result = await orderService.getCustomerOrders(customerProfileId, req.user);

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Salesperson Orders
// ----------------------------

const getSalespersonOrders = async (req, res, next) => {

    try {

        const { salespersonId } = req.params;

        const result = await orderService.getSalespersonOrders(salespersonId, req.user);

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

module.exports = {

    createOrder,

    getOrders,

    getOrderById,

    updateOrderStatus,

    updatePaymentStatus,

    getCustomerOrders,

    getSalespersonOrders

};
