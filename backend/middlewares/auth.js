//  все взял с тренажера ;

const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/UnathorizedError');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new UnathorizedError('Необходима авторизация.');
  }
  req.user = payload;

  next();
};
