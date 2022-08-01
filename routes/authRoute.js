const authController = require('../controller/authController');
const checkLogin = require('../middlewares/checkLoginMiddleware');
const authRoute = (query, app) => {
  app.post('/register', authController.registerController(query));
  app.post('/login', authController.loginController(query));
  app.post('/logout', authController.logoutController(query));
  app.get(
    '/checkloginstatus',
    checkLogin,
    authController.checkloginStatusController(query)
  );
};

module.exports = authRoute;
