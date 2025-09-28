import { faker } from '@faker-js/faker';

// Mock users data
export const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@medicinevendor.com',
    password: 'admin123',
    role: 'admin',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    username: 'seller1',
    email: 'seller@medicinevendor.com',
    password: 'seller123',
    role: 'seller',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    username: 'user1',
    email: 'user@medicinevendor.com',
    password: 'user123',
    role: 'user',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-03')
  }
];

// Mock categories data
export const mockCategories = [
  {
    id: '1',
    name: 'Tablets',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop',
    medicineCount: 45,
    description: 'Various tablet medications for different health conditions'
  },
  {
    id: '2',
    name: 'Syrups',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
    medicineCount: 32,
    description: 'Liquid medications and syrups for easy consumption'
  },
  {
    id: '3',
    name: 'Capsules',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop',
    medicineCount: 28,
    description: 'Capsule medications for precise dosage'
  },
  {
    id: '4',
    name: 'Injections',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop',
    medicineCount: 15,
    description: 'Injectable medications for immediate effect'
  },
  {
    id: '5',
    name: 'Creams & Ointments',
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=200&fit=crop',
    medicineCount: 22,
    description: 'Topical medications for skin conditions'
  },
  {
    id: '6',
    name: 'Supplements',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop',
    medicineCount: 38,
    description: 'Health supplements and vitamins'
  }
];

// Generate mock medicines
export const mockMedicines = Array.from({ length: 50 }, (_, index) => ({
  id: `med_${index + 1}`,
  name: faker.helpers.arrayElement([
    'Paracetamol', 'Ibuprofen', 'Aspirin', 'Amoxicillin', 'Metformin',
    'Lisinopril', 'Atorvastatin', 'Omeprazole', 'Metoprolol', 'Simvastatin',
    'Losartan', 'Albuterol', 'Hydrochlorothiazide', 'Gabapentin', 'Sertraline',
    'Tramadol', 'Furosemide', 'Prednisone', 'Warfarin', 'Citalopram'
  ]),
  genericName: faker.helpers.arrayElement([
    'Acetaminophen', 'Ibuprofen', 'Acetylsalicylic Acid', 'Amoxicillin Trihydrate',
    'Metformin HCl', 'Lisinopril', 'Atorvastatin Calcium', 'Omeprazole',
    'Metoprolol Tartrate', 'Simvastatin', 'Losartan Potassium', 'Albuterol Sulfate'
  ]),
  description: faker.lorem.sentence(15),
  image: `https://images.unsplash.com/photo-${1584308666744 + index}?w=300&h=200&fit=crop`,
  category: faker.helpers.arrayElement(mockCategories).name,
  company: faker.helpers.arrayElement([
    'Pfizer', 'Johnson & Johnson', 'Novartis', 'Roche', 'Merck',
    'GlaxoSmithKline', 'Sanofi', 'Bayer', 'Abbott', 'Bristol Myers Squibb'
  ]),
  massUnit: faker.helpers.arrayElement(['Mg', 'ML']),
  perUnitPrice: faker.number.float({ min: 5, max: 500, fractionDigits: 2 }),
  discountPercentage: faker.number.int({ min: 0, max: 30 }),
  sellerEmail: 'seller@medicinevendor.com',
  stock: faker.number.int({ min: 0, max: 100 }),
  createdAt: faker.date.past()
}));

// Mock banner advertisements
export const mockBanners = [
  {
    id: '1',
    medicineId: 'med_1',
    medicineName: 'Paracetamol',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=400&fit=crop',
    description: 'Effective pain relief and fever reduction',
    sellerEmail: 'seller@medicinevendor.com',
    isActive: true
  },
  {
    id: '2',
    medicineId: 'med_2',
    medicineName: 'Ibuprofen',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    description: 'Anti-inflammatory medication for pain relief',
    sellerEmail: 'seller@medicinevendor.com',
    isActive: true
  },
  {
    id: '3',
    medicineId: 'med_3',
    medicineName: 'Amoxicillin',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    description: 'Antibiotic for bacterial infections',
    sellerEmail: 'seller@medicinevendor.com',
    isActive: true
  }
];

// Mock cart items
export const mockCartItems = [
  {
    id: '1',
    medicineId: 'med_1',
    medicineName: 'Paracetamol',
    company: 'Pfizer',
    price: 25.50,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    medicineId: 'med_2',
    medicineName: 'Ibuprofen',
    company: 'Johnson & Johnson',
    price: 35.75,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop'
  }
];

// Mock payment history
export const mockPayments = [
  {
    id: '1',
    userId: '3',
    userEmail: 'user@medicinevendor.com',
    totalAmount: 86.75,
    status: 'paid',
    transactionId: 'TXN_001',
    items: mockCartItems,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    userId: '3',
    userEmail: 'user@medicinevendor.com',
    totalAmount: 125.30,
    status: 'pending',
    transactionId: 'TXN_002',
    items: [
      {
        id: '3',
        medicineId: 'med_3',
        medicineName: 'Amoxicillin',
        company: 'Novartis',
        price: 125.30,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop'
      }
    ],
    createdAt: new Date('2024-01-20')
  }
];

// Mock sales reports
export const mockSalesReports = [
  {
    id: '1',
    medicineName: 'Paracetamol',
    sellerEmail: 'seller@medicinevendor.com',
    buyerEmail: 'user@medicinevendor.com',
    totalPrice: 51.00,
    quantity: 2,
    status: 'paid',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    medicineName: 'Ibuprofen',
    sellerEmail: 'seller@medicinevendor.com',
    buyerEmail: 'user@medicinevendor.com',
    totalPrice: 35.75,
    quantity: 1,
    status: 'paid',
    createdAt: new Date('2024-01-15')
  }
];
