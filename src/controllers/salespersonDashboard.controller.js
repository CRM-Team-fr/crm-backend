const salespersonDashboardService = require("../services/salespersonDashboard.service");

const getSalespersonDashboard = async (req, res, next) => {

    try {

        const { salespersonId } = req.params;

        const dashboard = await salespersonDashboardService.getSalespersonDashboard(

            salespersonId,

            req.user,

            req.query

        );

        return res.status(200).json({

            success: true,

            dashboard

        });

    } catch (error) {

        next(error);

    }

};

module.exports = {

    getSalespersonDashboard

};
