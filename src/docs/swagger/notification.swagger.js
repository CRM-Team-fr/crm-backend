/**
 * @swagger
 * tags:
 *   - name: Notifications
 *     description: Notification Management APIs
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get user notifications
 *     description: Returns a paginated list of notifications for the authenticated user.
 *     tags:
 *       - Notifications
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
 *         description: Number of notifications per page
 *       - in: query
 *         name: isRead
 *         schema:
 *           type: boolean
 *         description: Filter by read status
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: -createdAt
 *         description: Sort notifications by any field
 *     responses:
 *       200:
 *         description: Notifications fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetNotificationsResponse'
 *       401:
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /api/notifications/summary:
 *   get:
 *     summary: Get notification summary
 *     description: Returns a summary of notifications for the authenticated user (total, unread, read).
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notification summary fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationSummaryResponse'
 *       401:
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /api/notifications/{notificationId}/read:
 *   patch:
 *     summary: Mark notification as read
 *     description: Marks a specific notification as read. User can only mark their own notifications as read.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MarkNotificationReadResponse'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Notification not found.
 */

/**
 * @swagger
 * /api/notifications/read-all:
 *   patch:
 *     summary: Mark all notifications as read
 *     description: Marks all notifications for the authenticated user as read.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MarkAllReadResponse'
 *       401:
 *         description: Unauthorized.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         recipient:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         type:
 *           type: string
 *           enum:
 *             - quotation_created
 *             - quotation_sent
 *             - quotation_accepted
 *             - quotation_rejected
 *             - follow_up_due
 *             - follow_up_overdue
 *             - order_created
 *             - order_completed
 *             - payment_received
 *             - payment_overdue
 *             - low_stock
 *             - order_cancelled
 *             - return_approved
 *             - return_rejected
 *             - return_completed
 *           example: quotation_accepted
 *         title:
 *           type: string
 *           example: Quotation Accepted
 *         message:
 *           type: string
 *           example: Quotation #123 has been accepted by the customer.
 *         isRead:
 *           type: boolean
 *           example: false
 *         referenceEntity:
 *           type: string
 *           enum:
 *             - quotation
 *             - order
 *             - payment
 *             - follow_up
 *             - product
 *             - return
 *           example: quotation
 *         referenceId:
 *           type: string
 *           example: "68923abc456def7890123456"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     GetNotificationsResponse:
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
 *         totalNotifications:
 *           type: integer
 *           example: 25
 *         totalPages:
 *           type: integer
 *           example: 3
 *         notifications:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Notification'
 *
 *     NotificationSummary:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 25
 *         unread:
 *           type: integer
 *           example: 5
 *         read:
 *           type: integer
 *           example: 20
 *
 *     NotificationSummaryResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         summary:
 *           $ref: '#/components/schemas/NotificationSummary'
 *
 *     MarkNotificationReadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Notification marked as read.
 *         notification:
 *           $ref: '#/components/schemas/Notification'
 *
 *     MarkAllReadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: All notifications marked as read.
 */
