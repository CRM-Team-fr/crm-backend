/**
 * @swagger
 * tags:
 *   - name: Salesperson Performance
 *     description: Salesperson Performance Metrics APIs
 */

/**
 * @swagger
 * /api/performance/salesperson/{salespersonId}:
 *   get:
 *     summary: Get salesperson performance
 *     description: Returns performance metrics for a specific salesperson. Salesperson can view their own metrics, Manager can view their team's metrics, Admin can view any salesperson's metrics.
 *     tags:
 *       - Salesperson Performance
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salespersonId
 *         required: true
 *         schema:
 *           type: string
 *         description: Salesperson User ID
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
 *         description: Salesperson performance fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalespersonPerformanceResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Salesperson not found.
 */

/**
 * @swagger
 * /api/performance/salesperson/comparison:
 *   get:
 *     summary: Get salesperson comparison
 *     description: Returns performance comparison for all salespersons. Manager sees their team, Admin sees all salespersons.
 *     tags:
 *       - Salesperson Performance
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
 *         description: Salesperson comparison fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalespersonComparisonResponse'
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
 *     SalespersonPerformanceCustomers:
 *       type: object
 *       properties:
 *         assigned:
 *           type: integer
 *           example: 42
 *         active:
 *           type: integer
 *           example: 38
 *         new:
 *           type: integer
 *           example: 5
 *
 *     SalespersonPerformanceFollowUps:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 18
 *         completed:
 *           type: integer
 *           example: 12
 *         pending:
 *           type: integer
 *           example: 5
 *         overdue:
 *           type: integer
 *           example: 1
 *
 *     SalespersonPerformanceQuotations:
 *       type: object
 *       properties:
 *         created:
 *           type: integer
 *           example: 15
 *         sent:
 *           type: integer
 *           example: 10
 *         accepted:
 *           type: integer
 *           example: 9
 *         rejected:
 *           type: integer
 *           example: 2
 *         conversionRate:
 *           type: number
 *           example: 60
 *
 *     SalespersonPerformanceOrders:
 *       type: object
 *       properties:
 *         created:
 *           type: integer
 *           example: 7
 *         completed:
 *           type: integer
 *           example: 5
 *         totalSales:
 *           type: number
 *           example: 840000
 *         averageOrderValue:
 *           type: number
 *           example: 120000
 *
 *     SalespersonPerformancePayments:
 *       type: object
 *       properties:
 *         collected:
 *           type: number
 *           example: 620000
 *         outstanding:
 *           type: number
 *           example: 220000
 *
 *     SalespersonPerformance:
 *       type: object
 *       properties:
 *         salespersonId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         salespersonName:
 *           type: string
 *           example: Rahul Sharma
 *         customers:
 *           $ref: '#/components/schemas/SalespersonPerformanceCustomers'
 *         followUps:
 *           $ref: '#/components/schemas/SalespersonPerformanceFollowUps'
 *         quotations:
 *           $ref: '#/components/schemas/SalespersonPerformanceQuotations'
 *         orders:
 *           $ref: '#/components/schemas/SalespersonPerformanceOrders'
 *         payments:
 *           $ref: '#/components/schemas/SalespersonPerformancePayments'
 *         conversionRate:
 *           type: number
 *           example: 46.67
 *
 *     SalespersonPerformanceResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         performance:
 *           $ref: '#/components/schemas/SalespersonPerformance'
 *
 *     SalespersonComparison:
 *       type: object
 *       properties:
 *         salespersonId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         salespersonName:
 *           type: string
 *           example: Rahul Sharma
 *         totalSales:
 *           type: number
 *           example: 840000
 *         totalOrders:
 *           type: integer
 *           example: 7
 *         completedOrders:
 *           type: integer
 *           example: 5
 *         totalQuotations:
 *           type: integer
 *           example: 15
 *         acceptedQuotations:
 *           type: integer
 *           example: 9
 *         totalFollowUps:
 *           type: integer
 *           example: 18
 *         completedFollowUps:
 *           type: integer
 *           example: 12
 *         totalPaymentsCollected:
 *           type: number
 *           example: 620000
 *         conversionRate:
 *           type: number
 *           example: 60
 *         ranking:
 *           type: integer
 *           example: 1
 *
 *     SalespersonComparisonResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         comparison:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SalespersonComparison'
 */
