const managerDashboardService = require("../services/managerDashboard.service");

// ----------------------------
// Get Manager Dashboard
// ----------------------------

const getManagerDashboard = async (req, res, next) => {

    try {

        const dashboard = await managerDashboardService.getManagerDashboard(

            req.user._id,

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

    getManagerDashboard

};
