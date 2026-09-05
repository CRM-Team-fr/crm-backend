const CustomerProfile = require("../models/customerProfile.model");
const Quotation = require("../models/quotation.model");
const Order = require("../models/order.model");
const Payment = require("../models/payment.model");
const FollowUp = require("../models/followUp.model");
const BusinessError = require("../utils/errors/businessError");

const { buildCustomerDashboard } = require("../dto/customerDashboard.dto");

const roundToTwo = (value) => {
    return Math.round(value * 100) / 100;
};

// ----------------------------
// Get Customer Dashboard
// ----------------------------

const getCustomerDashboard = async (customerProfileId, loggedInUser) => {

    if (loggedInUser.role === "customer") {

        const customerProfile = await CustomerProfile.findById(customerProfileId);

        if (!customerProfile || customerProfile.user.toString() !== loggedInUser._id.toString()) {

            throw new BusinessError("You are not authorized to access this dashboard.", 403);

        }

    }

    const customerProfile = await CustomerProfile.findById(customerProfileId)

        .populate({

            path: "assignedSalesperson",

            select: "Name email phoneNumber"

        });

    if (!customerProfile) {

        throw new BusinessError("Customer not found.", 404);

    }

    // ----------------------------
    // Profile
    // ----------------------------

    const profile = {

        businessName: customerProfile.businessName,

        businessType: customerProfile.businessType,

        address: customerProfile.address,

        city: customerProfile.city,

        state: customerProfile.state,

        pincode: customerProfile.pincode,

        assignedSalesperson: customerProfile.assignedSalesperson ? {

            id: customerProfile.assignedSalesperson._id,

            Name: customerProfile.assignedSalesperson.Name,

            email: customerProfile.assignedSalesperson.email,

            phoneNumber: customerProfile.assignedSalesperson.phoneNumber

        } : null

    };

    // ----------------------------
    // Quotations
    // ----------------------------

    const quotations = await Quotation.find({ customerProfile: customerProfileId })

        .select("status validUntil grandTotal createdAt")

        .sort({ createdAt: -1 });

    // ----------------------------
    // Orders
    // ----------------------------

    const orders = await Order.find({ customerProfile: customerProfileId })

        .populate({ path: "salesperson", select: "Name" })

        .select("orderStatus grandTotal createdAt items")

        .sort({ createdAt: -1 });

    // ----------------------------
    // Payments
    // ----------------------------

    const payments = await Payment.find({ customerProfile: customerProfileId })

        .populate({ path: "order", select: "orderStatus grandTotal" })

        .select("amount paymentMethod paymentDate transactionReference")

        .sort({ createdAt: -1 });

    const totalPaid = roundToTwo(payments.reduce((sum, p) => sum + p.amount, 0));

    const outstandingAmount = roundToTwo(customerProfile.outstandingAmount || 0);

    // ----------------------------
    // Follow-ups
    // ----------------------------

    const followUps = await FollowUp.find({ customerProfile: customerProfileId })

        .populate({ path: "createdBy", select: "Name" })

        .select("title followUpDate status priority")

        .sort({ followUpDate: -1 });

    const totalFollowUps = followUps.length;

    const pendingFollowUps = followUps.filter(f => f.status === "pending").length;

    const completedFollowUps = followUps.filter(f => f.status === "completed").length;

    const dashboard = {

        ...profile,

        totalQuotations: quotations.length,

        quotations: quotations.map(q => ({

            id: q._id,

            status: q.status,

            validUntil: q.validUntil,

            grandTotal: q.grandTotal,

            createdAt: q.createdAt

        })),

        totalOrders: orders.length,

        orders: orders.map(o => ({

            id: o._id,

            orderStatus: o.orderStatus,

            grandTotal: o.grandTotal,

            createdAt: o.createdAt,

            items: o.items?.map(item => ({

                productName: item.productName,

                quantity: item.quantity,

                unitPrice: item.unitPrice

            })) || []

        })),

        totalPaid,

        outstandingAmount,

        payments: payments.map(p => ({

            id: p._id,

            amount: p.amount,

            paymentMethod: p.paymentMethod,

            paymentDate: p.paymentDate,

            transactionReference: p.transactionReference,

            order: p.order ? {

                id: p.order._id,

                orderStatus: p.order.orderStatus,

                grandTotal: p.order.grandTotal

            } : null

        })),

        totalFollowUps,

        pendingFollowUps,

        completedFollowUps,

        followUps: followUps.map(f => ({

            id: f._id,

            title: f.title,

            followUpDate: f.followUpDate,

            status: f.status,

            priority: f.priority,

            createdBy: f.createdBy ? {

                Name: f.createdBy.Name

            } : null

        }))

    };

    return buildCustomerDashboard(dashboard);

};

module.exports = {

    getCustomerDashboard

};
