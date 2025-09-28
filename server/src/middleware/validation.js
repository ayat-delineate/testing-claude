const { body, param, query } = require('express-validator');

/**
 * Validation rules for user registration
 */
const validateRegister = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),

    body('role')
        .optional()
        .isIn(['user', 'seller', 'admin'])
        .withMessage('Role must be user, seller, or admin'),

    body('phone')
        .optional()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please provide a valid phone number'),

    body('address.street')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Street address cannot exceed 100 characters'),

    body('address.city')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('City cannot exceed 50 characters'),

    body('address.state')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('State cannot exceed 50 characters'),

    body('address.postalCode')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Postal code cannot exceed 20 characters'),

    body('address.country')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Country cannot exceed 50 characters')
];

/**
 * Validation rules for user login
 */
const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

/**
 * Validation rules for profile update
 */
const validateUpdateProfile = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),

    body('phone')
        .optional()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please provide a valid phone number'),

    body('address.street')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Street address cannot exceed 100 characters'),

    body('address.city')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('City cannot exceed 50 characters'),

    body('address.state')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('State cannot exceed 50 characters'),

    body('address.postalCode')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Postal code cannot exceed 20 characters'),

    body('address.country')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Country cannot exceed 50 characters')
];

/**
 * Validation rules for password change
 */
const validateChangePassword = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),

    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
];

/**
 * Validation rules for refresh token
 */
const validateRefreshToken = [
    body('refreshToken')
        .notEmpty()
        .withMessage('Refresh token is required')
];

/**
 * Validation rules for MongoDB ObjectId
 */
const validateObjectId = (paramName = 'id') => [
    param(paramName)
        .isMongoId()
        .withMessage(`Invalid ${paramName} format`)
];

/**
 * Validation rules for pagination
 */
const validatePagination = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100')
];

/**
 * Validation rules for search
 */
const validateSearch = [
    query('search')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Search term cannot exceed 100 characters')
];

/**
 * Validation rules for sorting
 */
const validateSort = [
    query('sortBy')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Sort field cannot exceed 50 characters'),

    query('sortOrder')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Sort order must be asc or desc')
];

/**
 * Validation rules for medicine creation/update
 */
const validateMedicine = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Medicine name must be between 2 and 100 characters'),

    body('genericName')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Generic name must be between 2 and 100 characters'),

    body('description')
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Description must be between 10 and 1000 characters'),

    body('category')
        .isMongoId()
        .withMessage('Please provide a valid category ID'),

    body('company')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Company name must be between 2 and 100 characters'),

    body('perUnitPrice')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),

    body('discountPercentage')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Discount percentage must be between 0 and 100'),

    body('stock')
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),

    body('massUnit')
        .optional()
        .isIn(['mg', 'g', 'ml', 'tablet', 'capsule', 'syrup', 'injection', 'cream', 'ointment'])
        .withMessage('Invalid mass unit'),

    body('image')
        .optional()
        .isURL()
        .withMessage('Please provide a valid image URL'),

    body('prescriptionRequired')
        .optional()
        .isBoolean()
        .withMessage('Prescription required must be a boolean'),

    body('expiryDate')
        .isISO8601()
        .withMessage('Please provide a valid expiry date'),

    body('batchNumber')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Batch number cannot exceed 50 characters'),

    body('isFeatured')
        .optional()
        .isBoolean()
        .withMessage('Featured status must be a boolean'),

    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),

    body('tags.*')
        .optional()
        .trim()
        .isLength({ max: 30 })
        .withMessage('Each tag cannot exceed 30 characters')
];

/**
 * Validation rules for category creation/update
 */
const validateCategory = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Category name must be between 2 and 50 characters'),

    body('description')
        .trim()
        .isLength({ min: 10, max: 500 })
        .withMessage('Description must be between 10 and 500 characters'),

    body('image')
        .optional()
        .isURL()
        .withMessage('Please provide a valid image URL'),

    body('icon')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Icon name cannot exceed 50 characters'),

    body('sortOrder')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Sort order must be a non-negative integer'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('Active status must be a boolean')
];

/**
 * Validation rules for stock update
 */
const validateStockUpdate = [
    body('stock')
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer')
];

/**
 * Validation rules for medicine filters
 */
const validateMedicineFilters = [
    query('category')
        .optional()
        .isMongoId()
        .withMessage('Please provide a valid category ID'),

    query('company')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Company filter cannot exceed 100 characters'),

    query('minPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Minimum price must be a positive number'),

    query('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Maximum price must be a positive number'),

    query('prescriptionRequired')
        .optional()
        .isBoolean()
        .withMessage('Prescription required filter must be a boolean'),

    query('sortBy')
        .optional()
        .isIn(['name', 'genericName', 'perUnitPrice', 'stock', 'createdAt', 'updatedAt'])
        .withMessage('Invalid sort field')
];

module.exports = {
    validateRegister,
    validateLogin,
    validateUpdateProfile,
    validateChangePassword,
    validateRefreshToken,
    validateObjectId,
    validatePagination,
    validateSearch,
    validateSort,
    validateMedicine,
    validateCategory,
    validateStockUpdate,
    validateMedicineFilters
};
