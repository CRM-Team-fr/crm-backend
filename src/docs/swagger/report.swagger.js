/**
 * @swagger
 * tags:
 *   - name: Reports
 *     description: Reporting and Export APIs
 */

/**
 * @swagger
 * /api/reports/sales:
 *   get:
 *     summary: Sales report
 *     description: Returns sales report with optional filtering. Admin sees all, Manager sees team, Salesperson sees own.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: salesperson
 *         schema:
 *           type: string
 *       - in: query
 *         name: customer
 *         schema:
 *           type: string
 *       - in: query
 *         name: orderStatus
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sales report fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/reports/customers:
 *   get:
 *     summary: Customer report
 *     description: Returns customer report with optional filtering.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: stage
 *         schema:
 *           type: string
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: salesperson
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer report fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/reports/products:
 *   get:
 *     summary: Product report
 *     description: Returns product report.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product report fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/reports/inventory:
 *   get:
 *     summary: Inventory report
 *     description: Returns inventory report.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory report fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/reports/payments:
 *   get:
 *     summary: Payment report
 *     description: Returns payment report with optional filtering.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: customer
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment report fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/reports/salesperson/{salespersonId}:
 *   get:
 *     summary: Salesperson report
 *     description: Returns salesperson report.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salespersonId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Salesperson report fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/reports/manager/{managerId}:
 *   get:
 *     summary: Manager report
 *     description: Returns manager report.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: managerId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Manager report fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */
