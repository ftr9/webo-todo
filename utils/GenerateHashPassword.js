const bcrypt = require('bcryptjs');

const generateHashPassword = async str => {
  const generatedHash = await bcrypt.hash(str, 10);
  return generatedHash;
};

module.exports = generateHashPassword;
