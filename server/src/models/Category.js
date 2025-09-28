const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true,
        minlength: [2, 'Category name must be at least 2 characters'],
        maxlength: [50, 'Category name cannot exceed 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Category description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
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
    icon: {
        type: String,
        default: 'Package', // Default Lucide icon name
        trim: true
    },
    medicineCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sortOrder: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for better query performance
categorySchema.index({ name: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ sortOrder: 1 });

// Virtual for medicines in this category
categorySchema.virtual('medicines', {
    ref: 'Medicine',
    localField: '_id',
    foreignField: 'category',
    justOne: false
});

// Pre-save middleware to update medicine count
categorySchema.pre('save', async function (next) {
    if (this.isNew) {
        // For new categories, medicine count starts at 0
        this.medicineCount = 0;
    }
    next();
});

// Static method to get active categories
categorySchema.statics.getActiveCategories = function () {
    return this.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
};

// Static method to get category with medicine count
categorySchema.statics.getCategoryWithCount = function (categoryId) {
    return this.findById(categoryId).populate('medicines');
};

// Instance method to update medicine count
categorySchema.methods.updateMedicineCount = async function () {
    const Medicine = mongoose.model('Medicine');
    const count = await Medicine.countDocuments({
        category: this._id,
        isActive: true
    });
    this.medicineCount = count;
    await this.save();
    return count;
};

module.exports = mongoose.model('Category', categorySchema);
