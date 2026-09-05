const adminDashboardService = require("../services/adminDashboard.service");

// ----------------------------
// Get Admin Dashboard
// ----------------------------

const getAdminDashboard = async (req, res, next) => {

    try {

        const dashboard = await adminDashboardService.getAdminDashboard(

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

    getAdminDashboard

};
