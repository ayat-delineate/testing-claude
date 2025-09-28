# MedicineVendor Backend API

Backend API for MedicineVendor - Multi-vendor e-commerce platform for medicines.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create environment file:**

   ```bash
   cp env.example .env
   ```

3. **Configure environment variables:**
   Edit `.env` file with your configuration:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/medicinevendor
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   JWT_COOKIE_EXPIRE=7
   CLIENT_URL=http://localhost:5173
   ADMIN_EMAIL=admin@medicinevendor.com
   ADMIN_PASSWORD=admin123456
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system.

5. **Run the server:**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

### 🧪 Testing the Setup

1. **Health Check:**

   ```bash
   curl http://localhost:5000/health
   ```

2. **API Welcome:**
   ```bash
   curl http://localhost:5000/api
   ```

### 📁 Project Structure

```
server/
├── src/
│   ├── config/          # Database and app configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── .env                 # Environment variables
├── env.example          # Environment variables template
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

### 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (coming soon)

### 🌐 API Endpoints

#### Health & Info

- `GET /health` - Health check
- `GET /api` - API information

#### Authentication (Coming Soon)

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Medicines (Coming Soon)

- `GET /api/medicines` - Get all medicines
- `GET /api/medicines/:id` - Get single medicine
- `POST /api/medicines` - Create medicine (Seller/Admin)

### 🛠️ Development Plan

This backend is being developed step by step:

1. ✅ **Phase 1: Project Setup & Database Connection**
2. 🔄 **Phase 2: Authentication System**
3. ⏳ **Phase 3: Core Models & Basic CRUD**
4. ⏳ **Phase 4: Medicine Management**
5. ⏳ **Phase 5: Order System**
6. ⏳ **Phase 6: Payment Integration**
7. ⏳ **Phase 7: Admin Features**
8. ⏳ **Phase 8: Advanced Features**

### 📝 Notes

- The server uses MongoDB for data storage
- JWT tokens for authentication
- Express.js for the web framework
- Comprehensive error handling and logging
- Rate limiting for API protection
- CORS enabled for frontend integration

### 🐛 Troubleshooting

**MongoDB Connection Issues:**

- Ensure MongoDB is running
- Check the MONGODB_URI in your .env file
- Verify MongoDB is accessible on the specified port

**Port Already in Use:**

- Change the PORT in your .env file
- Or kill the process using the port: `lsof -ti:5000 | xargs kill -9`

**Environment Variables:**

- Make sure .env file exists and has all required variables
- Check that JWT_SECRET is set and secure
