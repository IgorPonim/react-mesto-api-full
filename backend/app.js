require('dotenv').config();
const express = require('express');
//  раздаем статику
const path = require('path');

const PUBLIC_FOLDER = path.join(__dirname, 'public');
const app = express();
app.use(express.static(PUBLIC_FOLDER));
const port = 3000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { routes } = require('./routes/routes');
//  парсер
app.use(express.json());

const { login, createUser, logout } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { signUp, signIn } = require('./middlewares/joiValidation');
const mainErrorHadler = require('./middlewares/mainErrorHandler');

// логгер
const { requestLogger, errorLogger } = require('./middlewares/logger');

// настройки корс можно зайти с лююбого домена
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', signUp, createUser);
app.post('/signin', signIn, login);
app.get('/logout', logout);
app.use(cookieParser());
app.use(auth);

app.use(errorLogger);

//  мидлВара чтобы смотреть в терминале
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

async function main() {
  console.log('trying to connect');
  await mongoose.connect(
    'mongodb://localhost:27017/mestodb',
    {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    },
  );

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
app.use(routes);
// ошибки celebrate
app.use(errors());

app.use(mainErrorHadler);
