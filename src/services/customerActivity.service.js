const {
    buildActivity,
    buildActivityList
} = require("../dto/activity.dto");
const CustomerActivity = require("../models/customerActivity.model");
const CustomerProfile = require("../models/customerProfile.model");
const BusinessError = require("../utils/errors/businessError");
const {
    verifyCustomerOwnership
} = require("../helpers/customerOwnership.helper");
const createActivity = async (activityData) => {

    const {
        customerProfileId,
        createdBy,
        activityType,
        title,
        description,
        metadata = {},
        loggedInUser
    } = activityData;
    const allowedActivityTypes = [
    "note",
    "call",
    "meeting",
    "email"
    ];

if (!allowedActivityTypes.includes(activityType)) {
    throw new BusinessError(
        "Invalid activity type.",
        400
    );
}

    const customer = await CustomerProfile.findById(customerProfileId);

    if (!customer) {
        throw new BusinessError(
            "Customer not found.",
            404
        );
    }

    if (loggedInUser && loggedInUser.role === "salesperson") {
        await verifyCustomerOwnership(
            customerProfileId,
            loggedInUser
        );
    }

    const activity = await CustomerActivity.create({

        customerProfile: customerProfileId,

        createdBy,

        activityType,

        title,

        description,

        metadata

    });

  await activity.populate({
    path: "createdBy",
    select: "Name role"
});

return buildActivity(activity);

};
const getCustomerActivities = async (customerProfileId, loggedInUser) => {

    const customer = await CustomerProfile.findById(customerProfileId);

    if (!customer) {
        throw new BusinessError(
            "Customer not found.",
            404
        );
    }

    if (loggedInUser.role === "salesperson") {
        await verifyCustomerOwnership(
            customerProfileId,
            loggedInUser
        );
    }

    if (loggedInUser.role === "customer") {
        if (customer.user.toString() !== loggedInUser._id.toString()) {
            throw new BusinessError("You are not authorized to view this timeline.", 403);
        }
    }

    const activities =
        await CustomerActivity.findCustomerTimeline(
            customerProfileId
        );

    return buildActivityList(activities);

};
const deleteActivity = async (activityId) => {

    const activity =
        await CustomerActivity.findById(activityId);

    if (!activity) {

        throw new BusinessError(
            "Activity not found.",
            404
        );

    }

    await activity.deleteOne();

    return {

        success: true,

        message: "Activity deleted successfully."

    };

};
const createSystemActivity = async (activityData) => {

    const {
        customerProfileId,
        createdBy = null,
        title,
        description,
        metadata = {}
    } = activityData;

    const customer = await CustomerProfile.findById(customerProfileId);

    if (!customer) {
        throw new BusinessError(
            "Customer not found.",
            404
        );
    }

    const activity = await CustomerActivity.create({

        customerProfile: customerProfileId,

        createdBy,

        activityType: "system",

        title,

        description,

        metadata

    });

   await activity.populate({
    path: "createdBy",
    select: "Name role"
});

return buildActivity(activity); 

};
const createInternalActivity = async (activityData) => {

    const {
        customerProfileId,
        createdBy = null,
        activityType,
        title,
        description,
        metadata = {}
    } = activityData;

    const customer = await CustomerProfile.findById(customerProfileId);

    if (!customer) {
        throw new BusinessError("Customer not found.", 404);
    }

    const allowedInternalTypes = [
        "system",
        "stage_changed",
        "follow_up",
        "quotation",
        "order"
    ];

    if (!allowedInternalTypes.includes(activityType)) {
        throw new BusinessError("Invalid internal activity type.", 400);
    }

    const activity = await CustomerActivity.create({

        customerProfile: customerProfileId,

        createdBy,

        activityType,

        title,

        description,

        metadata

    });

await activity.populate({
    path: "createdBy",
    select: "Name role"
});

return buildActivity(activity);

};

module.exports = {

    createActivity,

    createInternalActivity,

    getCustomerActivities,

    deleteActivity, 

    createSystemActivity
};