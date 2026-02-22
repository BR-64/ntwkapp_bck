// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Check collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const names = collections.map((c) => c.name);
    console.log('📦 Collections:', names);
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
