const { faker } = require('@faker-js/faker');
const User = require('../src/models/User');

module.exports = async () => {
  await User.deleteMany({});

  const users = Array.from({ length: 50 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 80 }),
    password: fake.password(
      (length = 8),
      (special_chars = True),
      (digits = True),
      (upper_case = True),
      (lower_case = True)
    ),
  }));

  await User.insertMany(users);
  console.log('✅ Users seeded');
};
