/**
 * @swagger
 * tags:
 *   - name: Customers
 *     description: Customer Management APIs
 *
 * /api/customers:
 *   get:
 *     summary: Get customers
 *     description: Returns a paginated list of customers with optional filtering and sorting.
 *     tags:
 *       - Customers
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
 *         description: Number of customers per page
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter customers by city
 *       - in: query
 *         name: stage
 *         schema:
 *           type: string
 *           enum:
 *             - new
 *             - contacted
 *             - interested
 *             - quotation_sent
 *             - negotiation
 *             - converted
 *             - lost
 *         description: Filter customers by customer stage
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: -createdAt
 *         description: "Sort customers by any field (Example: createdAt, Name, city)"
 *     responses:
 *       200:
 *         description: Customers fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCustomersResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 * /api/customers/{customerProfileId}:
 *   get:
 *     summary: Get customer details
 *     description: Returns complete details of a single customer.
 *     tags:
 *       - Customers
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
 *         description: Customer fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponse'
 *       404:
 *         description: Customer not found.
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 * components:
 *   schemas:
 *     AssignedSalesperson:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         Name:
 *           type: string
 *           example: "Rahul Sharma"
 *         email:
 *           type: string
 *           example: "rahul@crm.com"
 *         phoneNumber:
 *           type: string
 *           example: "9876543210"
 *
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         Name:
 *           type: string
 *           example: "Gupta Traders"
 *         phoneNumber:
 *           type: string
 *           example: "9876543210"
 *         businessName:
 *           type: string
 *           example: "Gupta Dry Fruits"
 *         businessType:
 *           type: string
 *           example: "Wholesale"
 *         address:
 *           type: string
 *           example: "Batala, Punjab"
 *         city:
 *           type: string
 *           example: "Batala"
 *         state:
 *           type: string
 *           example: "Punjab"
 *         pincode:
 *           type: string
 *           example: "143505"
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - approved
 *             - suspended
 *         customerStage:
 *           type: string
 *           enum:
 *             - new
 *             - contacted
 *             - interested
 *             - quotation_sent
 *             - negotiation
 *             - converted
 *             - lost
 *         assignedSalesperson:
 *           $ref: '#/components/schemas/AssignedSalesperson'
 *         totalOrders:
 *           type: integer
 *           example: 12
 *         totalRevenue:
 *           type: number
 *           example: 350000
 *         outstandingAmount:
 *           type: number
 *           example: 45000
 *         lastContactedAt:
 *           type: string
 *           format: date-time
 *         nextFollowUpAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     CustomerResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         customer:
 *           $ref: '#/components/schemas/Customer'
 *
 *     GetCustomersResponse:
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
 *         totalCustomers:
 *           type: integer
 *           example: 125
 *         totalPages:
 *           type: integer
 *           example: 13
 *         customers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Customer'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Customer not found."
 */