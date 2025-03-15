const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// ✅ Получить все транзакции
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
});

// ✅ Добавить новую транзакцию
router.post("/", async (req, res) => {
    try {
        const { category, amount, date } = req.body;
        const newTransaction = new Transaction({ category, amount, date });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при добавлении", error });
    }
});

module.exports = router;