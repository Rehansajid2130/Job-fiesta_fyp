const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/jobfiesta';
    const conn = await mongoose.connect(mongoUri);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);

    // Auto-seed if database is empty in development mode
    if (process.env.NODE_ENV !== 'production') {
      const User = require('../models/User');
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('[Database] Empty database detected. Auto-seeding demo data...');
        const seedHelper = require('../seedHelper');
        await seedHelper();
      }
    }
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    // Don't crash immediately in development so the API server can still respond to health checks
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
