/**
 * @swagger
 *
 * tags:
 *   - name: Customer Activities
 *     description: Customer Timeline & Activity Management APIs
 */

/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Create a customer activity
 *     description: Adds a new activity such as a note, call, meeting or email to a customer's timeline.
 *     tags:
 *       - Customer Activities
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateActivityRequest'
 *
 *     responses:
 *       201:
 *         description: Activity created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivityResponse'
 *
 *       400:
 *         description: Invalid activity type or request.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       404:
 *         description: Customer not found.
 */


/**
 * @swagger
 * /api/activities/customer/{customerProfileId}:
 *   get:
 *     summary: Get customer timeline
 *     description: Returns customer activities with optional filtering and pagination.
 *     tags:
 *       - Customer Activities
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: customerProfileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer Profile ID
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of activities per page
 *
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum:
 *             - note
 *             - call
 *             - meeting
 *             - email
 *             - follow_up
 *             - quotation
 *             - order
 *             - stage_changed
 *             - system
 *         description: Filter by activity type
 *
 *     responses:
 *       200:
 *         description: Activities fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetActivitiesResponse'
 *
 *       401:
 *         description: Unauthorized.
 *
 *       404:
 *         description: Customer not found.
 */


/**
 * @swagger
 * /api/activities/{activityId}:
 *   delete:
 *     summary: Delete customer activity
 *     description: Deletes an activity from the customer's timeline.
 *     tags:
 *       - Customer Activities
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *         description: Activity ID
 *
 *     responses:
 *       200:
 *         description: Activity deleted successfully.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       403:
 *         description: Forbidden.
 *
 *       404:
 *         description: Activity not found.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *
 *     CreatedBy:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *
 *         Name:
 *           type: string
 *           example: "Rahul Sharma"
 *
 *         role:
 *           type: string
 *           example: "salesperson"
 *
 *
 *     CreateActivityRequest:
 *       type: object
 *       required:
 *         - customerProfileId
 *         - activityType
 *         - title
 *         - description
 *
 *       properties:
 *
 *         customerProfileId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *
 *         activityType:
 *           type: string
 *           enum:
 *             - note
 *             - call
 *             - meeting
 *             - email
 *
 *         title:
 *           type: string
 *           example: "Phone Call"
 *
 *         description:
 *           type: string
 *           example: "Customer requested quotation for Premium Almonds."
 *
 *         metadata:
 *           type: object
 *           example: {}
 *
 *
 *     Activity:
 *       type: object
 *       properties:
 *
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *
 *         customerProfileId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *
 *         createdBy:
 *           $ref: '#/components/schemas/CreatedBy'
 *
 *         activityType:
 *           type: string
 *           example: note
 *
 *         title:
 *           type: string
 *           example: Phone Call
 *
 *         description:
 *           type: string
 *           example: Customer requested quotation.
 *
 *         metadata:
 *           type: object
 *           example: {}
 *
 *         isPinned:
 *           type: boolean
 *           example: false
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * components:
 *   schemas:
 *
 *     ActivityResponse:
 *       type: object
 *       properties:
 *
 *         success:
 *           type: boolean
 *           example: true
 *
 *         message:
 *           type: string
 *           example: Activity created successfully.
 *
 *         activity:
 *           $ref: '#/components/schemas/Activity'
 *
 *
 *     GetActivitiesResponse:
 *       type: object
 *       properties:
 *
 *         success:
 *           type: boolean
 *           example: true
 *
 *         count:
 *           type: integer
 *           example: 45
 *
 *         activities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Activity'
 *
 *
 *     DeleteActivityResponse:
 *       type: object
 *       properties:
 *
 *         success:
 *           type: boolean
 *           example: true
 *
 *         message:
 *           type: string
 *           example: Activity deleted successfully.
 */