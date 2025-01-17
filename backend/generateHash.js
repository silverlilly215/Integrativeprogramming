const bcrypt = require('bcrypt');

(async () => {
  const plainPassword = '123';
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  console.log('Hashed Password:', hashedPassword);
})();
