// ----------------------------
// Inventory Movement DTO
// ----------------------------

const buildInventoryMovement = (movement) => {

    if (!movement) return null;

    return {

        id: movement._id,

        productId: movement.product,

        type: movement.type,

        quantity: movement.quantity,

        previousStock: movement.previousStock,

        newStock: movement.newStock,

        performedBy: movement.performedBy,

        reason: movement.reason,

        reference: movement.reference,

        createdAt: movement.createdAt,

        updatedAt: movement.updatedAt

    };

};

// ----------------------------
// Inventory Movement List DTO
// ----------------------------

const buildInventoryMovementList = (movements = []) => {

    return movements.map(buildInventoryMovement);

};

module.exports = {

    buildInventoryMovement,

    buildInventoryMovementList

};
