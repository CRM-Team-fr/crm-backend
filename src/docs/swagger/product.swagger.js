/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product and Inventory Management APIs
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product
 *     description: Creates a new product. Admin and Manager only.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               SKU:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               sellingPrice:
 *                 type: number
 *               costPrice:
 *                 type: number
 *               tax:
 *                 type: number
 *               unit:
 *                 type: string
 *               stock:
 *                 type: integer
 *               minimumStock:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - inactive
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       409:
 *         description: Product with this SKU already exists.
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products
 *     description: Returns a paginated list of products with optional filtering.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *         description: Filter by status
 *       - in: query
 *         name: stockStatus
 *         schema:
 *           type: string
 *           enum:
 *             - in_stock
 *             - low_stock
 *             - out_of_stock
 *         description: Filter by stock status
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: -createdAt
 *         description: Sort products by any field
 *     responses:
 *       200:
 *         description: Products fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProductsResponse'
 *       401:
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get product details
 *     description: Returns complete details of a single product.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Product not found.
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   patch:
 *     summary: Update product
 *     description: Updates product details. Admin and Manager only.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               SKU:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               sellingPrice:
 *                 type: number
 *               costPrice:
 *                 type: number
 *               tax:
 *                 type: number
 *               unit:
 *                 type: string
 *               minimumStock:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - inactive
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Product not found.
 *       409:
 *         description: Product with this SKU already exists.
 */

/**
 * @swagger
 * /api/products/{productId}/stock:
 *   patch:
 *     summary: Adjust stock
 *     description: Adjusts product stock and creates an inventory movement record. Admin and Manager only.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StockAdjustmentRequest'
 *     responses:
 *       200:
 *         description: Stock adjusted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockAdjustmentResponse'
 *       400:
 *         description: Invalid adjustment or stock would become negative.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Product not found.
 */

/**
 * @swagger
 * /api/products/{productId}/movements:
 *   get:
 *     summary: Get inventory movements
 *     description: Returns the complete inventory movement history for a product. Admin and Manager only.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Inventory movements fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryMovementsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Product not found.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     CreateProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - SKU
 *         - category
 *         - sellingPrice
 *         - unit
 *       properties:
 *         name:
 *           type: string
 *           example: Premium Almonds
 *         SKU:
 *           type: string
 *           example: ALM-500G
 *         category:
 *           type: string
 *           example: Dry Fruits
 *         description:
 *           type: string
 *           example: High quality almonds sourced from California.
 *         sellingPrice:
 *           type: number
 *           example: 450
 *         costPrice:
 *           type: number
 *           example: 320
 *         tax:
 *           type: number
 *           example: 5
 *         unit:
 *           type: string
 *           example: kg
 *         stock:
 *           type: integer
 *           example: 100
 *         minimumStock:
 *           type: integer
 *           example: 20
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *           example: active
 *
 *     UpdateProductRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Premium Almonds
 *         SKU:
 *           type: string
 *           example: ALM-500G
 *         category:
 *           type: string
 *           example: Dry Fruits
 *         description:
 *           type: string
 *           example: High quality almonds sourced from California.
 *         sellingPrice:
 *           type: number
 *           example: 450
 *         costPrice:
 *           type: number
 *           example: 320
 *         tax:
 *           type: number
 *           example: 5
 *         unit:
 *           type: string
 *           example: kg
 *         minimumStock:
 *           type: integer
 *           example: 20
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *           example: active
 *
 *     StockAdjustmentRequest:
 *       type: object
 *       required:
 *         - type
 *         - quantity
 *       properties:
 *         type:
 *           type: string
 *           enum:
 *             - stock_in
 *             - stock_out
 *             - adjustment
 *             - damaged
 *             - returned
 *           example: stock_in
 *         quantity:
 *           type: integer
 *           example: 50
 *         reason:
 *           type: string
 *           example: Supplier shipment received.
 *         reference:
 *           type: string
 *           example: PO-12345
 *
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         name:
 *           type: string
 *           example: Premium Almonds
 *         SKU:
 *           type: string
 *           example: ALM-500G
 *         category:
 *           type: string
 *           example: Dry Fruits
 *         description:
 *           type: string
 *           example: High quality almonds sourced from California.
 *         sellingPrice:
 *           type: number
 *           example: 450
 *         costPrice:
 *           type: number
 *           example: 320
 *         tax:
 *           type: number
 *           example: 5
 *         unit:
 *           type: string
 *           example: kg
 *         stock:
 *           type: integer
 *           example: 120
 *         minimumStock:
 *           type: integer
 *           example: 20
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *           example: active
 *         image:
 *           type: string
 *           example: /uploads/products/product-1234567890-123456789.jpg
 *           description: Relative URL to the uploaded product image.
 *         createdBy:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         updatedBy:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Product created successfully.
 *         product:
 *           $ref: '#/components/schemas/Product'
 *
 *     GetProductsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         totalProducts:
 *           type: integer
 *           example: 25
 *         totalPages:
 *           type: integer
 *           example: 3
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *
 *     InventoryMovement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         productId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         type:
 *           type: string
 *           enum:
 *             - stock_in
 *             - stock_out
 *             - adjustment
 *             - damaged
 *             - returned
 *           example: stock_in
 *         quantity:
 *           type: integer
 *           example: 50
 *         previousStock:
 *           type: integer
 *           example: 70
 *         newStock:
 *           type: integer
 *           example: 120
 *         performedBy:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         reason:
 *           type: string
 *           example: Supplier shipment received.
 *         reference:
 *           type: string
 *           example: PO-12345
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     StockAdjustmentResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Stock adjusted successfully.
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         movement:
 *           $ref: '#/components/schemas/InventoryMovement'
 *
 *     InventoryMovementsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         productId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         productName:
 *           type: string
 *           example: Premium Almonds
 *         currentStock:
 *           type: integer
 *           example: 120
 *         movements:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/InventoryMovement'
 */
