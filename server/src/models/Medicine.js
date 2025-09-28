const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Medicine name is required'],
        trim: true,
        minlength: [2, 'Medicine name must be at least 2 characters'],
        maxlength: [100, 'Medicine name cannot exceed 100 characters']
    },
    genericName: {
        type: String,
        required: [true, 'Generic name is required'],
        trim: true,
        minlength: [2, 'Generic name must be at least 2 characters'],
        maxlength: [100, 'Generic name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    perUnitPrice: {
        type: Number,
        required: [true, 'Price per unit is required'],
        min: [0, 'Price cannot be negative']
    },
    discountPercentage: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%']
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    massUnit: {
        type: String,
        required: [true, 'Mass unit is required'],
        enum: {
            values: ['mg', 'g', 'ml', 'tablet', 'capsule', 'syrup', 'injection', 'cream', 'ointment'],
            message: 'Invalid mass unit'
        },
        default: 'tablet'
    },
    image: {
        type: String,
        default: null,
        validate: {
            validator: function (v) {
                if (!v) return true; // Allow null/empty
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
            },
            message: 'Please provide a valid image URL'
        }
    },
    images: [{
        type: String,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
            },
            message: 'Please provide a valid image URL'
        }
    }],
    prescriptionRequired: {
        type: Boolean,
        default: false
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry date is required']
    },
    batchNumber: {
        type: String,
        trim: true,
        maxlength: [50, 'Batch number cannot exceed 50 characters']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true,
        maxlength: [30, 'Tag cannot exceed 30 characters']
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better query performance
medicineSchema.index({ name: 'text', genericName: 'text', description: 'text' });
medicineSchema.index({ category: 1 });
medicineSchema.index({ company: 1 });
medicineSchema.index({ isActive: 1 });
medicineSchema.index({ isFeatured: 1 });
medicineSchema.index({ perUnitPrice: 1 });
medicineSchema.index({ stock: 1 });
medicineSchema.index({ createdBy: 1 });

// Virtual for discounted price
medicineSchema.virtual('discountedPrice').get(function () {
    if (this.discountPercentage > 0) {
        return this.perUnitPrice - (this.perUnitPrice * this.discountPercentage / 100);
    }
    return this.perUnitPrice;
});

// Virtual for stock status
medicineSchema.virtual('stockStatus').get(function () {
    if (this.stock === 0) return 'out_of_stock';
    if (this.stock <= 10) return 'low_stock';
    return 'in_stock';
});

// Virtual for expiry status
medicineSchema.virtual('expiryStatus').get(function () {
    const now = new Date();
    const expiry = new Date(this.expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry <= 30) return 'expiring_soon';
    return 'valid';
});

// Pre-save middleware
medicineSchema.pre('save', async function (next) {
    // Update category medicine count if this is a new medicine
    if (this.isNew) {
        const Category = mongoose.model('Category');
        await Category.findByIdAndUpdate(
            this.category,
            { $inc: { medicineCount: 1 } }
        );
    }

    // Update category medicine count if category changed
    if (this.isModified('category') && !this.isNew) {
        const Category = mongoose.model('Category');

        // Decrease count for old category
        if (this._previousCategory) {
            await Category.findByIdAndUpdate(
                this._previousCategory,
                { $inc: { medicineCount: -1 } }
            );
        }

        // Increase count for new category
        await Category.findByIdAndUpdate(
            this.category,
            { $inc: { medicineCount: 1 } }
        );
    }

    next();
});

// Pre-remove middleware
medicineSchema.pre('remove', async function (next) {
    // Decrease category medicine count
    const Category = mongoose.model('Category');
    await Category.findByIdAndUpdate(
        this.category,
        { $inc: { medicineCount: -1 } }
    );
    next();
});

// Static methods
medicineSchema.statics.getActiveMedicines = function () {
    return this.find({ isActive: true }).populate('category', 'name');
};

medicineSchema.statics.getFeaturedMedicines = function () {
    return this.find({ isActive: true, isFeatured: true }).populate('category', 'name');
};

medicineSchema.statics.getLowStockMedicines = function (threshold = 10) {
    return this.find({
        isActive: true,
        stock: { $lte: threshold }
    }).populate('category', 'name');
};

medicineSchema.statics.getExpiringMedicines = function (days = 30) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    return this.find({
        isActive: true,
        expiryDate: { $lte: futureDate }
    }).populate('category', 'name');
};

medicineSchema.statics.searchMedicines = function (searchTerm, filters = {}) {
    const query = { isActive: true };

    if (searchTerm) {
        query.$text = { $search: searchTerm };
    }

    if (filters.category) {
        query.category = filters.category;
    }

    if (filters.company) {
        query.company = new RegExp(filters.company, 'i');
    }

    if (filters.minPrice !== undefined) {
        query.perUnitPrice = { $gte: filters.minPrice };
    }

    if (filters.maxPrice !== undefined) {
        query.perUnitPrice = { ...query.perUnitPrice, $lte: filters.maxPrice };
    }

    if (filters.prescriptionRequired !== undefined) {
        query.prescriptionRequired = filters.prescriptionRequired;
    }

    return this.find(query).populate('category', 'name');
};

// Instance methods
medicineSchema.methods.updateStock = async function (newStock) {
    this.stock = newStock;
    await this.save();
    return this;
};

medicineSchema.methods.reduceStock = async function (quantity) {
    if (this.stock < quantity) {
        throw new Error('Insufficient stock');
    }
    this.stock -= quantity;
    await this.save();
    return this;
};

module.exports = mongoose.model('Medicine', medicineSchema);
