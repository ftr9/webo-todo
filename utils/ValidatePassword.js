const bcrypt = require('bcryptjs');
const validatePassword = async (formpassword, dbpassword) => {
  let isSame = await bcrypt.compare(formpassword, dbpassword);

  if (isSame) {
    return true;
  }
  return false;
};

module.exports = validatePassword;
