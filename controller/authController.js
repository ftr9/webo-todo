const validator = require('validator');
const generateHashPassword = require('../utils/GenerateHashPassword');
const validatePassword = require('../utils/ValidatePassword');
const generateJWT = require('../utils/generateJWT');
const appRoute = require('../routes/appRoute');

const validateFields = async (name, email, password) => {
  if (!(name && email && password)) {
    throw new Error('please fill out all the fields');
  }

  if (!validator.default.isEmail(email)) {
    throw new Error('invalid email');
  }
  if (!(password.length > 5)) {
    throw new Error('password length must be greater than 5');
  }
};

exports.registerController = query => {
  return async (req, res, next) => {
    try {
      let body = req.body;
      body.name = validator.default.trim(body.name);
      body.email = validator.default.trim(body.email);
      //validation
      await validateFields(body.name, body.email, body.password);
      body.password = await generateHashPassword(body.password);
      //store to database....
      await query(
        `INSERT INTO users(username,email,password) values("${body.name}","${body.email}","${body.password}")`
      );

      res.status(201).json({
        status: 'success',
        message: 'payload was valid',
      });
    } catch (err) {
      next(err);
    }
  };
};

exports.loginController = query => {
  return async (req, res, next) => {
    try {
      const body = req.body;
      if (!(body.email && body.password)) {
        res.end();
        return;
      }
      //query for email
      const user = await query(
        `SELECT * from users where email="${body.email}"`
      );
      if (user.length === 0) {
        throw new Error('Email does not exists.');
      }

      //check for corrrect password
      let { password, userid, email, username } = user[0];
      const isSame = await validatePassword(body.password, password);
      if (!isSame) {
        throw new Error('Incorrect password...');
      }

      //generate jwt and send cookies
      const jwt = generateJWT({ email, userid, username });
      res.cookie('jwt', jwt, {
        maxAge: 1000 * 60 * 60 * 12,
      });
      res.status(200).send({
        userid: user[0].userid,
        email: user[0].email,
        username: user[0].username,
      });
    } catch (err) {
      next(err);
    }
  };
};

exports.logoutController = query => {
  return (req, res, next) => {
    res.cookie('jwt', '', {
      maxAge: 1,
    });
    res.status(200).json({
      status: 'successful',
      message: 'Logged out',
    });
  };
};

exports.checkloginStatusController = query => {
  return (req, res, next) => {
    res.status(200).send(req.user);
  };
};
