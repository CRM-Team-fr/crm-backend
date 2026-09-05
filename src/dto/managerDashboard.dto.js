// ----------------------------
// Manager Dashboard DTO
// ----------------------------

const buildManagerDashboard = (dashboard) => {

    if (!dashboard) return null;

    return {

        sales: {

            teamSales: dashboard.teamSales,

            totalOrders: dashboard.totalOrders,

            completedOrders: dashboard.completedOrders,

            averageOrderValue: dashboard.averageOrderValue,

            salesBySalesperson: dashboard.salesBySalesperson

        },

        crm: {

            totalCustomers: dashboard.totalCustomers,

            newCustomers: dashboard.newCustomers,

            activeCustomers: dashboard.activeCustomers,

            followUpCompletionRate: dashboard.followUpCompletionRate,

            overdueFollowUps: dashboard.overdueFollowUps

        },

        quotations: {

            created: dashboard.totalQuotations,

            accepted: dashboard.acceptedQuotations,

            rejected: dashboard.rejectedQuotations,

            conversionRate: dashboard.quotationConversionRate

        },

        payments: {

            collected: dashboard.totalPaymentsCollected,

            outstanding: dashboard.totalOutstandingAmount,

            overdue: dashboard.overduePayments

        },

        inventory: {

            lowStockProducts: dashboard.lowStockProducts,

            outOfStockProducts: dashboard.outOfStockProducts,

            bestSellingProducts: dashboard.bestSellingProducts

        },

        performance: {

            topSalesperson: dashboard.topSalesperson,

            lowestPerformingSalesperson: dashboard.lowestPerformingSalesperson,

            salespersonComparison: dashboard.salespersonComparison

        }

    };

};

module.exports = {

    buildManagerDashboard

};
