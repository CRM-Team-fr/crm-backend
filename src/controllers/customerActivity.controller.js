const customerActivityService = require("../services/customerActivity.service");
const createActivity = async (req, res, next) => {

    try {

        const result = await customerActivityService.createActivity({

            customerProfileId: req.body.customerProfileId,

            createdBy: req.user._id,

            activityType: req.body.activityType,

            title: req.body.title,

            description: req.body.description,

            metadata: req.body.metadata,

            loggedInUser: req.user

        });

        return res.status(201).json({

            success: true,

            message: "Activity created successfully.",

            activity: result

        });

    } catch (error) {

        next(error);

    }

};
const getCustomerActivities = async (req, res, next) => {

    try {

        const { customerProfileId } = req.params;

        const activities =
            await customerActivityService.getCustomerActivities(
                customerProfileId,
                req.user
            );

        return res.status(200).json({

            success: true,

            count: activities.length,

            activities

        });

    } catch (error) {

        next(error);

    }

};
const deleteActivity = async (req, res, next) => {

    try {

        const { activityId } = req.params;

        const result =
            await customerActivityService.deleteActivity(
                activityId
            );

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};
// Add this at the very bottom of your file:
module.exports = {
    createActivity,
    getCustomerActivities,
    deleteActivity
};