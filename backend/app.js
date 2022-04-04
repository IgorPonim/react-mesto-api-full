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
const { routes } = require('./routes/routes');
//  парсер
app.use(express.json());

const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { signUp, signIn } = require('./middlewares/joiValidation');
const mainErrorHadler = require('./middlewares/mainErrorHandler');

// логгер
const {requestLogger, errorLogger } = require('./middlewares/logger')
app.use(requestLogger)

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

require('dotenv').config()
// cors



app.post('/signup', signUp, createUser);
app.post('/signin', signIn, login);
app.use(cookieParser());
app.use(auth);

app.use(errorLogger)

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
const cors = require('cors');
app.use(cors)