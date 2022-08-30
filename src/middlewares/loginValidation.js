const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
// regex utilizado na dinâmica do dia 22.5 pelo prof Rafa

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  console.log('email');
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.match(emailRegex)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  return next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  console.log('senha');
  if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return next();
};

module.exports = {
  emailValidation,
  passwordValidation,
};
