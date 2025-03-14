require('dotenv').config();
const mongoose = require('mongoose');

console.log("MONGO_URI:", process.env.MONGO_URI || "NOT LOADED"); // Проверяем, загружается ли переменная

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.warn("⚠️  WARNING: MONGO_URI is not defined, using default local MongoDB");
}

mongoose.connect(mongoURI || 'mongodb://127.0.0.1:27017/finance-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));