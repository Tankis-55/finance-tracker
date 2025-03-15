const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactionController');

// Получить все транзакции
router.get('/', getTransactions);

// Добавить новую транзакцию
router.post('/', addTransaction);

// Удалить транзакцию по ID
router.delete('/:id', deleteTransaction);

module.exports = router;
