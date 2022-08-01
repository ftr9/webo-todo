const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/getAllTodos', {
      target: 'http://localhost:4050',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/login', {
      target: 'http://localhost:4050',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/register', {
      target: 'http://localhost:4050',
      headers: {
        Connection: 'keep-alive',
      },
    })
  );

  app.use(
    createProxyMiddleware('/logout', {
      target: 'http://localhost:4050',
      headers: {
        Connection: 'keep-alive',
      },
    })
  );

  app.use(
    createProxyMiddleware('/checkloginstatus', {
      target: 'http://localhost:4050',
      headers: {
        Connection: 'keep-alive',
      },
    })
  );

  app.use(
    createProxyMiddleware('/createTodo', {
      target: 'http://localhost:4050',
      headers: {
        Connection: 'keep-alive',
      },
    })
  );

  app.use(
    createProxyMiddleware('/getAllTodos', {
      target: 'http://localhost:4050',
      headers: {
        Connection: 'keep-alive',
      },
    })
  );

  app.use(
    createProxyMiddleware('/deleteTodo/*', {
      target: 'http://localhost:4050',
      headers: {
        Connection: 'keep-alive',
      },
    })
  );

  app.use(
    createProxyMiddleware('/updateTodo', {
      target: 'http://localhost:4050',
      headers: {
        Connection: 'keep-alive',
      },
    })
  );
};
