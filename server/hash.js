const hashPassword = async () => {
  const bcrypt = require('bcryptjs');
  const saltRounds = 10;

  // Hash a password for a test user
  const testPassword = 'lastson';
  const hashedTestPassword = await bcrypt.hash(testPassword, saltRounds);

  // Store the hashed password in your test database for the test user
  const testUser = {
    email: 'testuser@example.com',
    password: hashedTestPassword
  };

  console.log(testUser.password);
};

hashPassword();
