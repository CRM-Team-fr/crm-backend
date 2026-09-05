const salespersonPerformanceService = require("../services/salespersonPerformance.service");

// ----------------------------
// Get Salesperson Performance
// ----------------------------

const getSalespersonPerformance = async (req, res, next) => {

    try {

        const { salespersonId } = req.params;

        const performance = await salespersonPerformanceService.getSalespersonPerformance(

            salespersonId,

            req.user,

            req.query

        );

        return res.status(200).json({

            success: true,

            performance

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Salesperson Comparison
// ----------------------------

const getSalespersonComparison = async (req, res, next) => {

    try {

        const comparison = await salespersonPerformanceService.getSalespersonComparison(

            req.user,

            req.query

        );

        return res.status(200).json({

            success: true,

            comparison

        });

    } catch (error) {

        next(error);

    }

};

module.exports = {

    getSalespersonPerformance,

    getSalespersonComparison

};
