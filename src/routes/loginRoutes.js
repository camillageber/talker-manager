const express = require('express');
const generateToken = require('../utils/generateToken');
const { emailValidation, passwordValidation } = require('../middlewares/loginValidation');

const route = express.Router();

// rota de login, POST /login, para entrar com usuário e senha e trazer um token aleatório - req 3 e 4
route.post('/', emailValidation, passwordValidation, (req, res) => {
  const token = generateToken();
  console.log('/login');

  res.status(200).json({ token });
});

module.exports = route; 