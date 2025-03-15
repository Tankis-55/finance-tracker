const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

console.log("🔍 MONGO_URI:", process.env.MONGO_URI || "NOT LOADED");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

const app = express();
app.use(express.json());

const transactionRoutes = require('./routes/transactionRoutes'); // Подключаем маршруты
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('✅ API is running!');
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));