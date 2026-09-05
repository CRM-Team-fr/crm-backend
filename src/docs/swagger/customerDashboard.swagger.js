/**
 * @swagger
 * tags:
 *   - name: Customer Dashboard
 *     description: Customer Dashboard APIs
 */

/**
 * @swagger
 * /api/dashboard/customer/{customerProfileId}:
 *   get:
 *     summary: Get customer dashboard
 *     description: Returns dashboard for a specific customer. Customer can only view their own dashboard. Admin, Manager, and Salesperson can view dashboard for their assigned customers.
 *     tags:
 *       - Customer Dashboard
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
 *         description: Customer dashboard fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerDashboardResponse'
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
 *     CustomerDashboardProfile:
 *       type: object
 *       properties:
 *         businessName:
 *           type: string
 *           example: Acme Corp
 *         businessType:
 *           type: string
 *           example: Retail
 *         address:
 *           type: string
 *           example: 123 Main St
 *         city:
 *           type: string
 *           example: Mumbai
 *         state:
 *           type: string
 *           example: Maharashtra
 *         pincode:
 *           type: string
 *           example: 400001
 *         assignedSalesperson:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             Name:
 *               type: string
 *             email:
 *               type: string
 *             phoneNumber:
 *               type: string
 *
 *     CustomerDashboardQuotation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         status:
 *           type: string
 *         validity:
 *           type: string
 *           format: date-time
 *         grandTotal:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     CustomerDashboardOrder:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         orderStatus:
 *           type: string
 *         grandTotal:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               unitPrice:
 *                 type: number
 *
 *     CustomerDashboardPayment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         amount:
 *           type: number
 *         paymentMethod:
 *           type: string
 *         paymentDate:
 *           type: string
 *           format: date-time
 *         transactionReference:
 *           type: string
 *         order:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             orderStatus:
 *               type: string
 *             grandTotal:
 *               type: number
 *
 *     CustomerDashboardFollowUp:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         followUpDate:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *         priority:
 *           type: string
 *         createdBy:
 *           type: object
 *           properties:
 *             Name:
 *               type: string
 *
 *     CustomerDashboard:
 *       type: object
 *       properties:
 *         profile:
 *           $ref: '#/components/schemas/CustomerDashboardProfile'
 *         quotations:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerDashboardQuotation'
 *         orders:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerDashboardOrder'
 *         payments:
 *           type: object
 *           properties:
 *             totalPaid:
 *               type: number
 *             outstanding:
 *               type: number
 *             history:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerDashboardPayment'
 *         followUps:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             pending:
 *               type: integer
 *             completed:
 *               type: integer
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerDashboardFollowUp'
 *
 *     CustomerDashboardResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         dashboard:
 *           $ref: '#/components/schemas/CustomerDashboard'
 */
