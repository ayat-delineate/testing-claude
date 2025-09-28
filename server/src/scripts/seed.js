const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Category = require('../models/Category');
const Medicine = require('../models/Medicine');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medicinevendor');
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Medicine categories data
const medicineCategories = [
    { name: 'Antibiotics', description: 'Medicines that fight bacterial infections' },
    { name: 'Pain Relief', description: 'Medicines for pain management and relief' },
    { name: 'Cardiovascular', description: 'Medicines for heart and blood vessel conditions' },
    { name: 'Diabetes', description: 'Medicines for diabetes management' },
    { name: 'Respiratory', description: 'Medicines for breathing and lung conditions' },
    { name: 'Gastrointestinal', description: 'Medicines for digestive system conditions' },
    { name: 'Neurological', description: 'Medicines for nervous system conditions' },
    { name: 'Dermatology', description: 'Medicines for skin conditions' },
    { name: 'Vitamins & Supplements', description: 'Nutritional supplements and vitamins' },
    { name: 'Antihistamines', description: 'Medicines for allergies and allergic reactions' },
    { name: 'Antacids', description: 'Medicines for stomach acid and indigestion' },
    { name: 'Cough & Cold', description: 'Medicines for respiratory symptoms' },
    { name: 'Eye Care', description: 'Medicines for eye conditions' },
    { name: 'Ear Care', description: 'Medicines for ear conditions' },
    { name: 'Women\'s Health', description: 'Medicines for women\'s health conditions' },
    { name: 'Men\'s Health', description: 'Medicines for men\'s health conditions' },
    { name: 'Pediatric', description: 'Medicines for children' },
    { name: 'Geriatric', description: 'Medicines for elderly care' },
    { name: 'Emergency', description: 'Emergency and first aid medicines' },
    { name: 'Specialty', description: 'Specialized medicines for rare conditions' }
];

// Pharmaceutical companies
const companies = [
    'Pfizer Inc.', 'Johnson & Johnson', 'Roche Holding AG', 'Novartis AG',
    'Merck & Co.', 'GlaxoSmithKline', 'Sanofi S.A.', 'AbbVie Inc.',
    'Bristol Myers Squibb', 'AstraZeneca PLC', 'Gilead Sciences', 'Amgen Inc.',
    'Moderna Inc.', 'Regeneron Pharmaceuticals', 'Biogen Inc.', 'Vertex Pharmaceuticals',
    'Illumina Inc.', 'Thermo Fisher Scientific', 'Danaher Corporation', 'Abbott Laboratories',
    'Medtronic PLC', 'Boston Scientific', 'Stryker Corporation', 'Becton Dickinson',
    'Zimmer Biomet', 'Edwards Lifesciences', 'Intuitive Surgical', 'Align Technology',
    'Insulet Corporation', 'DexCom Inc.', 'Teladoc Health', 'Livongo Health',
    'PharmaCorp', 'MediLife', 'HealthTech Solutions', 'BioMed Innovations',
    'CurePharma', 'VitaMed', 'Wellness Labs', 'Therapeutic Solutions'
];

// Medicine names and their generic equivalents
const medicineData = [
    { name: 'Paracetamol', generic: 'Acetaminophen' },
    { name: 'Ibuprofen', generic: 'Ibuprofen' },
    { name: 'Aspirin', generic: 'Acetylsalicylic Acid' },
    { name: 'Amoxicillin', generic: 'Amoxicillin' },
    { name: 'Metformin', generic: 'Metformin Hydrochloride' },
    { name: 'Lisinopril', generic: 'Lisinopril' },
    { name: 'Atorvastatin', generic: 'Atorvastatin Calcium' },
    { name: 'Omeprazole', generic: 'Omeprazole' },
    { name: 'Simvastatin', generic: 'Simvastatin' },
    { name: 'Losartan', generic: 'Losartan Potassium' },
    { name: 'Albuterol', generic: 'Albuterol Sulfate' },
    { name: 'Metoprolol', generic: 'Metoprolol Tartrate' },
    { name: 'Hydrochlorothiazide', generic: 'Hydrochlorothiazide' },
    { name: 'Sertraline', generic: 'Sertraline Hydrochloride' },
    { name: 'Montelukast', generic: 'Montelukast Sodium' },
    { name: 'Pantoprazole', generic: 'Pantoprazole Sodium' },
    { name: 'Tramadol', generic: 'Tramadol Hydrochloride' },
    { name: 'Ciprofloxacin', generic: 'Ciprofloxacin Hydrochloride' },
    { name: 'Fluoxetine', generic: 'Fluoxetine Hydrochloride' },
    { name: 'Furosemide', generic: 'Furosemide' }
];

// Generate random medicine
const generateMedicine = (categoryId, createdBy) => {
    const medicine = faker.helpers.arrayElement(medicineData);
    const company = faker.helpers.arrayElement(companies);
    const basePrice = faker.number.float({ min: 5, max: 500, fractionDigits: 2 });
    const discountPercentage = faker.helpers.weightedArrayElement([
        { weight: 60, value: 0 },
        { weight: 25, value: faker.number.int({ min: 5, max: 15 }) },
        { weight: 10, value: faker.number.int({ min: 16, max: 30 }) },
        { weight: 5, value: faker.number.int({ min: 31, max: 50 }) }
    ]);

    const discountedPrice = basePrice * (1 - discountPercentage / 100);
    const stock = faker.helpers.weightedArrayElement([
        { weight: 5, value: 0 },
        { weight: 10, value: faker.number.int({ min: 1, max: 5 }) },
        { weight: 20, value: faker.number.int({ min: 6, max: 20 }) },
        { weight: 65, value: faker.number.int({ min: 21, max: 200 }) }
    ]);

    const expiryDate = faker.date.future({ years: 3 });
    const batchNumber = `BATCH${faker.string.alphanumeric(6).toUpperCase()}`;

    const tags = faker.helpers.arrayElements([
        'pain relief', 'fever', 'inflammation', 'antibiotic', 'antiviral',
        'antifungal', 'antihistamine', 'antacid', 'laxative', 'diuretic',
        'anticoagulant', 'antihypertensive', 'antidiabetic', 'bronchodilator',
        'corticosteroid', 'immunosuppressant', 'antidepressant', 'anxiolytic',
        'antipsychotic', 'anticonvulsant', 'muscle relaxant', 'sleep aid',
        'vitamin', 'supplement', 'probiotic', 'antioxidant'
    ], { min: 1, max: 4 });

    return {
        name: `${medicine.name} ${faker.number.int({ min: 100, max: 1000 })}mg`,
        genericName: medicine.generic,
        description: faker.lorem.sentence({ min: 10, max: 30 }),
        category: categoryId,
        company: company,
        perUnitPrice: basePrice,
        discountPercentage: discountPercentage,
        discountedPrice: Math.round(discountedPrice * 100) / 100,
        stock: stock,
        stockStatus: stock > 10 ? 'in_stock' : stock > 0 ? 'low_stock' : 'out_of_stock',
        massUnit: faker.helpers.arrayElement(['tablet', 'capsule', 'ml', 'mg', 'g', 'piece']),
        image: null, // We'll leave this null for now
        images: [],
        prescriptionRequired: faker.datatype.boolean({ probability: 0.3 }),
        expiryDate: expiryDate,
        expiryStatus: expiryDate > new Date() ? 'valid' : 'expired',
        batchNumber: batchNumber,
        isActive: true,
        isFeatured: faker.datatype.boolean({ probability: 0.1 }),
        tags: tags,
        createdBy: createdBy,
        createdAt: faker.date.past({ years: 2 }),
        updatedAt: new Date()
    };
};

// Create admin user if not exists
const createAdminUser = async () => {
    try {
        let admin = await User.findOne({ email: 'admin@medicinevendor.com' });

        if (!admin) {
            admin = new User({
                name: 'Admin User',
                email: 'admin@medicinevendor.com',
                password: 'admin123', // This will be hashed by the model
                role: 'admin',
                phone: '+1234567890',
                address: {
                    street: '123 Admin Street',
                    city: 'Admin City',
                    state: 'Admin State',
                    zipCode: '12345',
                    country: 'USA'
                },
                isActive: true,
                emailVerified: true
            });

            await admin.save();
            console.log('✅ Admin user created');
        } else {
            console.log('✅ Admin user already exists');
        }

        return admin;
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        throw error;
    }
};

// Create categories
const createCategories = async () => {
    try {
        const categories = [];

        for (const categoryData of medicineCategories) {
            let category = await Category.findOne({ name: categoryData.name });

            if (!category) {
                category = new Category(categoryData);
                await category.save();
                console.log(`✅ Created category: ${categoryData.name}`);
            } else {
                console.log(`✅ Category already exists: ${categoryData.name}`);
            }

            categories.push(category);
        }

        return categories;
    } catch (error) {
        console.error('❌ Error creating categories:', error);
        throw error;
    }
};

// Create medicines
const createMedicines = async (categories, adminUser) => {
    try {
        console.log('🌱 Starting to create 1000 medicines...');

        const batchSize = 100;
        const totalBatches = Math.ceil(1000 / batchSize);

        for (let batch = 0; batch < totalBatches; batch++) {
            const medicines = [];
            const currentBatchSize = batch === totalBatches - 1 ? 1000 - (batch * batchSize) : batchSize;

            for (let i = 0; i < currentBatchSize; i++) {
                const randomCategory = faker.helpers.arrayElement(categories);
                const medicine = generateMedicine(randomCategory._id, adminUser._id);
                medicines.push(medicine);
            }

            await Medicine.insertMany(medicines);
            console.log(`✅ Created batch ${batch + 1}/${totalBatches} (${medicines.length} medicines)`);
        }

        console.log('🎉 Successfully created 1000 medicines!');
    } catch (error) {
        console.error('❌ Error creating medicines:', error);
        throw error;
    }
};

// Main seed function
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Connect to database
        await connectDB();

        // Create admin user
        const adminUser = await createAdminUser();

        // Create categories
        const categories = await createCategories();

        // Create medicines
        await createMedicines(categories, adminUser);

        console.log('🎉 Database seeding completed successfully!');

        // Get final counts
        const userCount = await User.countDocuments();
        const categoryCount = await Category.countDocuments();
        const medicineCount = await Medicine.countDocuments();

        console.log('\n📊 Final Database Statistics:');
        console.log(`👥 Users: ${userCount}`);
        console.log(`📂 Categories: ${categoryCount}`);
        console.log(`💊 Medicines: ${medicineCount}`);

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
    }
};

// Run the seed function
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase };