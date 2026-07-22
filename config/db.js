const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

class Database {
    constructor() {
        this.pool = null;
    }

    async getPool() {
        if (!this.pool) {
            try {
                this.pool = mysql.createPool({
                    host: process.env.DB_HOST || 'localhost',
                    port: parseInt(process.env.DB_PORT) || 3306,
                    user: process.env.DB_USER || 'root',
                    password: process.env.DB_PASSWORD || '',  // Default to empty
                    database: process.env.DB_NAME || 'user_management',
                    waitForConnections: true,
                    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
                    queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 0,
                    enableKeepAlive: true,
                    keepAliveInitialDelay: 0
                });

                const connection = await this.pool.getConnection();
                console.log('✅ Database connected successfully');
                connection.release();
                return this.pool;
            } catch (error) {
                console.error('❌ Database connection failed:', error.message);
                throw new Error('Database connection failed');
            }
        }
        return this.pool;
    }

    async query(sql, params = []) {
        try {
            const pool = await this.getPool();
            const [rows] = await pool.execute(sql, params);
            return rows;
        } catch (error) {
            console.error('Query error:', error.message);
            throw error;
        }
    }

    async getConnection() {
        const pool = await this.getPool();
        return pool.getConnection();
    }

    async closePool() {
        if (this.pool) {
            await this.pool.end();
            this.pool = null;
            console.log('Database connection pool closed');
        }
    }

    async testConnection() {
        try {
            const pool = await this.getPool();
            const connection = await pool.getConnection();
            connection.release();
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = new Database();