const productService = require("../services/product.service");

// ----------------------------
// Create Product
// ----------------------------

const createProduct = async (req, res, next) => {

    try {

        const product = await productService.createProduct(
            req.body,
            req.user,
            req.file
        );

        return res.status(201).json({

            success: true,

            message: "Product created successfully.",

            product

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Products
// ----------------------------

const getProducts = async (req, res, next) => {

    try {

        const result = await productService.getProducts(req.query);

        return res.status(200).json({

            success: true,

            ...result

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Product By ID
// ----------------------------

const getProductById = async (req, res, next) => {

    try {

        const { productId } = req.params;

        const product = await productService.getProductById(productId);

        return res.status(200).json({

            success: true,

            product

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Update Product
// ----------------------------

const updateProduct = async (req, res, next) => {

    try {

        const { productId } = req.params;

        const product = await productService.updateProduct(
            productId,
            req.body,
            req.user,
            req.file
        );

        return res.status(200).json({

            success: true,

            message: "Product updated successfully.",

            product

        });

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Adjust Stock
// ----------------------------

const adjustStock = async (req, res, next) => {

    try {

        const { productId } = req.params;

        const result = await productService.adjustStock(
            productId,
            req.body,
            req.user
        );

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Get Inventory Movements
// ----------------------------

const getInventoryMovements = async (req, res, next) => {

    try {

        const { productId } = req.params;

        const result = await productService.getInventoryMovements(productId);

        return res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};

// ----------------------------
// Delete Product
// ----------------------------

const deleteProduct = async (req, res, next) => {

    try {

        const { productId } = req.params;

        const result = await productService.deleteProduct(productId);

        return res.status(200).json({

            success: true,

            ...result

        });

    } catch (error) {

        next(error);

    }

};

const updateProductStatus = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { status } = req.body;
        const result = await productService.updateProductStatus(productId, status, req.user);
        return res.status(200).json({
            success: true,
            message: result.unchanged ? "Product status unchanged." : "Product status updated.",
            ...result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {

    createProduct,

    getProducts,

    getProductById,

    updateProduct,

    adjustStock,

    getInventoryMovements,

    deleteProduct,

    updateProductStatus

};
