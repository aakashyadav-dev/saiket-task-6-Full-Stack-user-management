// README.md
# User Management REST API

A production-ready REST API for user management built with Node.js, Express, and in-memory data storage. This project demonstrates clean architecture, proper error handling, and RESTful API design principles.

## Project Overview

This API provides complete CRUD operations for managing users. It's designed as a learning project to demonstrate fundamental REST API concepts without the complexity of database integration.

## Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete users
- ✅ **Input Validation** - Express-validator with comprehensive validation rules
- ✅ **Error Handling** - Graceful error handling with appropriate HTTP status codes
- ✅ **Security Middleware** - Helmet for security headers, CORS enabled
- ✅ **Request Logging** - Morgan logger for development
- ✅ **API Versioning** - Versioned endpoints (/api/v1)
- ✅ **Health Check** - Monitoring endpoint for service health
- ✅ **Consistent Response Format** - Standardized success/error responses
- ✅ **Preloaded Data** - 5 sample users for immediate testing
- ✅ **Professional Structure** - MVC pattern with separated concerns

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Nodemon** - Development auto-reload
- **dotenv** - Environment configuration

## Folder Structure
task-4-rest-api/
│
├── server.js # Main application entry point
├── package.json # Dependencies and scripts
├── .env # Environment variables
├── .gitignore # Git ignore file
├── README.md # Documentation
│
├── routes/
│ └── users.js # User route definitions
│
├── controllers/
│ └── userController.js # User request handlers
│
├── models/
│ └── userModel.js # User data operations
│
├── middleware/
│ ├── errorHandler.js # Global error handler
│ ├── notFound.js # 404 handler
│ └── validateUser.js # User validation rules
│
├── utils/
│ └── response.js # Response formatting utilities
│
└── data/
└── users.js # Preloaded sample data

text

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-4-rest-api
Install dependencies:

bash
npm install
How to Run
Development Mode (with auto-reload)
bash
npm run dev
Production Mode
bash
npm start
The server will start on http://localhost:5000 by default.

API Endpoints
Method	Endpoint	Description	Request Body
GET	/api/health	Health check	-
GET	/api/v1/users	Get all users	-
GET	/api/v1/users/:id	Get user by ID	-
POST	/api/v1/users	Create a new user	{ name, email, age }
PUT	/api/v1/users/:id	Update a user	{ name, email, age }
DELETE	/api/v1/users/:id	Delete a user	-
Example Requests
Create User
bash
POST /api/v1/users
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 29
}
Update User
bash
PUT /api/v1/users/1
Content-Type: application/json

{
  "name": "Johnathan Doe",
  "age": 30
}
Example Responses
Success Response
json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "6",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 29,
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
Error Response
json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
Postman Instructions
Import Collection
Open Postman

Click "Import" button

Select the Postman collection file provided in the repository

The collection includes all endpoints with sample requests

Testing Endpoints
Health Check: GET request to /api/health

Get All Users: GET request to /api/v1/users

Create User: POST request with JSON body

Get User: GET request with ID parameter

Update User: PUT request with JSON body and ID parameter

Delete User: DELETE request with ID parameter

Validation Rules
Field	Rules
Name	Required, minimum 3 characters
Email	Required, valid email format, unique
Age	Required, integer between 18-100
HTTP Status Codes
200 OK - Successful GET/PUT/DELETE requests

201 Created - Successful POST request

400 Bad Request - Validation errors

404 Not Found - Resource not found

500 Internal Server Error - Server errors

Future Improvements
Add persistent database (PostgreSQL, MongoDB)

Implement pagination for GET /users endpoint

Add search and filtering capabilities

Implement authentication and authorization

Add rate limiting

Write unit and integration tests

Dockerize the application

Add API documentation with Swagger/OpenAPI

Implement caching strategies

Add request validation middleware for all endpoints

Implement graceful shutdown handling

License
ISC

Author
[Your Name]

Support
For support, email support@example.com or create an issue in the repository.

text

Now let me create the Postman collection:

```json
// Postman Collection - user-management-api.postman_collection.json
{
  "info": {
    "name": "User Management REST API",
    "description": "Complete CRUD operations for user management",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "version": "1.0.0"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/api/health",
          "host": ["{{baseUrl}}"],
          "path": ["api", "health"]
        }
      },
      "response": []
    },
    {
      "name": "Get All Users",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/api/v1/users",
          "host": ["{{baseUrl}}"],
          "path": ["api", "v1", "users"]
        }
      },
      "response": []
    },
    {
      "name": "Get User by ID",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/api/v1/users/1",
          "host": ["{{baseUrl}}"],
          "path": ["api", "v1", "users", "1"]
        }
      },
      "response": []
    },
    {
      "name": "Create User",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Alice Johnson\",\n  \"email\": \"alice.johnson@example.com\",\n  \"age\": 29\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/v1/users",
          "host": ["{{baseUrl}}"],
          "path": ["api", "v1", "users"]
        }
      },
      "response": []
    },
    {
      "name": "Update User",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Johnathan Doe\",\n  \"age\": 30\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/v1/users/1",
          "host": ["{{baseUrl}}"],
          "path": ["api", "v1", "users", "1"]
        }
      },
      "response": []
    },
    {
      "name": "Delete User",
      "request": {
        "method": "DELETE",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/api/v1/users/1",
          "host": ["{{baseUrl}}"],
          "path": ["api", "v1", "users", "1"]
        }
      },
      "response": []
    },
    {
      "name": "Create User - Validation Error",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Jo\",\n  \"email\": \"invalid-email\",\n  \"age\": 15\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/v1/users",
          "host": ["{{baseUrl}}"],
          "path": ["api", "v1", "users"]
        }
      },
      "response": []
    },
    {
      "name": "Create User - Duplicate Email",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"john.doe@example.com\",\n  \"age\": 25\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/v1/users",
          "host": ["{{baseUrl}}"],
          "path": ["api", "v1", "users"]
        }
      },
      "response": []
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000",
      "type": "string"
    }
  ]
}
```

# Summary
I've created a complete, production-ready REST API with all the requested features:

# ✅ All Requirements Met:
Core Features:

Complete CRUD operations for User entity

In-memory data storage with preloaded 5 sample users

Auto-generated unique IDs with timestamps

Express Router for clean route organization

Validation:

Comprehensive express-validator rules for name, email, and age

Duplicate email prevention

Meaningful validation error messages

Middleware:

Express.json(), CORS, Helmet for security

Morgan for request logging

404 handler and Global error handler

API Response Format:

Consistent success/error response structure

Proper HTTP status codes (200, 201, 400, 404, 500)

Bonus Features:

Health check endpoint

API versioning (/api/v1)

Timestamp on created users

Request logging

Graceful error handling

Documentation:

Professional README with all sections

Postman collection with all endpoints

# How to Run:
bash
# Install dependencies
npm install

# Start in development mode
npm run dev

# Or production mode
npm start
Testing with Postman:
Import the provided Postman collection

Set baseUrl variable to http://localhost:5000

Test all endpoints


