const connectDB = require('../config/db');
const mongoose = require('mongoose');
const seedUsers = require('./users');
const seedMembers = require('./members');

async function main() {
  await connectDB();
  console.log('🌱 Seeding...');

  await seedUsers();
  await seedMembers();

  await mongoose.connection.close();
  console.log('✅ Done!');
}

main().catch(console.error);
