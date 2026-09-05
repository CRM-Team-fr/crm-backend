// ----------------------------
// Customer View
// (What the customer sees)
// ----------------------------

const buildCustomerProfile = (customerProfile) => {

    if (!customerProfile) return null;

    return {

        id: customerProfile._id,

        businessName: customerProfile.businessName,

        businessType: customerProfile.businessType,

        address: customerProfile.address,

        city: customerProfile.city,

        state: customerProfile.state,

        pincode: customerProfile.pincode,

        alternatePhoneNumber:
            customerProfile.alternatePhoneNumber

    };

};

// ----------------------------
// Salesperson View
// ----------------------------

const buildSalespersonCustomerProfile = (customerProfile) => {

    if (!customerProfile) return null;

    return {

        id: customerProfile._id,

        user: customerProfile.user,

        businessName: customerProfile.businessName,

        businessType: customerProfile.businessType,

        address: customerProfile.address,

        city: customerProfile.city,

        state: customerProfile.state,

        pincode: customerProfile.pincode,

        alternatePhoneNumber:
            customerProfile.alternatePhoneNumber,

        assignedSalesperson:
            customerProfile.assignedSalesperson,

        customerStage:
            customerProfile.customerStage,

        totalOrders:
            customerProfile.totalOrders,

        totalRevenue:
            customerProfile.totalRevenue,

        outstandingAmount:
            customerProfile.outstandingAmount,

        lastContactedAt:
            customerProfile.lastContactedAt,

        nextFollowUpAt:
            customerProfile.nextFollowUpAt,

        createdAt:
            customerProfile.createdAt,

        updatedAt:
            customerProfile.updatedAt

    };

};

// ----------------------------
// Admin View
// ----------------------------

const buildAdminCustomerProfile = (customerProfile) => {

    if (!customerProfile) return null;

    return {

        id: customerProfile._id,

        user: customerProfile.user,

        businessName: customerProfile.businessName,

        businessType: customerProfile.businessType,

        address: customerProfile.address,

        city: customerProfile.city,

        state: customerProfile.state,

        pincode: customerProfile.pincode,

        alternatePhoneNumber:
            customerProfile.alternatePhoneNumber,

        assignedSalesperson:
            customerProfile.assignedSalesperson,

        customerStage:
            customerProfile.customerStage,

        totalOrders:
            customerProfile.totalOrders,

        totalRevenue:
            customerProfile.totalRevenue,

        outstandingAmount:
            customerProfile.outstandingAmount,

        lastContactedAt:
            customerProfile.lastContactedAt,

        nextFollowUpAt:
            customerProfile.nextFollowUpAt,

        createdAt:
            customerProfile.createdAt,

        updatedAt:
            customerProfile.updatedAt

    };

};
// ----------------------------
// Customer Summary DTO
// ----------------------------

const buildCustomerSummary = (customerProfile) => {

    if (!customerProfile) return null;

    return {

        id: customerProfile._id,

        userId: customerProfile.user?._id,

        businessName: customerProfile.businessName,

        customerName: customerProfile.user?.Name,

        phoneNumber: customerProfile.user?.phoneNumber,

        customerStage: customerProfile.customerStage,

        status: customerProfile.user?.status

    };

};

module.exports = {

    buildCustomerProfile,

    buildSalespersonCustomerProfile,

    buildAdminCustomerProfile,
    
     buildCustomerSummary

};