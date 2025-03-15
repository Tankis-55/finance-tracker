const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("🔍 MONGO_URI:", process.env.MONGO_URI || "NOT LOADED"); // Проверяем загрузку

if (!process.env.MONGO_URI) {
    console.error("❌ Ошибка: переменная окружения MONGO_URI не найдена!");
    process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json()); // Это ОЧЕНЬ ВАЖНО, чтобы API принимал JSON

// Подключение маршрутов
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
    res.send("✅ API работает!");
});

// Подключение к MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ Ошибка: переменная окружения MONGO_URI не найдена!");
    process.exit(1);
}

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// Запуск сервера
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Сервер запущен и слушает порт ${PORT}`);
});