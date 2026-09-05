const customerDashboardService = require("../services/customerDashboard.service");

// ----------------------------
// Get Customer Dashboard
// ----------------------------

const getCustomerDashboard = async (req, res, next) => {

    try {

        const { customerProfileId } = req.params;

        const dashboard = await customerDashboardService.getCustomerDashboard(

            customerProfileId,

            req.user

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

    getCustomerDashboard

};
