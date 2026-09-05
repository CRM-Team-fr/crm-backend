/**
 * @swagger
 * tags:
 *   - name: Quotations
 *     description: Quotation Management APIs
 */

/**
 * @swagger
 * /api/quotations:
 *   post:
 *     summary: Create quotation
 *     description: Creates a new quotation with products, pricing, and automatic activity timeline.
 *     tags:
 *       - Quotations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuotationRequest'
 *     responses:
 *       201:
 *         description: Quotation created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuotationResponse'
 *       400:
 *         description: Validation or business error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Customer or product not found.
 */

/**
 * @swagger
 * /api/quotations:
 *   get:
 *     summary: Get quotations
 *     description: Returns a paginated list of quotations with optional filtering. Results are scoped by role.
 *     tags:
 *       - Quotations
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
 *         description: Number of quotations per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - draft
 *             - sent
 *             - accepted
 *             - rejected
 *             - expired
 *             - cancelled
 *             - converted
 *         description: Filter by quotation status
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
 *         description: Sort quotations by any field
 *     responses:
 *       200:
 *         description: Quotations fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetQuotationsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/quotations/{quotationId}:
 *   get:
 *     summary: Get quotation details
 *     description: Returns complete details of a single quotation with items and totals.
 *     tags:
 *       - Quotations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quotationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Quotation ID
 *     responses:
 *       200:
 *         description: Quotation fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuotationResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Quotation not found.
 */

/**
 * @swagger
 * /api/quotations/{quotationId}:
 *   patch:
 *     summary: Update quotation
 *     description: Updates a draft quotation. Only draft quotations can be edited.
 *     tags:
 *       - Quotations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quotationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Quotation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateQuotationRequest'
 *     responses:
 *       200:
 *         description: Quotation updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuotationResponse'
 *       400:
 *         description: Validation error or quotation not editable.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Quotation or product not found.
 */

/**
 * @swagger
 * /api/quotations/{quotationId}/status:
 *   patch:
 *     summary: Update quotation status
 *     description: Updates the status of a quotation. Only valid transitions are allowed.
 *     tags:
 *       - Quotations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quotationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Quotation ID
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
 *                   - draft
 *                   - sent
 *                   - accepted
 *                   - rejected
 *                   - expired
 *                   - cancelled
 *                   - converted
 *                 example: sent
 *     responses:
 *       200:
 *         description: Quotation status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuotationResponse'
 *       400:
 *         description: Invalid status transition.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Quotation not found.
 */

/**
 * @swagger
 * /api/quotations/customer/{customerProfileId}:
 *   get:
 *     summary: Get customer quotations
 *     description: Returns all quotations for a specific customer. Customer can only view their own quotations.
 *     tags:
 *       - Quotations
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
 *         description: Customer quotations fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerQuotationsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Customer not found.
 */

/**
 * @swagger
 * /api/quotations/salesperson/{salespersonId}:
 *   get:
 *     summary: Get salesperson quotations
 *     description: Returns all quotations for a specific salesperson. Admin and Manager only.
 *     tags:
 *       - Quotations
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
 *         description: Salesperson quotations fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalespersonQuotationsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/quotations/{quotationId}:
 *   delete:
 *     summary: Delete quotation
 *     description: Deletes a quotation. Only draft, sent, rejected, expired, and cancelled quotations can be deleted. Admin and Manager only.
 *     tags:
 *       - Quotations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quotationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Quotation ID
 *     responses:
 *       200:
 *         description: Quotation deleted successfully.
 *       400:
 *         description: Quotation cannot be deleted.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Quotation not found.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     QuotationItem:
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
 *     CreateQuotationRequest:
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
 *         validUntil:
 *           type: string
 *           format: date-time
 *           example: 2026-09-30T23:59:59.000Z
 *         notes:
 *           type: string
 *           example: Customer requested delivery within 2 weeks.
 *
 *     UpdateQuotationRequest:
 *       type: object
 *       properties:
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
 *               quantity:
 *                 type: integer
 *               discount:
 *                 type: number
 *               tax:
 *                 type: number
 *         validUntil:
 *           type: string
 *           format: date-time
 *         notes:
 *           type: string
 *
 *     Quotation:
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
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuotationItem'
 *         subtotal:
 *           type: number
 *           example: 8500
 *         discount:
 *           type: number
 *           example: 425
 *         tax:
 *           type: number
 *           example: 403.75
 *         grandTotal:
 *           type: number
 *           example: 8478.75
 *         status:
 *           type: string
 *           enum:
 *             - draft
 *             - sent
 *             - accepted
 *             - rejected
 *             - expired
 *             - cancelled
 *             - converted
 *           example: draft
 *         validUntil:
 *           type: string
 *           format: date-time
 *           example: 2026-09-30T23:59:59.000Z
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
 *     QuotationResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Quotation created successfully.
 *         quotation:
 *           $ref: '#/components/schemas/Quotation'
 *
 *     GetQuotationsResponse:
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
 *         totalQuotations:
 *           type: integer
 *           example: 25
 *         totalPages:
 *           type: integer
 *           example: 3
 *         quotations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Quotation'
 *
 *     CustomerQuotationsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: integer
 *           example: 5
 *         quotations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Quotation'
 *
 *     SalespersonQuotationsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: integer
 *           example: 8
 *         quotations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Quotation'
 */
