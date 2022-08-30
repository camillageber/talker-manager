const express = require('express');
const generateToken = require('../utils/generateToken');
const { emailValidation, passwordValidation } = require('../middlewares/loginValidation');

const route = express.Router();

route.post('/', emailValidation, passwordValidation, (req, res) => {
  const token = generateToken();
  console.log('/login');

  res.status(200).json({ token });
});

module.exports = route; 