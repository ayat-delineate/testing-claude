/**
 * ROUTE TEMPLATE
 * 
 * This template shows how to easily add new routes with Swagger documentation
 * Copy this file and modify it for your new route
 */

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: YourTag
 *   description: Description of your endpoints
 */

/**
 * @swagger
 * /api/your-endpoint:
 *   get:
 *     summary: Your endpoint summary
 *     description: Detailed description of what this endpoint does
 *     tags: [YourTag]
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/Search'
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/YourSchema'
 *       400:
 *           $ref: '#/components/responses/ValidationError'
 *       401:
 *           $ref: '#/components/responses/Unauthorized'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/', (req, res) => {
  // Your implementation here
  res.status(200).json({
    success: true,
    message: 'Your endpoint - to be implemented',
    data: []
  });
});

/**
 * @swagger
 * /api/your-endpoint/{id}:
 *   get:
 *     summary: Get item by ID
 *     description: Get a specific item by its ID
 *     tags: [YourTag]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         description: Item details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/YourSchema'
 *       404:
 *           $ref: '#/components/responses/NotFound'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/:id', (req, res) => {
  // Your implementation here
  res.status(200).json({
    success: true,
    message: 'Get item by ID - to be implemented',
    data: null
  });
});

/**
 * @swagger
 * /api/your-endpoint:
 *   post:
 *     summary: Create new item
 *     description: Create a new item (Admin/Seller only)
 *     tags: [YourTag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Item Name
 *               description:
 *                 type: string
 *                 example: Item description
 *     responses:
 *       201:
 *         description: Item created successfully
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
 *                   example: Item created successfully
 *                 data:
 *                   $ref: '#/components/schemas/YourSchema'
 *       400:
 *           $ref: '#/components/responses/ValidationError'
 *       401:
 *           $ref: '#/components/responses/Unauthorized'
 *       403:
 *           $ref: '#/components/responses/Forbidden'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.post('/', (req, res) => {
  // Your implementation here
  res.status(201).json({
    success: true,
    message: 'Create item - to be implemented',
    data: null
  });
});

module.exports = router;
