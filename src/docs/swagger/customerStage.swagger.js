/**
 * @swagger
 * tags:
 *   - name: Customer Stages
 *     description: Customer stage management APIs
 */

/**
 * @swagger
 * /api/customers/stages:
 *   get:
 *     summary: Get available customer stages
 *     description: Returns all available customer stages.
 *     tags:
 *       - Customer Stages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stages fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 stages:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["new", "contacted", "interested", "quotation_sent", "negotiation", "converted", "lost"]
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

/**
 * @swagger
 * /api/customers/{customerProfileId}/stage:
 *   patch:
 *     summary: Update customer stage
 *     description: Updates the stage of a customer. Creates an automatic stage_changed activity.
 *     tags:
 *       - Customer Stages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerProfileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerStage
 *             properties:
 *               customerStage:
 *                 type: string
 *                 enum:
 *                   - new
 *                   - contacted
 *                   - interested
 *                   - quotation_sent
 *                   - negotiation
 *                   - converted
 *                   - lost
 *                 example: interested
 *     responses:
 *       200:
 *         description: Customer stage updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Customer stage updated successfully.
 *                 customer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "68923abc456def7890123456"
 *                     Name:
 *                       type: string
 *                       example: "Gupta Traders"
 *                     customerStage:
 *                       type: string
 *                       example: interested
 *       400:
 *         description: Invalid stage or customer already in this stage.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Customer not found.
 */
