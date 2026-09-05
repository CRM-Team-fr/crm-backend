// ----------------------------
// Customer Dashboard DTO
// ----------------------------

const buildCustomerDashboard = (dashboard) => {

    if (!dashboard) return null;

    return {

        profile: {

            businessName: dashboard.businessName,

            businessType: dashboard.businessType,

            address: dashboard.address,

            city: dashboard.city,

            state: dashboard.state,

            pincode: dashboard.pincode,

            assignedSalesperson: dashboard.assignedSalesperson

        },

        quotations: {

            total: dashboard.totalQuotations,

            data: dashboard.quotations

        },

        orders: {

            total: dashboard.totalOrders,

            data: dashboard.orders

        },

        payments: {

            totalPaid: dashboard.totalPaid,

            outstanding: dashboard.outstandingAmount,

            history: dashboard.payments

        },

        followUps: {

            total: dashboard.totalFollowUps,

            pending: dashboard.pendingFollowUps,

            completed: dashboard.completedFollowUps,

            data: dashboard.followUps

        }

    };

};

module.exports = {

    buildCustomerDashboard

};
