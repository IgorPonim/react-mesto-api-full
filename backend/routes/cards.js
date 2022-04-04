const express = require('express');

const {
  getCards,
  addLike,
  dislikeCard,
  deleteCardById,
  createCard,
} = require('../controllers/cards');
const { createCardValidate, cardIdValidate } = require('../middlewares/joiValidation');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);

cardRoutes.delete('/:cardId', cardIdValidate, deleteCardById);

cardRoutes.post('/', createCardValidate, createCard);

cardRoutes.put('/:cardId/likes', cardIdValidate, addLike);

cardRoutes.delete('/:cardId/likes', cardIdValidate, dislikeCard);

exports.cardRoutes = cardRoutes;
