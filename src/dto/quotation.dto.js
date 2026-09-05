// ----------------------------
// Quotation Item DTO
// ----------------------------

const buildQuotationItem = (item) => {

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
// Quotation Detail DTO
// ----------------------------

const buildQuotationDetail = (quotation) => {

    if (!quotation) return null;

    return {

        id: quotation._id,

        customerProfileId: quotation.customerProfile,

        salesperson: quotation.salesperson,

        items: quotation.items?.map(buildQuotationItem) || [],

        subtotal: quotation.subtotal,

        discount: quotation.discount,

        tax: quotation.tax,

        grandTotal: quotation.grandTotal,

        status: quotation.status,

        validUntil: quotation.validUntil,

        notes: quotation.notes,

        createdBy: quotation.createdBy,

        createdAt: quotation.createdAt,

        updatedAt: quotation.updatedAt

    };

};

// ----------------------------
// Quotation Summary DTO
// ----------------------------

const buildQuotationSummary = (quotation) => {

    if (!quotation) return null;

    return {

        id: quotation._id,

        customerProfileId: quotation.customerProfile,

        salesperson: quotation.salesperson,

        grandTotal: quotation.grandTotal,

        status: quotation.status,

        validUntil: quotation.validUntil,

        createdAt: quotation.createdAt,

        updatedAt: quotation.updatedAt

    };

};

// ----------------------------
// Quotation List DTO
// ----------------------------

const buildQuotationList = (quotations = []) => {

    return quotations.map(buildQuotationSummary);

};

module.exports = {

    buildQuotationItem,

    buildQuotationDetail,

    buildQuotationSummary,

    buildQuotationList

};
