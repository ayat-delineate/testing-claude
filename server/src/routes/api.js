const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: API information
 *     description: Returns basic information about the API and available endpoints
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API information
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
 *                   example: Welcome to MedicineVendor API
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     health:
 *                       type: string
 *                       example: /health
 *                     api:
 *                       type: string
 *                       example: /api
 *                     documentation:
 *                       type: string
 *                       example: /api-docs
 */
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to MedicineVendor API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            api: '/api',
            documentation: '/api-docs',
        },
    });
});

module.exports = router;
