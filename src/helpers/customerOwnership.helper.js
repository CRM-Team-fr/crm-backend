const CustomerProfile = require("../models/customerProfile.model");
const BusinessError = require("../utils/errors/businessError");

const verifyCustomerOwnership = async (
    customerProfileId,
    loggedInUser
) => {

    const customerProfile = await CustomerProfile.findById(
        customerProfileId
    );

    if (!customerProfile) {

        throw new BusinessError(
            "Customer not found.",
            404
        );

    }

    // Admin can access every customer regardless of assignment
    if (loggedInUser.role === "admin") {

        return customerProfile;

    }

    if (!customerProfile.assignedSalesperson) {

        throw new BusinessError(
            "Customer is not assigned to any salesperson.",
            400
        );

    }

    // Salesperson can access only assigned customers
    if (

        customerProfile.assignedSalesperson.toString() !==
        loggedInUser._id.toString()

    ) {

        throw new BusinessError(

            "You are not assigned to this customer.",

            403

        );

    }

    return customerProfile;

};

module.exports = {

    verifyCustomerOwnership

};