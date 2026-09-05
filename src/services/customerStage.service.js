const CustomerProfile = require("../models/customerProfile.model");
const BusinessError = require("../utils/errors/businessError");

const CUSTOMER_STAGES = require("../constants/customerStages");

const {
    createInternalActivity
} = require("./customerActivity.service");
const {
    verifyCustomerOwnership
} = require("../helpers/customerOwnership.helper");
// --------------------
// Update Customer Stage
// --------------------

const updateCustomerStage = async (
    customerProfileId,
    newStage,
    loggedInUser
) => {

    const customer = await CustomerProfile.findById(customerProfileId)
        .populate({
            path: "user",
            select: "Name"
        });

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

    if (!CUSTOMER_STAGES.includes(newStage)) {

        throw new BusinessError(
            "Invalid customer stage.",
            400
        );

    }

    const oldStage = customer.customerStage;

    if (oldStage === newStage) {

        throw new BusinessError(
            "Customer is already in this stage.",
            400
        );

    }

    customer.customerStage = newStage;

    await customer.save();

    // Automatically create activity
    await createInternalActivity({

        customerProfileId: customer._id,

        createdBy: loggedInUser._id,

        activityType: "stage_changed",

        title: "Customer Stage Updated",

        description:
            `Customer stage changed from "${oldStage}" to "${newStage}".`,

        metadata: {

            oldStage,

            newStage

        }

    });

    return {

        success: true,

        message: "Customer stage updated successfully.",

        customer: {

            id: customer._id,

            Name: customer.user.Name,

            customerStage: customer.customerStage

        }

    };

};

// --------------------
// Get Available Stages
// --------------------

const getAvailableStages = async () => {

    return {

        success: true,

        stages: CUSTOMER_STAGES

    };

};

module.exports = {

    updateCustomerStage,

    getAvailableStages

};