const customerStageService = require("../services/customerStage.service");

// ----------------------------
// Update Customer Stage
// ----------------------------

const updateCustomerStage = async (req, res, next) => {

    try {

        const { customerProfileId } = req.params;

        const { customerStage } = req.body;

        const result = await customerStageService.updateCustomerStage(

            customerProfileId,

            customerStage,

            req.user

        );

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Available Customer Stages
// ----------------------------

const getAvailableStages = async (req, res, next) => {

    try {

        const result =
            await customerStageService.getAvailableStages();

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

module.exports = {

    updateCustomerStage,

    getAvailableStages

};