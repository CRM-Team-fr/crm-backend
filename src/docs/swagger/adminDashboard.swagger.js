/**
 * @swagger
 * tags:
 *   - name: Admin Dashboard
 *     description: Admin Dashboard APIs
 */

/**
 * @swagger
 * /api/dashboard/admin:
 *   get:
 *     summary: Get admin dashboard
 *     description: Returns global dashboard metrics. Admin can view all data.
 *     tags:
 *       - Admin Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *     responses:
 *       200:
 *         description: Admin dashboard fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminDashboardResponse'
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
 *     AdminDashboardCustomers:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 100
 *         new:
 *           type: integer
 *           example: 10
 *         active:
 *           type: integer
 *           example: 85
 *         byStage:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               count:
 *                 type: integer
 *         byCity:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               count:
 *                 type: integer
 *
 *     AdminDashboardSales:
 *       type: object
 *       properties:
 *         totalSales:
 *           type: number
 *           example: 5000000
 *         dailySales:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               sales:
 *                 type: number
 *               orders:
 *                 type: integer
 *         monthlySales:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               sales:
 *                 type: number
 *               orders:
 *                 type: integer
 *         salesTrends:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               sales:
 *                 type: number
 *         totalOrders:
 *           type: integer
 *           example: 150
 *         averageOrderValue:
 *           type: number
 *           example: 33333
 *
 *     AdminDashboardSalespersonPerformance:
 *       type: object
 *       properties:
 *         ranking:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               salespersonId:
 *                 type: string
 *               salespersonName:
 *                 type: string
 *               totalSales:
 *                 type: number
 *               totalOrders:
 *                 type: integer
 *               completedOrders:
 *                 type: integer
 *               totalQuotations:
 *                 type: integer
 *               acceptedQuotations:
 *                 type: integer
 *               totalFollowUps:
 *                 type: integer
 *               completedFollowUps:
 *                 type: integer
 *               totalPaymentsCollected:
 *                 type: number
 *               conversionRate:
 *                 type: number
 *         sales:
 *           type: number
 *         orders:
 *           type: integer
 *         quotations:
 *           type: integer
 *         conversionRate:
 *           type: number
 *         followUpPerformance:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             completed:
 *               type: integer
 *
 *     AdminDashboardManagerPerformance:
 *       type: object
 *       properties:
 *         teamSales:
 *           type: number
 *         teamConversion:
 *           type: number
 *         teamPerformance:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               managerId:
 *                 type: string
 *               managerName:
 *                 type: string
 *               teamSales:
 *                 type: number
 *               teamOrders:
 *                 type: integer
 *               teamQuotations:
 *                 type: integer
 *               teamAcceptedQuotations:
 *                 type: integer
 *               teamConversionRate:
 *                 type: number
 *               salespersonCount:
 *                 type: integer
 *
 *     AdminDashboardInventory:
 *       type: object
 *       properties:
 *         totalProducts:
 *           type: integer
 *           example: 50
 *         lowStockProducts:
 *           type: integer
 *           example: 5
 *         outOfStockProducts:
 *           type: integer
 *           example: 2
 *         stockMovements:
 *           type: integer
 *           example: 120
 *         bestSellingProducts:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               productName:
 *                 type: string
 *               totalQuantity:
 *                 type: integer
 *               totalRevenue:
 *                 type: number
 *
 *     AdminDashboardFinance:
 *       type: object
 *       properties:
 *         totalRevenue:
 *           type: number
 *           example: 5000000
 *         paymentsCollected:
 *           type: number
 *           example: 3500000
 *         outstandingAmount:
 *           type: number
 *           example: 1500000
 *         overduePayments:
 *           type: integer
 *           example: 25
 *
 *     AdminDashboardQuotations:
 *       type: object
 *       properties:
 *         created:
 *           type: integer
 *           example: 50
 *         sent:
 *           type: integer
 *           example: 30
 *         accepted:
 *           type: integer
 *           example: 20
 *         rejected:
 *           type: integer
 *           example: 5
 *         conversionRate:
 *           type: number
 *           example: 40
 *
 *     AdminDashboardCustomerCRM:
 *       type: object
 *       properties:
 *         followUps:
 *           type: integer
 *           example: 200
 *         overdueFollowUps:
 *           type: integer
 *           example: 15
 *         stageDistribution:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               count:
 *                 type: integer
 *
 *     AdminDashboard:
 *       type: object
 *       properties:
 *         customers:
 *           $ref: '#/components/schemas/AdminDashboardCustomers'
 *         sales:
 *           $ref: '#/components/schemas/AdminDashboardSales'
 *         salespersonPerformance:
 *           $ref: '#/components/schemas/AdminDashboardSalespersonPerformance'
 *         managerPerformance:
 *           $ref: '#/components/schemas/AdminDashboardManagerPerformance'
 *         inventory:
 *           $ref: '#/components/schemas/AdminDashboardInventory'
 *         finance:
 *           $ref: '#/components/schemas/AdminDashboardFinance'
 *         quotations:
 *           $ref: '#/components/schemas/AdminDashboardQuotations'
 *         customerCRM:
 *           $ref: '#/components/schemas/AdminDashboardCustomerCRM'
 *
 *     AdminDashboardResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         dashboard:
 *           $ref: '#/components/schemas/AdminDashboard'
 */
