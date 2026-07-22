## TASK 5 SUBMISSION REPORT
# REST API with MySQL Database Integration
## 📋 Student Information
**Student Name:** Aakash Yadav
**Task Number:** Task 5
**Task Title:** REST API with MySQL Database Integration
**Date of Submission:** July 21, 2026
**Project Name:** task-5-rest-api-mysql
**Upgraded From:** Task 4 - REST API with In-Memory Storage

# 📌 Project Overview
Upgraded Task 4 REST API from in-memory storage to MySQL database while maintaining the same API endpoints and response formats. This demonstrates professional database 
integration with Node.js, including connection pooling, SQL injection prevention, and persistent data storage.

# 🛠️ Technologies Used
Technology	Version	Purpose
Node.js	v20.20.1	JavaScript runtime
Express.js	^4.18.2	Web framework
MySQL	8.0+	Relational database
mysql2	^3.6.0	MySQL driver with promises
Express Validator	^7.0.1	Input validation
Helmet	^7.1.0	Security headers
CORS	^2.8.5	Cross-origin support
Morgan	^1.10.0	Request logging
Nodemon	^3.0.2	Auto-reload development
dotenv	^16.3.1	Environment configuration

## 🎯 Features Implemented

✅ **Database Integration**
- MySQL connection with connection pooling
- Parameterized queries (SQL injection prevention)
- Automatic connection testing
- Graceful error handling
- 10 preloaded sample users

✅ **CRUD Operations (Same as Task 4)**
- Create User (POST /api/v1/users)
- Read All Users (GET /api/v1/users)
- Read Single User (GET /api/v1/users/:id)
- Update User (PUT /api/v1/users/:id)
- Delete User (DELETE /api/v1/users/:id)

✅ **Validation (Same as Task 4)**
- Name: Required, minimum 3 characters
- Email: Required, valid format, unique
- Age: Required, integer between 18-100

✅ **Bonus Features**
- Health check endpoint
- Database status endpoint
- Seed script for sample data
- Connection pooling
- Environment-based configuration

# 🗄️ Database Schema

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_age (age)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

## 📁 Project Structure

task-5-rest-api-mysql/
│
├── server.js                 # Main application entry point
├── package.json              # Dependencies and scripts
├── .env                      # Environment variables
├── database.sql              # Database schema
├── seed.js                   # Database seeding script
├── README.md                 # Documentation
├── postman-collection.json   # Postman collection
│
├── config/
│   └── db.js                # Database connection pool
│
├── routes/
│   └── users.js             # User route definitions
│
├── controllers/
│   └── userController.js    # User request handlers
│
├── models/
│   └── userModel.js         # Database operations
│
├── middleware/
│   ├── errorHandler.js      # Global error handler
│   ├── notFound.js          # 404 handler
│   └── validateUser.js      # User validation rules
│
└── utils/
    └── response.js          # Response formatting utilities

    
# 🚀 API Endpoints
Method	Endpoint	Description	Status
GET	/api/health	Health check	✅
GET	/api/database-status	Database connection status	✅
GET	/api/v1/users	Get all users	✅
GET	/api/v1/users/:id	Get user by ID	✅
POST	/api/v1/users	Create a new user	✅
PUT	/api/v1/users/:id	Update a user	✅
DELETE	/api/v1/users/:id	Delete a user	✅

# 📊 Sample Users (Seeded)
ID	Name	Email	Age
1	John Doe	john.doe@example.com	28
2	Jane Smith	jane.smith@example.com	34
3	Michael Johnson	michael.j@example.com	42
4	Sarah Williams	sarah.w@example.com	25
5	Robert Brown	robert.b@example.com	31
6	Emily Davis	emily.d@example.com	29
7	David Wilson	david.w@example.com	37
8	Lisa Anderson	lisa.a@example.com	26
9	James Taylor	james.t@example.com	45
10	Maria Garcia	maria.g@example.com	33
🎯 Database Operations
javascript
// All operations use parameterized queries
class UserModel {
    // SELECT * FROM users
    static async findAll() { /* ... */ }
    
    // SELECT * FROM users WHERE id = ?
    static async findById(id) { /* ... */ }
    
    // INSERT INTO users VALUES (?, ?, ?)
    static async create(userData) { /* ... */ }
    
    // UPDATE users SET ... WHERE id = ?
    static async update(id, userData) { /* ... */ }
    
    // DELETE FROM users WHERE id = ?
    static async delete(id) { /* ... */ }
}
🛡️ Security Features
markdown
✅ **SQL Injection Prevention**
- Parameterized queries with ? placeholders
- No string concatenation in SQL

✅ **Input Validation**
- Express-validator for all inputs
- Sanitization and normalization

✅ **Security Headers**
- Helmet middleware
- CORS configuration
- Content Security Policy

✅ **Error Handling**
- No stack traces in production
- Custom error messages
- Proper HTTP status codes
📝 API Response Format
Success Response:

json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 11,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 29,
    "createdAt": "2026-07-21T15:30:00.000Z"
  },
  "timestamp": "2026-07-21T15:30:00.000Z"
}
Error Response:

json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is already registered"
    }
  ],
  "timestamp": "2026-07-21T15:30:00.000Z"
}
✅ Testing Results
Test Case	Expected Result	Actual Result	Status
GET /api/health	200 OK	200 OK	✅ PASS
GET /api/database-status	Database: Connected	Database: Connected	✅ PASS
GET /api/v1/users	10 users returned	10 users returned	✅ PASS
GET /api/v1/users/1	User found	User found	✅ PASS
POST /api/v1/users	201 Created	201 Created	✅ PASS
PUT /api/v1/users/1	200 OK	200 OK	✅ PASS
DELETE /api/v1/users/11	200 OK	200 OK	✅ PASS
Invalid email	400 Bad Request	400 Bad Request	✅ PASS
Duplicate email	400 Bad Request	400 Bad Request	✅ PASS
Age validation	400 Bad Request	400 Bad Request	✅ PASS
Invalid ID	404 Not Found	404 Not Found	✅ PASS
Database connection	Connected	Connected	✅ PASS
🎓 Key Learnings
markdown
1. **Database Integration**
   - Connection pooling in Node.js
   - MySQL with mysql2/promise
   - Parameterized queries for security
   - Handling database errors

2. **Production Best Practices**
   - Environment-based configuration
   - Graceful shutdown handling
   - Connection error recovery
   - Proper logging and monitoring

3. **Data Persistence**
   - Migrating from in-memory to database
   - Maintaining API compatibility
   - Data seeding strategies
   - Schema design and indexing

4. **Security**
   - SQL injection prevention
   - Input validation and sanitization
   - Secure connection management
   - Error message handling

5. **Architecture**
   - Separation of concerns (MVC)
   - Repository pattern
   - Dependency injection
   - Singleton pattern for database
🔄 Task 4 vs Task 5 Comparison
Aspect	Task 4 (In-Memory)	Task 5 (MySQL)
Data Storage	JavaScript Array	MySQL Database
Data Persistence	❌ Lost on restart	✅ Permanent
Data Structure	Object with string ID	Table with auto-increment INT
Data Operations	Array methods	Parameterized SQL queries
Data Initialization	Preloaded in code	Seed script / SQL file
Sample Users	5 users	10 users
Connection Management	N/A	Connection Pool
SQL Injection Risk	N/A	✅ Protected
Environment Config	Basic	Advanced with DB creds
Error Handling	Basic	Comprehensive DB errors
Bonus Features	Health check	Health + Database status
Production Ready	✅	✅ Production+
🐛 Challenges Faced & Solutions
Challenge	Solution
MySQL installation on macOS	Used Homebrew with proper configuration
Root password issues	Reset using safe mode with --skip-grant-tables
mysql_native_password plugin	Used caching_sha2_password plugin
Module not found (mysql2)	Installed mysql2 package
Access denied errors	Fixed .env with empty password
Connection pooling setup	Implemented proper pool configuration
Parameterized query syntax	Used ? placeholders in SQL
Duplicate email handling	Used UNIQUE constraint and error handling
Database status checking	Implemented testConnection method
🚀 How to Run
bash
# 1. Install dependencies
npm install

# 2. Setup MySQL
# Create database user_management
# Import database.sql or create tables manually

# 3. Configure .env
# Add MySQL credentials

# 4. Seed database (optional)
npm run seed

# 5. Start development server
npm run dev

# 6. Test with Postman
# Import postman-collection.json
# Set baseUrl to http://localhost:5000
📊 HTTP Status Codes Used
Status Code	Description	Usage
200 OK	Success	GET, PUT, DELETE
201 Created	Resource created	POST
400 Bad Request	Validation error	Invalid data
404 Not Found	Resource not found	Invalid ID/Route
500 Internal Server Error	Server/DB error	Unexpected errors
🏆 Achievements
markdown
✅ Successfully upgraded Task 4 to use MySQL
✅ Maintained 100% API compatibility with Task 4
✅ Implemented connection pooling for efficiency
✅ Protected against SQL injection
✅ Added database status monitoring
✅ Created seed script for data population
✅ Comprehensive error handling for DB operations
✅ Professional documentation
✅ Production-ready code with best practices
📝 Future Improvements
markdown
1. Add pagination and filtering
2. Implement JWT authentication
3. Add Redis caching layer
4. Implement database migrations
5. Write unit and integration tests
6. Dockerize the application
7. Add Swagger/OpenAPI documentation
8. Implement audit logging
9. Add soft delete functionality
10. Create database backup scripts
🔗 Project Links
markdown
- **GitHub Repository:** [link]

📄 Declaration
markdown
I hereby declare that this project is my original work and has been completed 
according to the internship requirements.

**Name:** Aakash Yadav
**Date:** July 21, 2026
**Signature:** Aakash Yadav
📦 Submission Package Checklist
For Task 4
Complete project code

README.md

Postman collection

Screenshots of API testing

Demo video link

This submission report

For Task 5
Complete project code

README.md

database.sql

seed.js

Postman collection

Screenshots of API testing

Demo video link

This submission report



# Task 4: Built a REST API with in-memory storage
# Task 5: Upgraded to MySQL database persistence

Both projects demonstrate professional backend development skills and are ready for internship submission! 🚀


