cat > README.md << 'EOF'
# 🚀 Full Stack User Management System

A production-ready full-stack user management application built with **React** frontend, **Node.js/Express** backend, and **MySQL** database. This project demonstrates professional full-stack development with complete CRUD operations, modern UI, and seamless API integration.

---

## 📋 Project Overview

This is **Task 6** of my internship journey, building upon:

- **Task 4**: REST API with Node.js + Express (in-memory storage)
- **Task 5**: MySQL database integration
- **Task 6**: React frontend connected to the existing backend

The application provides a complete user management system where administrators can:
- ✅ View all users in a beautiful dashboard
- ✅ Add new users with validation
- ✅ Edit existing user information
- ✅ Delete users with confirmation
- ✅ Search users by name or email
- ✅ View real-time statistics (total users, average age, newest user)

---

## 🏗️ Architecture
┌─────────────────────────────────────────────────────────────┐
│ React Frontend (Vite) │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │
│ │ Dashboard │ │ User Form │ │ User Table/Stats │ │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ │
│ │ │
│ Axios HTTP Client │
└────────────────────────┬────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ Node.js + Express Backend │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │
│ │ Routes │ │ Controllers │ │ Models │ │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ │
│ │ │
│ MySQL2 Driver │
└────────────────────────┬────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ MySQL Database │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ users (id, name, email, age, created_at, updated_at) ││
│ └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

text

---

## 📁 Folder Structure
full-stack-user-management/
│
├── backend/ # Task 5 Backend (Node.js + Express + MySQL)
│ ├── server.js # Main server file
│ ├── package.json # Backend dependencies
│ ├── .env # Environment variables
│ ├── config/
│ │ └── db.js # Database connection pool
│ ├── models/
│ │ └── userModel.js # Database operations
│ ├── controllers/
│ │ └── userController.js # Request handlers
│ ├── routes/
│ │ └── users.js # API routes
│ ├── middleware/
│ │ ├── validateUser.js # Input validation
│ │ ├── errorHandler.js # Global error handler
│ │ └── notFound.js # 404 handler
│ └── utils/
│ └── response.js # Response formatter
│
└── frontend/ # Task 6 Frontend (React + Vite + Tailwind)
├── index.html # HTML entry point
├── package.json # Frontend dependencies
├── vite.config.js # Vite configuration
├── tailwind.config.js # Tailwind CSS config
├── postcss.config.js # PostCSS config
├── .env # Environment variables
├── src/
│ ├── main.jsx # React entry point
│ ├── App.jsx # Main App component
│ ├── index.css # Global styles
│ ├── pages/
│ │ └── Home.jsx # Dashboard page
│ ├── components/
│ │ ├── Navbar.jsx # Navigation bar
│ │ ├── Stats.jsx # Statistics cards
│ │ ├── SearchBar.jsx # Search functionality
│ │ ├── UserTable.jsx # Users data table
│ │ ├── UserForm.jsx # Add/Edit user form
│ │ ├── DeleteModal.jsx # Delete confirmation modal
│ │ ├── Footer.jsx # Footer component
│ │ └── UserCard.jsx # User card (bonus)
│ ├── services/
│ │ └── api.js # API service layer
│ └── hooks/
│ └── useUsers.js # Custom hook for user management
│
└── public/ # Static assets
└── vite.svg # Vite logo

text

---

## 🛠️ Technologies Used

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| Vite | 5.0.8 | Build Tool |
| Tailwind CSS | 3.3.6 | Styling |
| Axios | 1.6.2 | HTTP Client |
| React Router DOM | 6.20.0 | Routing |
| React Icons | 4.12.0 | Icons |
| React Hot Toast | 2.4.1 | Notifications |
| Framer Motion | 10.16.16 | Animations |
| Date-fns | 2.30.0 | Date formatting |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.x | Runtime |
| Express | 4.18.2 | Web Framework |
| MySQL | 8.0 | Database |
| mysql2 | 3.6.0 | MySQL Driver |
| Express Validator | 7.0.1 | Input Validation |
| Helmet | 7.1.0 | Security Headers |
| CORS | 2.8.5 | Cross-Origin Support |
| Morgan | 1.10.0 | Request Logging |
| Dotenv | 16.3.1 | Environment Config |
| Nodemon | 3.0.2 | Development Auto-reload |

---

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/full-stack-user-management.git
cd full-stack-user-management
Step 2: Setup Backend
bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MySQL credentials
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=user_management

# Setup database
mysql -u root -p < database.sql

# Seed sample data (optional)
npm run seed

# Start backend
npm run dev
Step 3: Setup Frontend
bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api/v1" > .env

# Start frontend
npm run dev
🎯 Running the Application
Development Mode
Terminal 1 - Backend:

bash
cd backend
npm run dev
Server runs on: http://localhost:5000

Terminal 2 - Frontend:

bash
cd frontend
npm run dev
Server runs on: http://localhost:5173

Production Build
bash
# Build frontend
cd frontend
npm run build

# Preview production build
npm run preview
🔗 API Endpoints
Method	Endpoint	Description	Request Body
GET	/api/health	Health check	-
GET	/api/database-status	Database connection status	-
GET	/api/v1/users	Get all users	-
GET	/api/v1/users/:id	Get user by ID	-
POST	/api/v1/users	Create a new user	{ name, email, age }
PUT	/api/v1/users/:id	Update a user	{ name, email, age }
DELETE	/api/v1/users/:id	Delete a user	-
Sample API Response
Success:

json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 11,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "createdAt": "2026-07-27T10:30:00.000Z"
  },
  "timestamp": "2026-07-27T10:30:00.000Z"
}
Error:

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
  "timestamp": "2026-07-27T10:30:00.000Z"
}
🎨 Features
✅ Backend Features
Complete CRUD operations

MySQL database with connection pooling

Parameterized queries (SQL injection prevention)

Input validation with express-validator

Comprehensive error handling

Health check endpoint

Database status endpoint

Seed script for sample data

Security middleware (Helmet, CORS)

Request logging (Morgan)

✅ Frontend Features
Modern dashboard with statistics

Add user form with real-time validation

Edit user functionality

Delete user with confirmation modal

Search users by name or email

Responsive design (mobile, tablet, desktop)

Glassmorphism UI design

Smooth animations

Toast notifications

Loading states

Error handling

✅ Bonus Features
Dark theme

Statistics cards (Total Users, Average Age, Newest User)

User avatars with initials

Professional table with hover effects

Date formatting

API connection status

📊 Database Schema
sql
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
🧪 Testing
Test Backend API
bash
# Health check
curl http://localhost:5000/api/health

# Get all users
curl http://localhost:5000/api/v1/users

# Create a user
curl -X POST http://localhost:5000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","age":25}'
Test Frontend
Open http://localhost:5173 in your browser

Verify users are displayed

Click "Add User" and create a new user

Click "Delete" on any user

Use the search bar to filter users

📸 Screenshots
Dashboard
https://screenshots/dashboard.png

Add User Form
https://screenshots/add-user.png

User Table
https://screenshots/user-table.png

Delete Confirmation
https://screenshots/delete-modal.png

🔧 Environment Variables
Backend .env
env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=user_management

# Connection Pool
DB_CONNECTION_LIMIT=10
DB_QUEUE_LIMIT=0
Frontend .env
env
VITE_API_URL=http://localhost:5000/api/v1
🐛 Troubleshooting
Common Issues
1. "Access denied for user 'root'@'localhost'"

bash
# Reset MySQL root password
mysql.server stop
mysqld_safe --skip-grant-tables &
mysql -u root -e "FLUSH PRIVILEGES; ALTER USER 'root'@'localhost' IDENTIFIED BY ''; FLUSH PRIVILEGES;"
mysql.server start
2. "Cannot find module 'mysql2'"

bash
cd backend
npm install mysql2
3. "Failed to fetch users"

bash
# Make sure backend is running
curl http://localhost:5000/api/health
4. Port already in use

bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
📈 Future Improvements
□ Pagination for large datasets
□ Sorting columns
□ Export users to CSV
□ Import users from CSV
□ JWT Authentication
□ User roles (Admin, User)
□ Activity logging
□ Profile pictures
□ Email notifications
□ Unit tests
□ Docker containerization
□ CI/CD pipeline
□ Swagger/OpenAPI documentation
□ Redis caching
□ GraphQL API
👨‍💻 Author
Aakash Yadav

GitHub: @aakashyadav

LinkedIn: Aakash Yadav

📄 License
This project is licensed under the ISC License.

🙏 Acknowledgments
Internship mentors for guidance

Node.js and React communities

Tailwind CSS for beautiful styling

Vite for fast development

📞 Support
For support, email: support@userhub.com

🎯 Project Status
✅ Completed: Task 4, Task 5, Task 6

Task 4: REST API with Node.js + Express
Task 5: MySQL Database Integration
Task 6: React Frontend with Full CRUD

📝 Changelog
v2.0.0 (July 27, 2026)
✅ Added React frontend

✅ Integrated with existing API

✅ Full CRUD operations

✅ Modern UI with Tailwind CSS

✅ Dashboard with statistics

✅ Search functionality

v1.1.0 (July 21, 2026)
✅ MySQL database integration

✅ Connection pooling

✅ Parameterized queries

✅ Seed script

v1.0.0 (July 20, 2026)
✅ REST API with in-memory storage

✅ CRUD operations

✅ Input validation

✅ Error handling

⭐ Star this repository if you found it helpful!
EOF

text

---

## 📋 Create a Simple README.md (if you prefer shorter version)

```bash
cat > README_SHORT.md << 'EOF'
# Full Stack User Management System

A full-stack user management application with React frontend, Node.js/Express backend, and MySQL database.

## Quick Start

```bash
# Clone repository
git clone <repo-url>
cd full-stack-user-management

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
Features
✅ View, Add, Edit, Delete Users

✅ Search Users

✅ Statistics Dashboard

✅ Responsive Design

✅ Dark Theme

Tech Stack
Frontend: React, Vite, Tailwind CSS

Backend: Node.js, Express, MySQL

Database: MySQL

API Endpoints
GET /api/v1/users - Get all users

POST /api/v1/users - Create user

PUT /api/v1/users/:id - Update user

DELETE /api/v1/users/:id - Delete user

Author
Aakash Yadav
EOF

text

---

## ✅ README Checklist

- [x] Project overview
- [x] Architecture diagram
- [x] Folder structure
- [x] Technologies used
- [x] Installation guide
- [x] Running instructions
- [x] API documentation
- [x] Features list
- [x] Database schema
- [x] Testing guide
- [x] Screenshots placeholder
- [x] Environment variables
- [x] Troubleshooting
- [x] Future improvements
- [x] Author info
- [x] License
- [x] Changelog

---

## 📸 Create Screenshots Directory

```bash
mkdir -p screenshots

# Add placeholder for screenshots
