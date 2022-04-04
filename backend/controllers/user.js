const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/usermodel');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

// огласите весь список пожалуйста
exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      next(err);
    });
};

// можно посмотреть инфу о пользователе отправив /id
exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.status(200).send(user); // один раз код написал и копировал, забывая return-ы
      }
      return next(new NotFoundError('Пользователь не найден'));
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Неверный тип данных.'));
      }
      return next(err);
    });
};

// обновить инфу
exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный тип данных.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверный тип данных.'));
      } else {
        next(err);
      }
    });
};

// обновить аватар
exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверная ссылка'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Неверный id'));
      } else {
        next(err);
      }
    });
};

// создаем юзера проверяем есть ли уже в базе
exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Неправильный логин или пароль.');
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(` Пользователь с ${email} уже зарегистрирован.`);
      }
      return bcrypt.hash(req.body.password, 10); // шифруем ответ
    })

    .then((hash) => User.create({
      email: req.body.email,
      name: req.body.name,
      avatar: req.body.avatar,
      about: req.body.about,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные о пользователе или неверная ссылка на аватар.'));
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new BadRequestError('Неверный email или пароль.'));
      }
      // расшифровываем введенный пароль
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new BadRequestError('Неверный email или пароль.'));
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    if (!user) {
      return next(new NotFoundError('Пользователь не найден.'));
    }

    return res.status(200).send(user);
  })
    .catch((err) => {
      next(err);
    });
};
