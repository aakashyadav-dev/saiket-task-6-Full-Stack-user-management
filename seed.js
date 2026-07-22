const db = require('./config/db');
const UserModel = require('./models/userModel');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Seed script to populate database with sample users
 */
const sampleUsers = [
    { name: 'John Doe', email: 'john.doe@example.com', age: 28 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', age: 34 },
    { name: 'Michael Johnson', email: 'michael.j@example.com', age: 42 },
    { name: 'Sarah Williams', email: 'sarah.w@example.com', age: 25 },
    { name: 'Robert Brown', email: 'robert.b@example.com', age: 31 },
    { name: 'Emily Davis', email: 'emily.d@example.com', age: 29 },
    { name: 'David Wilson', email: 'david.w@example.com', age: 37 },
    { name: 'Lisa Anderson', email: 'lisa.a@example.com', age: 26 },
    { name: 'James Taylor', email: 'james.t@example.com', age: 45 },
    { name: 'Maria Garcia', email: 'maria.g@example.com', age: 33 }
];

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');
        
        // Check if users already exist
        const count = await UserModel.count();
        if (count > 0) {
            console.log(`📊 Database already has ${count} users. Skipping seed.`);
            console.log('💡 To re-seed, truncate the users table first.');
            process.exit(0);
        }

        // Insert sample users
        let insertedCount = 0;
        for (const user of sampleUsers) {
            try {
                await UserModel.create(user);
                insertedCount++;
                console.log(`✅ Inserted: ${user.name} (${user.email})`);
            } catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    console.log(`⚠️  Skipped duplicate: ${user.email}`);
                } else {
                    console.error(`❌ Failed to insert ${user.name}:`, error.message);
                }
            }
        }

        console.log(`✅ Seeding completed! ${insertedCount} users inserted.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

// Execute seeding
seedDatabase();