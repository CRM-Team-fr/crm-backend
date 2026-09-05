/**
 * @swagger
 * tags:
 *   - name: Order Returns
 *     description: Order Return and Cancellation APIs
 */

/**
 * @swagger
 * /api/returns:
 *   post:
 *     summary: Create order return
 *     description: Creates a new order return request. Supports full and partial returns.
 *     tags:
 *       - Order Returns
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderReturnRequest'
 *     responses:
 *       201:
 *         description: Order return created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderReturnResponse'
 *       400:
 *         description: Validation or business error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Order or product not found.
 */

/**
 * @swagger
 * /api/returns/{returnId}/status:
 *   patch:
 *     summary: Update order return status
 *     description: Updates the status of an order return. Admin and Manager only.
 *     tags:
 *       - Order Returns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: returnId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Return ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - approved
 *                   - rejected
 *                   - completed
 *                 example: approved
 *     responses:
 *       200:
 *         description: Order return status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderReturnResponse'
 *       400:
 *         description: Invalid status transition.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Order return not found.
 */

/**
 * @swagger
 * /api/returns/order/{orderId}:
 *   get:
 *     summary: Get order returns
 *     description: Returns all returns for a specific order.
 *     tags:
 *       - Order Returns
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
 *         description: Order returns fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderReturnsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Order not found.
 */

/**
 * @swagger
 * /api/returns/customer/{customerProfileId}:
 *   get:
 *     summary: Get customer returns
 *     description: Returns all returns for a specific customer. Customer can only view their own returns.
 *     tags:
 *       - Order Returns
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
 *         description: Customer returns fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerReturnsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Customer not found.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     OrderReturnItem:
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
 *           example: 3
 *         unitPrice:
 *           type: number
 *           example: 850
 *         lineTotal:
 *           type: number
 *           example: 2550
 *
 *     CreateOrderReturnRequest:
 *       type: object
 *       required:
 *         - orderId
 *         - items
 *         - returnType
 *         - reason
 *       properties:
 *         orderId:
 *           type: string
 *           example: "68923abc456def7890123456"
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
 *                 example: 3
 *         returnType:
 *           type: string
 *           enum:
 *             - full
 *             - partial
 *           example: partial
 *         reason:
 *           type: string
 *           example: Product damaged during delivery.
 *
 *     OrderReturn:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         orderId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         customerProfileId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderReturnItem'
 *         returnType:
 *           type: string
 *           enum:
 *             - full
 *             - partial
 *           example: partial
 *         reason:
 *           type: string
 *           example: Product damaged during delivery.
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - approved
 *             - rejected
 *             - completed
 *           example: pending
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
 *     OrderReturnResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Order return created successfully.
 *         orderReturn:
 *           $ref: '#/components/schemas/OrderReturn'
 *
 *     OrderReturnsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: integer
 *           example: 2
 *         orderReturns:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderReturn'
 *
 *     CustomerReturnsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: integer
 *           example: 3
 *         orderReturns:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderReturn'
 */
