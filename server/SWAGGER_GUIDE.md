# 📚 Swagger Documentation Guide

## 🎯 **Overview**

This project uses **Swagger UI + swagger-jsdoc** for API documentation. The documentation is automatically generated from JSDoc comments in your route files.

## 🚀 **Access Documentation**

- **Development**: http://localhost:3000/api-docs
- **Production**: https://api.medicinevendor.com/api-docs

## 📁 **File Structure**

```
server/src/
├── config/
│   └── swagger.js          # Swagger configuration
├── routes/
│   ├── health.js           # Health check routes
│   ├── api.js              # API info routes
│   ├── auth.js             # Authentication routes
│   └── medicines.js        # Medicine routes
├── utils/
│   └── swaggerHelpers.js   # Helper functions
└── templates/
    └── route-template.js   # Template for new routes
```

## ✨ **Adding New Routes**

### 1. **Create Route File**

```bash
# Create new route file
touch src/routes/your-feature.js
```

### 2. **Use Template**

Copy from `src/templates/route-template.js` and modify:

```javascript
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: YourFeature
 *   description: Your feature description
 */

/**
 * @swagger
 * /api/your-feature:
 *   get:
 *     summary: Get all items
 *     description: Retrieve paginated list
 *     tags: [YourFeature]
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/YourSchema'
 *       400:
 *           $ref: '#/components/responses/ValidationError'
 */
router.get('/', (req, res) => {
  res.json({ success: true, data: [] });
});

module.exports = router;
```

### 3. **Register Route**

Add to `src/server.js`:

```javascript
const yourFeatureRoutes = require('./routes/your-feature');
app.use('/api/your-feature', yourFeatureRoutes);
```

## 🛠 **Available Helpers**

### **Common Parameters**

- `$ref: '#/components/parameters/Id'` - Resource ID
- `$ref: '#/components/parameters/Page'` - Page number
- `$ref: '#/components/parameters/Limit'` - Items per page
- `$ref: '#/components/parameters/Search'` - Search term

### **Common Responses**

- `$ref: '#/components/responses/Unauthorized'` - 401
- `$ref: '#/components/responses/Forbidden'` - 403
- `$ref: '#/components/responses/NotFound'` - 404
- `$ref: '#/components/responses/ValidationError'` - 400
- `$ref: '#/components/responses/ServerError'` - 500

### **Security**

```javascript
security:
  - bearerAuth: []    # JWT token required
  - cookieAuth: []    # Cookie auth required
```

## 📋 **Schema Examples**

### **Add New Schema**

In `src/config/swagger.js`, add to `schemas`:

```javascript
YourSchema: {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      example: '507f1f77bcf86cd799439011'
    },
    name: {
      type: 'string',
      example: 'Item Name'
    },
    // ... more properties
  }
}
```

## 🎨 **Best Practices**

### ✅ **Do:**

- Use descriptive summaries and descriptions
- Include all required parameters
- Document all possible responses
- Use consistent naming conventions
- Add examples for better understanding
- Group related endpoints with tags

### ❌ **Don't:**

- Skip response documentation
- Use vague descriptions
- Forget to include error responses
- Mix different naming conventions
- Document endpoints without implementation

## 🔧 **Advanced Features**

### **Conditional Responses**

```javascript
responses:
  200:
    description: Success
    content:
      application/json:
        schema:
          oneOf:
            - $ref: '#/components/schemas/Success'
            - $ref: '#/components/schemas/Error'
```

### **File Upload**

```javascript
requestBody:
  required: true
  content:
    multipart/form-data:
      schema:
        type: object
        properties:
          file:
            type: string
            format: binary
          name:
            type: string
```

### **Array Parameters**

```javascript
parameters:
  - name: categories
    in: query
    required: false
    schema:
      type: array
      items:
        type: string
    style: form
    explode: true
```

## 🚀 **Quick Start Checklist**

- [ ] Create route file in `src/routes/`
- [ ] Add JSDoc comments with `@swagger`
- [ ] Include tag definition
- [ ] Document all endpoints
- [ ] Add parameters and responses
- [ ] Register route in `server.js`
- [ ] Test in Swagger UI
- [ ] Add schema definitions if needed

## 📖 **Resources**

- [OpenAPI 3.0 Specification](https://swagger.io/specification/)
- [Swagger JSDoc](https://github.com/Surnet/swagger-jsdoc)
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)

---

**Happy Documenting! 🎉**
