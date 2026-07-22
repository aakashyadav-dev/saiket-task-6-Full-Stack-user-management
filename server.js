const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/users');

// Import middleware
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// Import database
const db = require('./config/db');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Request logging

// API Routes
app.use('/api/v1/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'OK',
        server: 'Running',
        timestamp: new Date().toISOString()
    });
});

// Database status endpoint
app.get('/api/database-status', async (req, res) => {
    try {
        const isConnected = await db.testConnection();
        res.status(200).json({
            success: true,
            database: isConnected ? 'Connected' : 'Disconnected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            database: 'Disconnected',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Welcome route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to User Management REST API with MySQL',
        version: 'v2.0',
        endpoints: {
            health: 'GET /api/health',
            databaseStatus: 'GET /api/database-status',
            users: 'GET /api/v1/users',
            user: 'GET /api/v1/users/:id',
            createUser: 'POST /api/v1/users',
            updateUser: 'PUT /api/v1/users/:id',
            deleteUser: 'DELETE /api/v1/users/:id'
        }
    });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
    try {
        // Test database connection
        const isConnected = await db.testConnection();
        if (!isConnected) {
            console.error('❌ Failed to connect to database. Server will not start.');
            process.exit(1);
        }

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
            console.log(`🗄️  Database: Connected to ${process.env.DB_NAME}`);
        });
    } catch (error) {
        console.error('❌ Server startup failed:', error.message);
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await db.closePool();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await db.closePool();
    process.exit(0);
});

startServer();