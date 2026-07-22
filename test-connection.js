const dotenv = require('dotenv');
dotenv.config();

console.log('🔍 Environment variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD === '' ? '(empty)' : process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const db = require('./config/db');

async function test() {
    try {
        console.log('\n🔌 Testing database connection...');
        const isConnected = await db.testConnection();
        
        if (isConnected) {
            console.log('✅ Database connected successfully!');
            
            const result = await db.query('SELECT 1 as test');
            console.log('✅ Query test successful!');
            
            // Show users
            const users = await db.query('SELECT COUNT(*) as total FROM users');
            console.log('📊 Total users:', users[0].total);
            
        } else {
            console.log('❌ Database connection failed!');
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await db.closePool();
    }
}

test();