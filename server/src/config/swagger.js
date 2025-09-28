const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MedicineVendor API',
            version: '1.0.0',
            description: 'Backend API for MedicineVendor - Multi-vendor e-commerce platform for medicines',
            contact: {
                name: 'MedicineVendor Team',
                email: 'support@medicinevendor.com',
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC',
            },
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? 'https://api.medicinevendor.com'
                    : `http://localhost:${process.env.PORT || 3000}`,
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
            },
        ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
      parameters: {
        Id: {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'Resource ID'
        },
        Page: {
          name: 'page',
          in: 'query',
          required: false,
          schema: {
            type: 'number',
            minimum: 1,
            default: 1
          },
          description: 'Page number'
        },
        Limit: {
          name: 'limit',
          in: 'query',
          required: false,
          schema: {
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 10
          },
          description: 'Number of items per page'
        },
        Search: {
          name: 'search',
          in: 'query',
          required: false,
          schema: {
            type: 'string'
          },
          description: 'Search term'
        }
      },
      responses: {
        Unauthorized: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        Forbidden: {
          description: 'Forbidden - Insufficient permissions',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        ValidationError: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        message: {
                            type: 'string',
                            example: 'Error message',
                        },
                    },
                },
                Success: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true,
                        },
                        message: {
                            type: 'string',
                            example: 'Success message',
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011',
                        },
                        name: {
                            type: 'string',
                            example: 'John Doe',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'john@example.com',
                        },
                        role: {
                            type: 'string',
                            enum: ['user', 'seller', 'admin'],
                            example: 'user',
                        },
                        isActive: {
                            type: 'boolean',
                            example: true,
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                Medicine: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011',
                        },
                        name: {
                            type: 'string',
                            example: 'Paracetamol 500mg',
                        },
                        genericName: {
                            type: 'string',
                            example: 'Acetaminophen',
                        },
                        description: {
                            type: 'string',
                            example: 'Pain relief medicine',
                        },
                        perUnitPrice: {
                            type: 'number',
                            example: 12.99,
                        },
                        stock: {
                            type: 'number',
                            example: 100,
                        },
                        isActive: {
                            type: 'boolean',
                            example: true,
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
            {
                cookieAuth: [],
            },
        ],
    },
    apis: [
        './src/routes/*.js',
        './src/controllers/*.js',
        './src/models/*.js',
    ],
};

const specs = swaggerJsdoc(options);

const swaggerOptions = {
    customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #2563eb; }
  `,
    customSiteTitle: 'MedicineVendor API Documentation',
    customfavIcon: '/favicon.ico',
};

module.exports = {
    swaggerUi,
    specs,
    swaggerOptions,
};
