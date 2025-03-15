const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    category: String,
    amount: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
