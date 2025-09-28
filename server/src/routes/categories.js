const express = require('express');
const router = express.Router();
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryStats,
    updateMedicineCount
} = require('../controllers/categoryController');
const { authenticateToken, requireAdminOrSeller } = require('../middleware/auth');
const {
    validateCategory,
    validateObjectId
} = require('../middleware/validation');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Medicine category management endpoints
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve all medicine categories
 *     tags: [Categories]
 *     parameters:
 *       - name: active
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *                   example: Categories retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Category'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/', getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieve a specific category by its ID
 *     tags: [Categories]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         description: Category retrieved successfully
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
 *                   example: Category retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       $ref: '#/components/schemas/Category'
 *       404:
 *           $ref: '#/components/responses/NotFound'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/:id', validateObjectId(), getCategoryById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create new category
 *     description: Create a new medicine category (Admin/Seller only)
 *     tags: [Categories]
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
 *                 example: Tablets
 *               description:
 *                 type: string
 *                 example: Oral solid dosage forms
 *               image:
 *                 type: string
 *                 example: https://example.com/category-image.jpg
 *               icon:
 *                 type: string
 *                 example: Package
 *               sortOrder:
 *                 type: number
 *                 example: 1
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Category created successfully
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
 *                   example: Category created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       $ref: '#/components/schemas/Category'
 *       400:
 *           $ref: '#/components/responses/ValidationError'
 *       401:
 *           $ref: '#/components/responses/Unauthorized'
 *       403:
 *           $ref: '#/components/responses/Forbidden'
 *       409:
 *         description: Category already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.post('/', authenticateToken, requireAdminOrSeller, validateCategory, createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update category
 *     description: Update an existing category (Admin/Seller only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tablets
 *               description:
 *                 type: string
 *                 example: Oral solid dosage forms
 *               image:
 *                 type: string
 *                 example: https://example.com/category-image.jpg
 *               icon:
 *                 type: string
 *                 example: Package
 *               sortOrder:
 *                 type: number
 *                 example: 1
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: Category updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       $ref: '#/components/schemas/Category'
 *       400:
 *           $ref: '#/components/responses/ValidationError'
 *       401:
 *           $ref: '#/components/responses/Unauthorized'
 *       403:
 *           $ref: '#/components/responses/Forbidden'
 *       404:
 *           $ref: '#/components/responses/NotFound'
 *       409:
 *         description: Category already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.put('/:id', authenticateToken, requireAdminOrSeller, validateObjectId(), validateCategory, updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete category
 *     description: Soft delete a category (Admin/Seller only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Cannot delete category with medicines
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *           $ref: '#/components/responses/Unauthorized'
 *       403:
 *           $ref: '#/components/responses/Forbidden'
 *       404:
 *           $ref: '#/components/responses/NotFound'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', authenticateToken, requireAdminOrSeller, validateObjectId(), deleteCategory);

/**
 * @swagger
 * /api/categories/{id}/stats:
 *   get:
 *     summary: Get category statistics
 *     description: Get statistics for a specific category
 *     tags: [Categories]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         description: Category statistics retrieved successfully
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
 *                   example: Category statistics retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 507f1f77bcf86cd799439011
 *                         name:
 *                           type: string
 *                           example: Tablets
 *                         description:
 *                           type: string
 *                           example: Oral solid dosage forms
 *                     statistics:
 *                       type: object
 *                       properties:
 *                         totalMedicines:
 *                           type: number
 *                           example: 50
 *                         lowStockMedicines:
 *                           type: number
 *                           example: 5
 *                         outOfStockMedicines:
 *                           type: number
 *                           example: 2
 *                         featuredMedicines:
 *                           type: number
 *                           example: 10
 *                         averagePrice:
 *                           type: number
 *                           example: 15.99
 *       404:
 *           $ref: '#/components/responses/NotFound'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/:id/stats', validateObjectId(), getCategoryStats);

/**
 * @swagger
 * /api/categories/{id}/update-count:
 *   put:
 *     summary: Update category medicine count
 *     description: Manually update the medicine count for a category (Admin/Seller only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         description: Medicine count updated successfully
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
 *                   example: Medicine count updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 507f1f77bcf86cd799439011
 *                         name:
 *                           type: string
 *                           example: Tablets
 *                         medicineCount:
 *                           type: number
 *                           example: 50
 *       401:
 *           $ref: '#/components/responses/Unauthorized'
 *       403:
 *           $ref: '#/components/responses/Forbidden'
 *       404:
 *           $ref: '#/components/responses/NotFound'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.put('/:id/update-count', authenticateToken, requireAdminOrSeller, validateObjectId(), updateMedicineCount);

module.exports = router;
