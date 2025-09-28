const express = require('express');
const router = express.Router();
const {
    getMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine,
    getFeaturedMedicines,
    getMedicinesByCategory,
    getLowStockMedicines,
    updateStock
} = require('../controllers/medicineController');
const { authenticateToken, requireAdminOrSeller } = require('../middleware/auth');
const {
    validateMedicine,
    validateStockUpdate,
    validateMedicineFilters,
    validatePagination,
    validateSort,
    validateObjectId
} = require('../middleware/validation');

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
router.get('/', validateMedicineFilters, validatePagination, validateSort, getMedicines);

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
router.get('/:id', validateObjectId(), getMedicineById);

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
router.post('/', authenticateToken, requireAdminOrSeller, validateMedicine, createMedicine);

/**
 * @swagger
 * /api/medicines/{id}:
 *   put:
 *     summary: Update medicine
 *     description: Update an existing medicine (Admin/Seller only)
 *     tags: [Medicines]
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
 *                 example: Paracetamol 500mg
 *               genericName:
 *                 type: string
 *                 example: Acetaminophen
 *               description:
 *                 type: string
 *                 example: Pain relief medicine
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               company:
 *                 type: string
 *                 example: PharmaCorp
 *               perUnitPrice:
 *                 type: number
 *                 example: 12.99
 *               stock:
 *                 type: number
 *                 example: 100
 *               discountPercentage:
 *                 type: number
 *                 example: 10
 *               massUnit:
 *                 type: string
 *                 example: tablet
 *               image:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               prescriptionRequired:
 *                 type: boolean
 *                 example: false
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-31
 *               batchNumber:
 *                 type: string
 *                 example: BATCH001
 *               isFeatured:
 *                 type: boolean
 *                 example: true
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["pain relief", "fever"]
 *     responses:
 *       200:
 *         description: Medicine updated successfully
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
 *                   example: Medicine updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     medicine:
 *                       $ref: '#/components/schemas/Medicine'
 *       400:
 *           $ref: '#/components/responses/ValidationError'
 *       401:
 *           $ref: '#/components/responses/Unauthorized'
 *       403:
 *           $ref: '#/components/responses/Forbidden'
 *       404:
 *           $ref: '#/components/responses/NotFound'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.put('/:id', authenticateToken, requireAdminOrSeller, validateObjectId(), validateMedicine, updateMedicine);

/**
 * @swagger
 * /api/medicines/{id}:
 *   delete:
 *     summary: Delete medicine
 *     description: Soft delete a medicine (Admin/Seller only)
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         description: Medicine deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *           $ref: '#/components/responses/Unauthorized'
 *       403:
 *           $ref: '#/components/responses/Forbidden'
 *       404:
 *           $ref: '#/components/responses/NotFound'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', authenticateToken, requireAdminOrSeller, validateObjectId(), deleteMedicine);

/**
 * @swagger
 * /api/medicines/featured:
 *   get:
 *     summary: Get featured medicines
 *     description: Retrieve featured medicines
 *     tags: [Medicines]
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of featured medicines to retrieve
 *     responses:
 *       200:
 *         description: Featured medicines retrieved successfully
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
 *                   example: Featured medicines retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     medicines:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Medicine'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/featured', getFeaturedMedicines);

/**
 * @swagger
 * /api/medicines/category/{categoryId}:
 *   get:
 *     summary: Get medicines by category
 *     description: Retrieve medicines filtered by category
 *     tags: [Medicines]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - name: sortBy
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [name, perUnitPrice, stock, createdAt]
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
 *         description: Medicines by category retrieved successfully
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
 *                   example: Medicines by category retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       $ref: '#/components/schemas/Category'
 *                     medicines:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Medicine'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: number
 *                           example: 1
 *                         limit:
 *                           type: number
 *                           example: 10
 *                         total:
 *                           type: number
 *                           example: 50
 *                         pages:
 *                           type: number
 *                           example: 5
 *       404:
 *           $ref: '#/components/responses/NotFound'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/category/:categoryId', validateObjectId('categoryId'), validatePagination, validateSort, getMedicinesByCategory);

/**
 * @swagger
 * /api/medicines/low-stock:
 *   get:
 *     summary: Get low stock medicines
 *     description: Retrieve medicines with low stock (Admin/Seller only)
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: threshold
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *           minimum: 1
 *           default: 10
 *         description: Stock threshold for low stock
 *     responses:
 *       200:
 *         description: Low stock medicines retrieved successfully
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
 *                   example: Low stock medicines retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     medicines:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Medicine'
 *                     threshold:
 *                       type: number
 *                       example: 10
 *       401:
 *           $ref: '#/components/responses/Unauthorized'
 *       403:
 *           $ref: '#/components/responses/Forbidden'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/low-stock', authenticateToken, requireAdminOrSeller, getLowStockMedicines);

/**
 * @swagger
 * /api/medicines/{id}/stock:
 *   put:
 *     summary: Update medicine stock
 *     description: Update stock quantity for a medicine (Admin/Seller only)
 *     tags: [Medicines]
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
 *             required:
 *               - stock
 *             properties:
 *               stock:
 *                 type: number
 *                 minimum: 0
 *                 example: 150
 *     responses:
 *       200:
 *         description: Stock updated successfully
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
 *                   example: Stock updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     medicine:
 *                       $ref: '#/components/schemas/Medicine'
 *       400:
 *           $ref: '#/components/responses/ValidationError'
 *       401:
 *           $ref: '#/components/responses/Unauthorized'
 *       403:
 *           $ref: '#/components/responses/Forbidden'
 *       404:
 *           $ref: '#/components/responses/NotFound'
 *       500:
 *           $ref: '#/components/responses/ServerError'
 */
router.put('/:id/stock', authenticateToken, requireAdminOrSeller, validateObjectId(), validateStockUpdate, updateStock);

module.exports = router;
