const verifyJWT = require('../utils/verifyJWT');
module.exports = async function (req, res, next) {
  if (!req.cookies.jwt) {
    next(new Error('user not logged'));
    return;
  }

  const status = verifyJWT(req.cookies.jwt, req, res);
  if (status[0] && status[1]) {
    req.user = status[1];
    next();
  } else {
    next(new Error('user not logged'));
  }
};
