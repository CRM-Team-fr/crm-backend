// ----------------------------
// Order Item DTO
// ----------------------------

const buildOrderItem = (item) => {

    if (!item) return null;

    return {

        id: item._id,

        product: item.product,

        productName: item.productName,

        quantity: item.quantity,

        unitPrice: item.unitPrice,

        discount: item.discount,

        tax: item.tax,

        lineTotal: item.lineTotal

    };

};

// ----------------------------
// Order Detail DTO
// ----------------------------

const buildOrderDetail = (order) => {

    if (!order) return null;

    return {

        id: order._id,

        customerProfileId: order.customerProfile,

        salesperson: order.salesperson,

        quotation: order.quotation,

        items: order.items?.map(buildOrderItem) || [],

        subtotal: order.subtotal,

        discount: order.discount,

        tax: order.tax,

        grandTotal: order.grandTotal,

        paymentStatus: order.paymentStatus,

        orderStatus: order.orderStatus,

        notes: order.notes,

        createdBy: order.createdBy,

        createdAt: order.createdAt,

        updatedAt: order.updatedAt

    };

};

// ----------------------------
// Order Summary DTO
// ----------------------------

const buildOrderSummary = (order) => {

    if (!order) return null;

    return {

        id: order._id,

        customerProfileId: order.customerProfile,

        salesperson: order.salesperson,

        quotation: order.quotation,

        grandTotal: order.grandTotal,

        paymentStatus: order.paymentStatus,

        orderStatus: order.orderStatus,

        createdAt: order.createdAt,

        updatedAt: order.updatedAt

    };

};

// ----------------------------
// Order List DTO
// ----------------------------

const buildOrderList = (orders = []) => {

    return orders.map(buildOrderSummary);

};

module.exports = {

    buildOrderItem,

    buildOrderDetail,

    buildOrderSummary,

    buildOrderList

};
