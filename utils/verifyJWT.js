const jwt = require('jsonwebtoken');

const verifyjwt = token => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return [true, decoded];
  } catch (err) {
    return [false, null];
  }
};

module.exports = verifyjwt;
