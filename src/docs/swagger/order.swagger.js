/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Order Management APIs
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create order
 *     description: Creates a new order. Optionally references a quotation. Deducts inventory automatically.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Validation or business error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Customer, product, or quotation not found.
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders
 *     description: Returns a paginated list of orders with optional filtering. Results are scoped by role.
 *     tags:
 *       - Orders
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
 *         description: Number of orders per page
 *       - in: query
 *         name: orderStatus
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - confirmed
 *             - processing
 *             - completed
 *             - cancelled
 *         description: Filter by order status
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - partial
 *             - paid
 *             - overdue
 *             - cancelled
 *         description: Filter by payment status
 *       - in: query
 *         name: customerProfileId
 *         schema:
 *           type: string
 *         description: Filter by customer profile ID
 *       - in: query
 *         name: salespersonId
 *         schema:
 *           type: string
 *         description: Filter by salesperson ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: -createdAt
 *         description: Sort orders by any field
 *     responses:
 *       200:
 *         description: Orders fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrdersResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order details
 *     description: Returns complete details of a single order with items and totals.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Order not found.
 */

/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   patch:
 *     summary: Update order status
 *     description: Updates the status of an order. Only valid transitions are allowed.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderStatus
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - confirmed
 *                   - processing
 *                   - completed
 *                   - cancelled
 *                 example: confirmed
 *     responses:
 *       200:
 *         description: Order status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Invalid status transition.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Order not found.
 */

/**
 * @swagger
 * /api/orders/{orderId}/payment:
 *   patch:
 *     summary: Update payment status
 *     description: Updates the payment status of an order.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentStatus
 *             properties:
 *               paymentStatus:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - partial
 *                   - paid
 *                   - overdue
 *                   - cancelled
 *                 example: paid
 *     responses:
 *       200:
 *         description: Payment status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Invalid payment status.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Order not found.
 */

/**
 * @swagger
 * /api/orders/customer/{customerProfileId}:
 *   get:
 *     summary: Get customer orders
 *     description: Returns all orders for a specific customer. Customer can only view their own orders.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerProfileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer Profile ID
 *     responses:
 *       200:
 *         description: Customer orders fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerOrdersResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Customer not found.
 */

/**
 * @swagger
 * /api/orders/salesperson/{salespersonId}:
 *   get:
 *     summary: Get salesperson orders
 *     description: Returns all orders for a specific salesperson. Admin and Manager only.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salespersonId
 *         required: true
 *         schema:
 *           type: string
 *         description: Salesperson ID
 *     responses:
 *       200:
 *         description: Salesperson orders fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalespersonOrdersResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     OrderItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         product:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         productName:
 *           type: string
 *           example: Premium Almonds
 *         quantity:
 *           type: integer
 *           example: 10
 *         unitPrice:
 *           type: number
 *           example: 850
 *         discount:
 *           type: number
 *           example: 5
 *           description: Discount percentage
 *         tax:
 *           type: number
 *           example: 5
 *           description: Tax percentage
 *         lineTotal:
 *           type: number
 *           example: 8575
 *
 *     CreateOrderRequest:
 *       type: object
 *       required:
 *         - customerProfileId
 *         - items
 *       properties:
 *         customerProfileId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         salespersonId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *           description: Optional. Defaults to the customer's assigned salesperson.
 *         quotationId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *           description: Optional. Reference to the originating quotation.
 *         items:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: object
 *             required:
 *               - product
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *                 example: "68923abc456def7890123456"
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               discount:
 *                 type: number
 *                 example: 5
 *               tax:
 *                 type: number
 *                 example: 5
 *         paymentStatus:
 *           type: string
 *           enum:
 *             - pending
 *             - partial
 *             - paid
 *             - overdue
 *             - cancelled
 *           example: pending
 *         orderStatus:
 *           type: string
 *           enum:
 *             - pending
 *             - confirmed
 *             - processing
 *             - completed
 *             - cancelled
 *           example: pending
 *         notes:
 *           type: string
 *           example: Customer requested delivery within 2 weeks.
 *
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         customerProfileId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         salesperson:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         quotation:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         subtotal:
 *           type: number
 *           example: 10000
 *         discount:
 *           type: number
 *           example: 500
 *         tax:
 *           type: number
 *           example: 950
 *         grandTotal:
 *           type: number
 *           example: 10450
 *         paymentStatus:
 *           type: string
 *           enum:
 *             - pending
 *             - partial
 *             - paid
 *             - overdue
 *             - cancelled
 *           example: pending
 *         orderStatus:
 *           type: string
 *           enum:
 *             - pending
 *             - confirmed
 *             - processing
 *             - completed
 *             - cancelled
 *           example: pending
 *         notes:
 *           type: string
 *           example: Customer requested delivery within 2 weeks.
 *         createdBy:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     OrderResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Order created successfully.
 *         order:
 *           $ref: '#/components/schemas/Order'
 *
 *     GetOrdersResponse:
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
 *         totalOrders:
 *           type: integer
 *           example: 25
 *         totalPages:
 *           type: integer
 *           example: 3
 *         orders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *
 *     CustomerOrdersResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: integer
 *           example: 5
 *         orders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *
 *     SalespersonOrdersResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: integer
 *           example: 8
 *         orders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 */
