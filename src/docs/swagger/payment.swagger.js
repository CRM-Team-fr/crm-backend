/**
 * @swagger
 * tags:
 *   - name: Payments
 *     description: Payment and Receivables Management APIs
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Record payment
 *     description: Records a payment against an order. Updates order payment status and customer outstanding amount.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaymentRequest'
 *     responses:
 *       201:
 *         description: Payment recorded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       400:
 *         description: Validation or business error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Order not found.
 */

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get payments
 *     description: Returns a paginated list of payments with optional filtering. Results are scoped by role.
 *     tags:
 *       - Payments
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
 *         description: Number of payments per page
 *       - in: query
 *         name: customerProfileId
 *         schema:
 *           type: string
 *         description: Filter by customer profile ID
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         description: Filter by order ID
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *           enum:
 *             - cash
 *             - bank_transfer
 *             - upi
 *             - cheque
 *             - card
 *             - other
 *         description: Filter by payment method
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
 *         description: Sort payments by any field
 *     responses:
 *       200:
 *         description: Payments fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetPaymentsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/payments/customer/{customerProfileId}:
 *   get:
 *     summary: Get customer payments
 *     description: Returns all payments for a specific customer. Customer can only view their own payments.
 *     tags:
 *       - Payments
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
 *         description: Customer payments fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerPaymentsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Customer not found.
 */

/**
 * @swagger
 * /api/payments/order/{orderId}:
 *   get:
 *     summary: Get order payments
 *     description: Returns all payments for a specific order with outstanding amount calculation.
 *     tags:
 *       - Payments
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
 *         description: Order payments fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderPaymentsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Order not found.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     CreatePaymentRequest:
 *       type: object
 *       required:
 *         - orderId
 *         - amount
 *         - paymentMethod
 *       properties:
 *         orderId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         amount:
 *           type: number
 *           example: 20000
 *         paymentMethod:
 *           type: string
 *           enum:
 *             - cash
 *             - bank_transfer
 *             - upi
 *             - cheque
 *             - card
 *             - other
 *           example: bank_transfer
 *         paymentDate:
 *           type: string
 *           format: date-time
 *           example: 2026-08-27T10:00:00.000Z
 *         transactionReference:
 *           type: string
 *           example: TXN-123456789
 *         notes:
 *           type: string
 *           example: Payment received via bank transfer.
 *
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         customerProfileId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         orderId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         amount:
 *           type: number
 *           example: 20000
 *         paymentMethod:
 *           type: string
 *           example: bank_transfer
 *         paymentDate:
 *           type: string
 *           format: date-time
 *           example: 2026-08-27T10:00:00.000Z
 *         transactionReference:
 *           type: string
 *           example: TXN-123456789
 *         notes:
 *           type: string
 *           example: Payment received via bank transfer.
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
 *     PaymentResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Payment recorded successfully.
 *         payment:
 *           $ref: '#/components/schemas/Payment'
 *         order:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             paymentStatus:
 *               type: string
 *             grandTotal:
 *               type: number
 *             totalPaid:
 *               type: number
 *             outstanding:
 *               type: number
 *
 *     GetPaymentsResponse:
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
 *         totalPayments:
 *           type: integer
 *           example: 25
 *         totalPages:
 *           type: integer
 *           example: 3
 *         payments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Payment'
 *
 *     CustomerPaymentsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: integer
 *           example: 5
 *         payments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Payment'
 *
 *     OrderPaymentsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         orderId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         orderGrandTotal:
 *           type: number
 *           example: 50000
 *         totalPaid:
 *           type: number
 *           example: 20000
 *         outstanding:
 *           type: number
 *           example: 30000
 *         count:
 *           type: integer
 *           example: 2
 *         payments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Payment'
 */
