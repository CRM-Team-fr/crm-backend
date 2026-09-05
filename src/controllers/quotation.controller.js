const quotationService = require("../services/quotation.service");

// ----------------------------
// Create Quotation
// ----------------------------

const createQuotation = async (req, res, next) => {

    try {

        const quotation = await quotationService.createQuotation(
            req.body,
            req.user
        );

        return res.status(201).json({

            success: true,

            message: "Quotation created successfully.",

            quotation

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Quotations
// ----------------------------

const getQuotations = async (req, res, next) => {

    try {

        const result = await quotationService.getQuotations(req.query, req.user);

        return res.status(200).json({

            success: true,

            ...result

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Quotation By ID
// ----------------------------

const getQuotationById = async (req, res, next) => {

    try {

        const { quotationId } = req.params;

        const quotation = await quotationService.getQuotationById(quotationId, req.user);

        return res.status(200).json({

            success: true,

            quotation

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Update Quotation
// ----------------------------

const updateQuotation = async (req, res, next) => {

    try {

        const { quotationId } = req.params;

        const quotation = await quotationService.updateQuotation(
            quotationId,
            req.body,
            req.user
        );

        return res.status(200).json({

            success: true,

            message: "Quotation updated successfully.",

            quotation

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Update Quotation Status
// ----------------------------

const updateQuotationStatus = async (req, res, next) => {

    try {

        const { quotationId } = req.params;

        const quotation = await quotationService.updateQuotationStatus(
            quotationId,
            req.body.status,
            req.user
        );

        return res.status(200).json({

            success: true,

            message: "Quotation status updated successfully.",

            quotation

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Customer Quotations
// ----------------------------

const getCustomerQuotations = async (req, res, next) => {

    try {

        const { customerProfileId } = req.params;

        const result = await quotationService.getCustomerQuotations(customerProfileId, req.user);

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Salesperson Quotations
// ----------------------------

const getSalespersonQuotations = async (req, res, next) => {

    try {

        const { salespersonId } = req.params;

        const result = await quotationService.getSalespersonQuotations(salespersonId, req.user);

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Delete Quotation
// ----------------------------

const deleteQuotation = async (req, res, next) => {

    try {

        const { quotationId } = req.params;

        const result = await quotationService.deleteQuotation(quotationId, req.user);

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

const convertQuotationToOrder = async (req, res, next) => {
    try {
        const { quotationId } = req.params;
        const { notes } = req.body || {};
        const result = await quotationService.convertQuotationToOrder(
            quotationId,
            req.user,
            { notes }
        );
        return res.status(201).json({
            success: true,
            message: "Quotation converted to order successfully.",
            ...result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {

    createQuotation,

    getQuotations,

    getQuotationById,

    updateQuotation,

    updateQuotationStatus,

    getCustomerQuotations,

    getSalespersonQuotations,

    deleteQuotation,

    convertQuotationToOrder

};
