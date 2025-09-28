/**
 * Swagger Helper Functions
 * Makes it easier to add consistent Swagger documentation
 */

/**
 * Creates a standard error response schema
 * @param {number} statusCode - HTTP status code
 * @param {string} description - Error description
 * @returns {object} Swagger response object
 */
const createErrorResponse = (statusCode, description) => ({
  [statusCode]: {
    description,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error'
        }
      }
    }
  }
});

/**
 * Creates a standard success response schema
 * @param {number} statusCode - HTTP status code
 * @param {string} description - Success description
 * @param {string} schemaRef - Reference to response schema
 * @returns {object} Swagger response object
 */
const createSuccessResponse = (statusCode, description, schemaRef = 'Success') => ({
  [statusCode]: {
    description,
    content: {
      'application/json': {
        schema: {
          $ref: `#/components/schemas/${schemaRef}`
        }
      }
    }
  }
});

/**
 * Creates a paginated response schema
 * @param {string} itemSchemaRef - Reference to the item schema
 * @returns {object} Swagger response object
 */
const createPaginatedResponse = (itemSchemaRef) => ({
  200: {
    description: 'Paginated results',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'array',
              items: {
                $ref: `#/components/schemas/${itemSchemaRef}`
              }
            },
            pagination: {
              type: 'object',
              properties: {
                page: {
                  type: 'number',
                  example: 1
                },
                limit: {
                  type: 'number',
                  example: 10
                },
                total: {
                  type: 'number',
                  example: 100
                },
                pages: {
                  type: 'number',
                  example: 10
                }
              }
            }
          }
        }
      }
    }
  }
});

/**
 * Common response schemas
 */
const commonResponses = {
  unauthorized: createErrorResponse(401, 'Unauthorized - Invalid or missing token'),
  forbidden: createErrorResponse(403, 'Forbidden - Insufficient permissions'),
  notFound: createErrorResponse(404, 'Resource not found'),
  validationError: createErrorResponse(400, 'Validation error'),
  serverError: createErrorResponse(500, 'Internal server error'),
  success: createSuccessResponse(200, 'Success'),
  created: createSuccessResponse(201, 'Resource created successfully')
};

/**
 * Common parameter schemas
 */
const commonParams = {
  id: {
    name: 'id',
    in: 'path',
    required: true,
    schema: {
      type: 'string'
    },
    description: 'Resource ID'
  },
  page: {
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
  limit: {
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
  search: {
    name: 'search',
    in: 'query',
    required: false,
    schema: {
      type: 'string'
    },
    description: 'Search term'
  }
};

/**
 * Security requirements
 */
const security = {
  bearerAuth: [{ bearerAuth: [] }],
  cookieAuth: [{ cookieAuth: [] }],
  optionalAuth: [{ bearerAuth: [] }, { cookieAuth: [] }]
};

module.exports = {
  createErrorResponse,
  createSuccessResponse,
  createPaginatedResponse,
  commonResponses,
  commonParams,
  security
};
