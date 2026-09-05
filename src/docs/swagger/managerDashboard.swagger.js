/**
 * @swagger
 * tags:
 *   - name: Manager Dashboard
 *     description: Manager Dashboard APIs
 */

/**
 * @swagger
 * /api/dashboard/manager:
 *   get:
 *     summary: Get manager dashboard
 *     description: Returns dashboard metrics for the manager's team. Manager can only view their own team's data.
 *     tags:
 *       - Manager Dashboard
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
 *         description: Manager dashboard fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ManagerDashboardResponse'
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
 *     ManagerDashboardSales:
 *       type: object
 *       properties:
 *         teamSales:
 *           type: number
 *           example: 840000
 *         totalOrders:
 *           type: integer
 *           example: 25
 *         completedOrders:
 *           type: integer
 *           example: 18
 *         averageOrderValue:
 *           type: number
 *           example: 33600
 *         salesBySalesperson:
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
 *               orderCount:
 *                   type: integer
 *
 *     ManagerDashboardCRM:
 *       type: object
 *       properties:
 *         totalCustomers:
 *           type: integer
 *           example: 42
 *         newCustomers:
 *           type: integer
 *           example: 5
 *         activeCustomers:
 *           type: integer
 *           example: 38
 *         followUpCompletionRate:
 *           type: number
 *           example: 66.67
 *         overdueFollowUps:
 *           type: integer
 *           example: 3
 *
 *     ManagerDashboardQuotations:
 *       type: object
 *       properties:
 *         created:
 *           type: integer
 *           example: 20
 *         accepted:
 *           type: integer
 *           example: 12
 *         rejected:
 *           type: integer
 *           example: 3
 *         conversionRate:
 *           type: number
 *           example: 60
 *
 *     ManagerDashboardPayments:
 *       type: object
 *       properties:
 *         collected:
 *           type: number
 *           example: 620000
 *         outstanding:
 *           type: number
 *           example: 220000
 *         overdue:
 *           type: number
 *           example: 15000
 *
 *     ManagerDashboardInventory:
 *       type: object
 *       properties:
 *         lowStockProducts:
 *           type: integer
 *           example: 3
 *         outOfStockProducts:
 *           type: integer
 *           example: 1
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
 *     ManagerDashboardPerformance:
 *       type: object
 *       properties:
 *         topSalesperson:
 *           type: object
 *           properties:
 *             salespersonId:
 *               type: string
 *             salespersonName:
 *               type: string
 *             totalSales:
 *               type: number
 *             totalOrders:
 *               type: integer
 *             completedOrders:
 *               type: integer
 *             totalQuotations:
 *               type: integer
 *             acceptedQuotations:
 *               type: integer
 *             totalFollowUps:
 *               type: integer
 *             completedFollowUps:
 *               type: integer
 *             totalPaymentsCollected:
 *               type: number
 *             conversionRate:
 *               type: number
 *         lowestPerformingSalesperson:
 *           type: object
 *           properties:
 *             salespersonId:
 *               type: string
 *             salespersonName:
 *               type: string
 *             totalSales:
 *               type: number
 *             totalOrders:
 *               type: integer
 *             completedOrders:
 *               type: integer
 *             totalQuotations:
 *               type: integer
 *             acceptedQuotations:
 *               type: integer
 *             totalFollowUps:
 *               type: integer
 *             completedFollowUps:
 *               type: integer
 *             totalPaymentsCollected:
 *               type: number
 *             conversionRate:
 *               type: number
 *         salespersonComparison:
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
 *               ranking:
 *                 type: integer
 *
 *     ManagerDashboard:
 *       type: object
 *       properties:
 *         sales:
 *           $ref: '#/components/schemas/ManagerDashboardSales'
 *         crm:
 *           $ref: '#/components/schemas/ManagerDashboardCRM'
 *         quotations:
 *           $ref: '#/components/schemas/ManagerDashboardQuotations'
 *         payments:
 *           $ref: '#/components/schemas/ManagerDashboardPayments'
 *         inventory:
 *           $ref: '#/components/schemas/ManagerDashboardInventory'
 *         performance:
 *           $ref: '#/components/schemas/ManagerDashboardPerformance'
 *
 *     ManagerDashboardResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         dashboard:
 *           $ref: '#/components/schemas/ManagerDashboard'
 */
