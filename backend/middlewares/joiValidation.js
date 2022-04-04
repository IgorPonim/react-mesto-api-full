const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');
// короче нарыл че-то в интернетах, вроде фурычит
const urlChecking = Joi.string().custom((prot) => {
  if (!validator.isURL(prot, {
    // require_tld: true,
    require_protocol: true,
    // require_host: true,
    // require_port: false,
    // require_valid_protocol: true,
    // allow_underscores: false,
    // host_whitelist: false,
    // host_blacklist: false,
    // allow_trailing_dot: false,
    // allow_protocol_relative_urls: false,
    // allow_fragments: true,
    // allow_query_components: true,
    // disallow_auth: false,
    // validate_length: true,
    // protocols: ['http', 'https', 'ftp'],
  })) {
    throw new BadRequestError('Неправедный формат URL адреса');
  }
  return prot;
});

const signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(10000),
  }),
});

const signUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(10000),
    avatar: urlChecking,
  }),
});

const avatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: urlChecking,
  }),
});

const createCardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: urlChecking,
  }),
});

const cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(), //  пример валидации в интернете для mognoD
  }),
});

const userIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const userUpdateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  signUp,
  signIn,
  avatarValidate,
  createCardValidate,
  cardIdValidate,
  userIdValidate,
  userUpdateValidate,
};
