const Medicine = require('../models/Medicine');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

/**
 * Get all medicines with pagination, search, and filtering
 */
const getMedicines = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            category,
            company,
            minPrice,
            maxPrice,
            prescriptionRequired,
            sortBy = 'name',
            sortOrder = 'asc'
        } = req.query;

        // Build query
        const query = { isActive: true };

        // Search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { genericName: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by company
        if (company) {
            query.company = { $regex: company, $options: 'i' };
        }

        // Price range filter
        if (minPrice || maxPrice) {
            query.perUnitPrice = {};
            if (minPrice) query.perUnitPrice.$gte = parseFloat(minPrice);
            if (maxPrice) query.perUnitPrice.$lte = parseFloat(maxPrice);
        }

        // Prescription filter
        if (prescriptionRequired !== undefined) {
            query.prescriptionRequired = prescriptionRequired === 'true';
        }

        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute query
        const medicines = await Medicine.find(query)
            .populate('category', 'name description')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await Medicine.countDocuments(query);

        res.status(200).json({
            success: true,
            message: 'Medicines retrieved successfully',
            data: {
                medicines,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.error('Get medicines error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve medicines',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Get medicine by ID
 */
const getMedicineById = async (req, res) => {
    try {
        const { id } = req.params;

        const medicine = await Medicine.findById(id)
            .populate('category', 'name description')
            .populate('createdBy', 'name email')
            .populate('updatedBy', 'name email');

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Medicine retrieved successfully',
            data: {
                medicine
            }
        });
    } catch (error) {
        console.error('Get medicine by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve medicine',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Create new medicine
 */
const createMedicine = async (req, res) => {
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

        const medicineData = {
            ...req.body,
            createdBy: req.user._id
        };

        // Verify category exists
        const category = await Category.findById(medicineData.category);
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category not found'
            });
        }

        const medicine = new Medicine(medicineData);
        await medicine.save();

        // Populate the created medicine
        await medicine.populate('category', 'name description');
        await medicine.populate('createdBy', 'name email');

        res.status(201).json({
            success: true,
            message: 'Medicine created successfully',
            data: {
                medicine
            }
        });
    } catch (error) {
        console.error('Create medicine error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create medicine',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Update medicine
 */
const updateMedicine = async (req, res) => {
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
        const updateData = {
            ...req.body,
            updatedBy: req.user._id
        };

        // Verify category exists if being updated
        if (updateData.category) {
            const category = await Category.findById(updateData.category);
            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: 'Category not found'
                });
            }
        }

        const medicine = await Medicine.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('category', 'name description')
            .populate('createdBy', 'name email')
            .populate('updatedBy', 'name email');

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Medicine updated successfully',
            data: {
                medicine
            }
        });
    } catch (error) {
        console.error('Update medicine error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update medicine',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Delete medicine (soft delete)
 */
const deleteMedicine = async (req, res) => {
    try {
        const { id } = req.params;

        const medicine = await Medicine.findByIdAndUpdate(
            id,
            { isActive: false, updatedBy: req.user._id },
            { new: true }
        );

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Medicine deleted successfully'
        });
    } catch (error) {
        console.error('Delete medicine error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete medicine',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Get featured medicines
 */
const getFeaturedMedicines = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const medicines = await Medicine.find({
            isActive: true,
            isFeatured: true
        })
            .populate('category', 'name description')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            message: 'Featured medicines retrieved successfully',
            data: {
                medicines
            }
        });
    } catch (error) {
        console.error('Get featured medicines error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve featured medicines',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Get medicines by category
 */
const getMedicinesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;

        // Verify category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Build query
        const query = {
            isActive: true,
            category: categoryId
        };

        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute query
        const medicines = await Medicine.find(query)
            .populate('category', 'name description')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count
        const total = await Medicine.countDocuments(query);

        res.status(200).json({
            success: true,
            message: 'Medicines by category retrieved successfully',
            data: {
                category,
                medicines,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.error('Get medicines by category error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve medicines by category',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Get low stock medicines
 */
const getLowStockMedicines = async (req, res) => {
    try {
        const { threshold = 10 } = req.query;

        const medicines = await Medicine.find({
            isActive: true,
            stock: { $lte: parseInt(threshold) }
        })
            .populate('category', 'name description')
            .sort({ stock: 1 });

        res.status(200).json({
            success: true,
            message: 'Low stock medicines retrieved successfully',
            data: {
                medicines,
                threshold: parseInt(threshold)
            }
        });
    } catch (error) {
        console.error('Get low stock medicines error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve low stock medicines',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Update medicine stock
 */
const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        if (stock < 0) {
            return res.status(400).json({
                success: false,
                message: 'Stock cannot be negative'
            });
        }

        const medicine = await Medicine.findByIdAndUpdate(
            id,
            { stock, updatedBy: req.user._id },
            { new: true, runValidators: true }
        ).populate('category', 'name description');

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Stock updated successfully',
            data: {
                medicine
            }
        });
    } catch (error) {
        console.error('Update stock error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update stock',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    getMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine,
    getFeaturedMedicines,
    getMedicinesByCategory,
    getLowStockMedicines,
    updateStock
};
