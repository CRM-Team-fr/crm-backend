// ----------------------------
// Payment DTO
// ----------------------------

const buildPayment = (payment) => {

    if (!payment) return null;

    return {

        id: payment._id,

        customerProfileId: payment.customerProfile,

        orderId: payment.order,

        amount: payment.amount,

        paymentMethod: payment.paymentMethod,

        paymentDate: payment.paymentDate,

        transactionReference: payment.transactionReference,

        notes: payment.notes,

        createdBy: payment.createdBy,

        createdAt: payment.createdAt,

        updatedAt: payment.updatedAt

    };

};

// ----------------------------
// Payment List DTO
// ----------------------------

const buildPaymentList = (payments = []) => {

    return payments.map(buildPayment);

};

// ----------------------------
// Payment Summary DTO (for customer)
// ----------------------------

const buildPaymentSummary = (payment) => {

    if (!payment) return null;

    return {

        id: payment._id,

        orderId: payment.order,

        amount: payment.amount,

        paymentMethod: payment.paymentMethod,

        paymentDate: payment.paymentDate,

        transactionReference: payment.transactionReference,

        createdAt: payment.createdAt

    };

};

module.exports = {

    buildPayment,

    buildPaymentList,

    buildPaymentSummary

};
