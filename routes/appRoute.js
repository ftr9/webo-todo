const appController = require('../controller/appController');
const checkLogin = require('../middlewares/checkLoginMiddleware');
const appRoute = (query, app) => {
  app.get('/getAllTodos', checkLogin, appController.getAllTodos(query));
  app.post('/createTodo', checkLogin, appController.createTodo(query));
  app.put('/updateTodo', checkLogin, appController.updateTodo(query));
  app.delete(
    '/deleteTodo/:todoId',
    checkLogin,
    appController.deleteTodos(query)
  );
};

module.exports = appRoute;
