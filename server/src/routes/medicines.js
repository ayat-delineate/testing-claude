const express = require('express');
const router = express.Router();
const { commonResponses, commonParams, security } = require('../utils/swaggerHelpers');

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: Medicine management endpoints
 */

/**
 * @swagger
 * /api/medicines:
 *   get:
 *     summary: Get all medicines
 *     description: Retrieve a paginated list of medicines with optional search and filtering
 *     tags: [Medicines]
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/Search'
 *       - name: category
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - name: sortBy
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [name, price, createdAt]
 *           default: name
 *         description: Sort field
 *       - name: sortOrder
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of medicines
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
 *                     $ref: '#/components/schemas/Medicine'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: number
 *                       example: 1
 *                     limit:
 *                       type: number
 *                       example: 10
 *                     total:
 *                       type: number
 *                       example: 100
 *                     pages:
 *                       type: number
 *                       example: 10
 *       400:
 *           $ref: '#/components/responses/ValidationError'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/', (req, res) => {
  // TODO: Implement get medicines logic
  res.status(200).json({
    success: true,
    message: 'Get medicines endpoint - to be implemented',
    data: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0
    }
  });
});

/**
 * @swagger
 * /api/medicines/{id}:
 *   get:
 *     summary: Get medicine by ID
 *     description: Retrieve a specific medicine by its ID
 *     tags: [Medicines]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         description: Medicine details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Medicine'
 *       404:
 *           $ref: '#/components/responses/NotFound'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/:id', (req, res) => {
  // TODO: Implement get medicine by ID logic
  res.status(200).json({
    success: true,
    message: 'Get medicine by ID endpoint - to be implemented',
    data: null
  });
});

/**
 * @swagger
 * /api/medicines:
 *   post:
 *     summary: Create new medicine
 *     description: Create a new medicine (Admin/Seller only)
 *     tags: [Medicines]
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
 *               - genericName
 *               - perUnitPrice
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: Paracetamol 500mg
 *               genericName:
 *                 type: string
 *                 example: Acetaminophen
 *               description:
 *                 type: string
 *                 example: Pain relief medicine
 *               perUnitPrice:
 *                 type: number
 *                 example: 12.99
 *               stock:
 *                 type: number
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: tablets
 *               company:
 *                 type: string
 *                 example: PharmaCorp
 *               massUnit:
 *                 type: string
 *                 example: tablet
 *               discountPercentage:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Medicine created successfully
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
 *                   example: Medicine created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Medicine'
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
  // TODO: Implement create medicine logic
  res.status(201).json({
    success: true,
    message: 'Create medicine endpoint - to be implemented',
    data: null
  });
});

module.exports = router;
