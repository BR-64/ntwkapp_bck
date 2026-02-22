const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const User = require('../models/User');

async function generateUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const hashedPassword = await bcrypt.hash('Password123', 12);
  return {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    password: hashedPassword,
    role: faker.helpers.arrayElement(['user', 'user', 'user', 'admin']), // 25% admin
  };
}

async function seed(count = 4) {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'test3' });
  console.log(
    `✅ Connected to MongoDB — database: "${mongoose.connection.db.databaseName}"`
  );

  await User.deleteMany({});
  console.log('🗑️  Cleared existing users');

  const users = await Promise.all(Array.from({ length: count }, generateUser));
  await User.insertMany(users);
  console.log(`🌱 Seeded ${count} users`);
  console.log('🔑 All users have password: Password123');

  await mongoose.disconnect();
  console.log('👋 Done');
}

seed(10).catch((err) => {
  console.error(err);
  process.exit(1);
});
