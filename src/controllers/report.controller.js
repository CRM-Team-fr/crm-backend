const reportService = require("../services/report.service");

// ----------------------------
// Sales Report
// ----------------------------

const getSalesReport = async (req, res, next) => {

    try {

        const report = await reportService.getSalesReport(req.user, req.query);

        return res.status(200).json({

            success: true,

            report

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Customer Report
// ----------------------------

const getCustomerReport = async (req, res, next) => {

    try {

        const report = await reportService.getCustomerReport(req.user, req.query);

        return res.status(200).json({

            success: true,

            report

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Product Report
// ----------------------------

const getProductReport = async (req, res, next) => {

    try {

        const report = await reportService.getProductReport(req.user, req.query);

        return res.status(200).json({

            success: true,

            report

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Inventory Report
// ----------------------------

const getInventoryReport = async (req, res, next) => {

    try {

        const report = await reportService.getInventoryReport(req.user, req.query);

        return res.status(200).json({

            success: true,

            report

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Payment Report
// ----------------------------

const getPaymentReport = async (req, res, next) => {

    try {

        const report = await reportService.getPaymentReport(req.user, req.query);

        return res.status(200).json({

            success: true,

            report

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Salesperson Report
// ----------------------------

const getSalespersonReport = async (req, res, next) => {

    try {

        const { salespersonId } = req.params;

        const report = await reportService.getSalespersonReport(salespersonId, req.user, req.query);

        return res.status(200).json({

            success: true,

            report

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Manager Report
// ----------------------------

const getManagerReport = async (req, res, next) => {

    try {

        const { managerId } = req.params;

        const report = await reportService.getManagerReport(managerId, req.user, req.query);

        return res.status(200).json({

            success: true,

            report

        });

    } catch (error) {

        next(error);

    }

};

module.exports = {

    getSalesReport,

    getCustomerReport,

    getProductReport,

    getInventoryReport,

    getPaymentReport,

    getSalespersonReport,

    getManagerReport

};
