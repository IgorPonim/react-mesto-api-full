const express = require('express');
const { cardRoutes } = require('./cards');

const { userRoutes } = require('./users');

const routes = express.Router();

routes.use('/users', userRoutes);

routes.use('/cards', cardRoutes);

routes.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
});

exports.routes = routes;
