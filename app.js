const express = require('express');
const app = express();
const mysql = require('mysql');
const { promisify } = require('util');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config({
  path: './config/secret.env',
});

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect(err => {
  if (err) {
    console.log('failed to connect to database...');
    console.log(err.message);
    return;
  }
  console.log('database connected successfully...');
});
const query = promisify(connection.query).bind(connection);

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Create,read and Delete routes
const appRoute = require('./routes/appRoute');
appRoute(query, app);
//authentication and authorization routes
const authRoute = require('./routes/authRoute');
authRoute(query, app);

//unhandeled routes 404 not found
app.all('*', (req, res, next) => {
  next(new Error('404 Not found..'));
});

//global error handeling middleware
app.use((err, req, res, next) => {
  if (err.code === 'ER_DUP_ENTRY') {
    err.message = err.sqlMessage;
    if (err.sqlMessage.includes('email')) {
      err.message = 'Email already exists..';
    }
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
    return;
  }

  res.status(400).json({
    status: 'failed',
    message: err.message,
  });
});

module.exports = app;
