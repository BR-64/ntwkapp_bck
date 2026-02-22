const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Person = require('../models/Person');

const TAG_POOL = [
  'Technology',
  'Sustainability',
  'Education',
  'Healthcare',
  'Finance',
  'AgriTech',
  'IoT',
  'Community',
  'Environment',
  'Urban Planning',
  'E-commerce',
  'Marine Biology',
  'Telecom',
  'Energy',
  'Policy',
  'Mobile Dev',
  'Data Analysis',
  'Infrastructure',
  'Conservation',
  'Culture',
];

const LOCATIONS = [
  'Thailand',
  'Vietnam',
  'Philippines',
  'Indonesia',
  'Singapore',
  'Malaysia',
  'Myanmar',
  'Cambodia',
  'Laos',
  'Japan',
  'South Korea',
];

function randomTags(min = 1, max = 3) {
  const shuffled = [...TAG_POOL].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return shuffled.slice(0, count).map((label) => ({ label }));
}

function generatePerson() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    name: `${firstName} ${lastName}`,
    name_th: `${faker.helpers.arrayElement([
      'สมชาย',
      'มาลี',
      'วิชัย',
      'นภา',
      'สุดา',
      'อนันต์',
      'กิตติ',
      'ลดา',
    ])} ${faker.helpers.arrayElement([
      'รักดี',
      'ใจดี',
      'สุขใจ',
      'มีสุข',
      'เจริญ',
      'พัฒนา',
      'สว่าง',
    ])}`,
    project: faker.company.catchPhrase(),
    location: faker.helpers.arrayElement(LOCATIONS),
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    tags: randomTags(1, 3),
  };
}

async function seed(count = 20) {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'test3' });
  console.log(
    `✅ Connected to MongoDB — database: "${mongoose.connection.db.databaseName}"`
  );

  await Person.deleteMany({});
  console.log('🗑️  Cleared existing people');

  const people = Array.from({ length: count }, generatePerson);
  await Person.insertMany(people);
  console.log(`🌱 Seeded ${count} people`);

  await mongoose.disconnect();
  console.log('👋 Done');
}

seed(20).catch((err) => {
  console.error(err);
  process.exit(1);
});
