const orderReturnService = require("../services/orderReturn.service");

// ----------------------------
// Create Order Return
// ----------------------------

const createOrderReturn = async (req, res, next) => {

    try {

        const orderReturn = await orderReturnService.createOrderReturn(req.body, req.user);

        return res.status(201).json({

            success: true,

            message: "Order return created successfully.",

            orderReturn

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Update Order Return Status
// ----------------------------

const updateOrderReturnStatus = async (req, res, next) => {

    try {

        const { returnId } = req.params;

        const orderReturn = await orderReturnService.updateOrderReturnStatus(
            returnId,
            req.body.status,
            req.user
        );

        return res.status(200).json({

            success: true,

            message: "Order return status updated successfully.",

            orderReturn

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Order Returns
// ----------------------------

const getOrderReturns = async (req, res, next) => {

    try {

        const { orderId } = req.params;

        const result = await orderReturnService.getOrderReturns(orderId, req.user);

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Customer Returns
// ----------------------------

const getCustomerReturns = async (req, res, next) => {

    try {

        const { customerProfileId } = req.params;

        const result = await orderReturnService.getCustomerReturns(customerProfileId, req.user);

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get All Returns
// ----------------------------

const getAllReturns = async (req, res, next) => {

    try {

        const result = await orderReturnService.getAllReturns(req.query, req.user);

        return res.status(200).json({

            success: true,

            ...result

        });

    } catch (error) {

        next(error);

    }

};

const getOrderReturnById = async (req, res, next) => {
    try {
        const result = await orderReturnService.getOrderReturnById(req.params.returnId, req.user);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {

    createOrderReturn,

    updateOrderReturnStatus,

    getOrderReturns,

    getCustomerReturns,

    getAllReturns,

    getOrderReturnById

};
