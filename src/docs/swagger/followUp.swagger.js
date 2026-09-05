/**
 * @swagger
 * tags:
 *   - name: Follow-ups
 *     description: Follow-up management APIs
 */

/**
 * @swagger
 * /api/followups:
 *   post:
 *     summary: Create follow-up
 *     description: Creates a new follow-up for a customer. Creates an automatic follow_up activity.
 *     tags:
 *       - Follow-ups
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFollowUpRequest'
 *     responses:
 *       201:
 *         description: Follow-up created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowUpResponse'
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden - not assigned to customer.
 *       404:
 *         description: Customer not found.
 */

/**
 * @swagger
 * /api/followups/my:
 *   get:
 *     summary: Get my follow-ups
 *     description: Returns paginated follow-ups assigned to the logged-in salesperson with optional filtering and summary.
 *     tags:
 *       - Follow-ups
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
 *         description: Number of follow-ups per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - completed
 *             - missed
 *             - cancelled
 *         description: Filter by status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum:
 *             - low
 *             - medium
 *             - high
 *             - urgent
 *         description: Filter by priority
 *     responses:
 *       200:
 *         description: Follow-ups fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMyFollowUpsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/followups/customer/{customerProfileId}:
 *   get:
 *     summary: Get customer follow-ups
 *     description: Returns all follow-ups for a specific customer.
 *     tags:
 *       - Follow-ups
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
 *         description: Follow-ups fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCustomerFollowUpsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Customer not found.
 */

/**
 * @swagger
 * /api/followups/today:
 *   get:
 *     summary: Get today's follow-ups
 *     description: Returns follow-ups scheduled for today for the logged-in salesperson.
 *     tags:
 *       - Follow-ups
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today's follow-ups fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetFollowUpsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/followups/overdue:
 *   get:
 *     summary: Get overdue follow-ups
 *     description: Returns pending follow-ups that are past their date for the logged-in salesperson.
 *     tags:
 *       - Follow-ups
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overdue follow-ups fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetFollowUpsResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/followups/{followUpId}/complete:
 *   patch:
 *     summary: Complete follow-up
 *     description: Marks a follow-up as completed. Optionally creates a next follow-up.
 *     tags:
 *       - Follow-ups
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followUpId
 *         required: true
 *         schema:
 *           type: string
 *         description: Follow-up ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               outcome:
 *                 type: string
 *                 example: Customer showed interest.
 *               remarks:
 *                 type: string
 *                 example: Will follow up next week.
 *               nextFollowUp:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: Follow-up call
 *                   description:
 *                     type: string
 *                     example: Discuss pricing details.
 *                   followUpDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-09-01T10:00:00.000Z
 *                   taskType:
 *                     type: string
 *                     enum:
 *                       - call
 *                       - meeting
 *                       - visit
 *                       - email
 *                       - whatsapp
 *                       - quotation
 *                       - catalogue
 *                       - payment
 *                       - sample
 *                       - other
 *                     example: call
 *                   priority:
 *                     type: string
 *                     enum:
 *                       - low
 *                       - medium
 *                       - high
 *                       - urgent
 *                     example: medium
 *     responses:
 *       200:
 *         description: Follow-up completed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowUpResponse'
 *       400:
 *         description: Only pending follow-ups can be completed.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Follow-up not found.
 */

/**
 * @swagger
 * /api/followups/{followUpId}/reschedule:
 *   patch:
 *     summary: Reschedule follow-up
 *     description: Updates the date of a pending follow-up.
 *     tags:
 *       - Follow-ups
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followUpId
 *         required: true
 *         schema:
 *           type: string
 *         description: Follow-up ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - followUpDate
 *             properties:
 *               followUpDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-09-01T10:00:00.000Z
 *     responses:
 *       200:
 *         description: Follow-up rescheduled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowUpResponse'
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Follow-up not found.
 */

/**
 * @swagger
 * /api/followups/{followUpId}/cancel:
 *   patch:
 *     summary: Cancel follow-up
 *     description: Cancels a pending follow-up.
 *     tags:
 *       - Follow-ups
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followUpId
 *         required: true
 *         schema:
 *           type: string
 *         description: Follow-up ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: Customer requested to cancel.
 *     responses:
 *       200:
 *         description: Follow-up cancelled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowUpResponse'
 *       400:
 *         description: Only pending follow-ups can be cancelled.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Follow-up not found.
 */

/**
 * @swagger
 * /api/followups/{followUpId}:
 *   delete:
 *     summary: Delete follow-up
 *     description: Deletes a follow-up. Admin only.
 *     tags:
 *       - Follow-ups
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followUpId
 *         required: true
 *         schema:
 *           type: string
 *         description: Follow-up ID
 *     responses:
 *       200:
 *         description: Follow-up deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Follow-up not found.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     CreateFollowUpRequest:
 *       type: object
 *       required:
 *         - customerProfileId
 *         - title
 *         - followUpDate
 *         - taskType
 *         - priority
 *       properties:
 *         customerProfileId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         title:
 *           type: string
 *           example: "Follow-up call"
 *         description:
 *           type: string
 *           example: "Discuss new quotation."
 *         followUpDate:
 *           type: string
 *           format: date-time
 *           example: "2026-09-01T10:00:00.000Z"
 *         taskType:
 *           type: string
 *           enum:
 *             - call
 *             - meeting
 *             - visit
 *             - email
 *             - whatsapp
 *             - quotation
 *             - catalogue
 *             - payment
 *             - sample
 *             - other
 *           example: call
 *         priority:
 *           type: string
 *           enum:
 *             - low
 *             - medium
 *             - high
 *             - urgent
 *           example: medium
 *
 *     FollowUp:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         customerProfileId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         customer:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             businessName:
 *               type: string
 *             customerName:
 *               type: string
 *             phoneNumber:
 *               type: string
 *         title:
 *           type: string
 *           example: "Follow-up call"
 *         description:
 *           type: string
 *           example: "Discuss new quotation."
 *         followUpDate:
 *           type: string
 *           format: date-time
 *           example: "2026-09-01T10:00:00.000Z"
 *         taskType:
 *           type: string
 *           example: call
 *         priority:
 *           type: string
 *           example: medium
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - completed
 *             - missed
 *             - cancelled
 *           example: pending
 *         outcome:
 *           type: string
 *           example: ""
 *         remarks:
 *           type: string
 *           example: ""
 *         completedAt:
 *           type: string
 *           format: date-time
 *           example: null
 *         createdBy:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             Name:
 *               type: string
 *             role:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     FollowUpResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Follow-up created successfully.
 *         followUp:
 *           $ref: '#/components/schemas/FollowUp'
 *
 *     GetMyFollowUpsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         summary:
 *           type: object
 *           properties:
 *             pending:
 *               type: integer
 *             completed:
 *               type: integer
 *             overdue:
 *               type: integer
 *             today:
 *               type: integer
 *         page:
 *           type: integer
 *         limit:
 *           type: integer
 *         totalFollowUps:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         followUps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FollowUp'
 *
 *     GetCustomerFollowUpsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: integer
 *         followUps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FollowUp'
 *
 *     GetFollowUpsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         count:
 *           type: integer
 *         followUps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FollowUp'
 */
