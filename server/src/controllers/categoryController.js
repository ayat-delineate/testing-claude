const Category = require('../models/Category');
const Medicine = require('../models/Medicine');
const { validationResult } = require('express-validator');

/**
 * Get all categories
 */
const getCategories = async (req, res) => {
    try {
        const { active = true } = req.query;

        const query = active === 'true' ? { isActive: true } : {};

        const categories = await Category.find(query)
            .sort({ sortOrder: 1, name: 1 })
            .populate('createdBy', 'name email');

        res.status(200).json({
            success: true,
            message: 'Categories retrieved successfully',
            data: {
                categories
            }
        });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve categories',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Get category by ID
 */
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id)
            .populate('createdBy', 'name email')
            .populate('medicines');

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category retrieved successfully',
            data: {
                category
            }
        });
    } catch (error) {
        console.error('Get category by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve category',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Create new category
 */
const createCategory = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const categoryData = {
            ...req.body,
            createdBy: req.user._id
        };

        const category = new Category(categoryData);
        await category.save();

        // Populate the created category
        await category.populate('createdBy', 'name email');

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: {
                category
            }
        });
    } catch (error) {
        console.error('Create category error:', error);

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Category with this name already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create category',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Update category
 */
const updateCategory = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { id } = req.params;
        const updateData = req.body;

        const category = await Category.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('createdBy', 'name email');

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: {
                category
            }
        });
    } catch (error) {
        console.error('Update category error:', error);

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Category with this name already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update category',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Delete category
 */
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if category has medicines
        const medicineCount = await Medicine.countDocuments({
            category: id,
            isActive: true
        });

        if (medicineCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete category. It contains ${medicineCount} active medicines.`
            });
        }

        const category = await Category.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete category',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Get category statistics
 */
const getCategoryStats = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Get medicine statistics for this category
        const totalMedicines = await Medicine.countDocuments({
            category: id,
            isActive: true
        });

        const lowStockMedicines = await Medicine.countDocuments({
            category: id,
            isActive: true,
            stock: { $lte: 10 }
        });

        const outOfStockMedicines = await Medicine.countDocuments({
            category: id,
            isActive: true,
            stock: 0
        });

        const featuredMedicines = await Medicine.countDocuments({
            category: id,
            isActive: true,
            isFeatured: true
        });

        // Get average price
        const avgPriceResult = await Medicine.aggregate([
            { $match: { category: category._id, isActive: true } },
            { $group: { _id: null, avgPrice: { $avg: '$perUnitPrice' } } }
        ]);

        const avgPrice = avgPriceResult.length > 0 ? avgPriceResult[0].avgPrice : 0;

        res.status(200).json({
            success: true,
            message: 'Category statistics retrieved successfully',
            data: {
                category: {
                    _id: category._id,
                    name: category.name,
                    description: category.description
                },
                statistics: {
                    totalMedicines,
                    lowStockMedicines,
                    outOfStockMedicines,
                    featuredMedicines,
                    averagePrice: Math.round(avgPrice * 100) / 100
                }
            }
        });
    } catch (error) {
        console.error('Get category stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve category statistics',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Update category medicine count
 */
const updateMedicineCount = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        const count = await category.updateMedicineCount();

        res.status(200).json({
            success: true,
            message: 'Medicine count updated successfully',
            data: {
                category: {
                    _id: category._id,
                    name: category.name,
                    medicineCount: count
                }
            }
        });
    } catch (error) {
        console.error('Update medicine count error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update medicine count',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryStats,
    updateMedicineCount
};
