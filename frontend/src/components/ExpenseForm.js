import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://finance-tracker-api.onrender.com/api";

const ExpenseForm = ({ onTransactionAdded }) => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTransaction = {
                category,
                amount: parseFloat(amount), // Приводим к числу
                date: new Date().toISOString(),
                currency: "EUR"
            };
    
            const response = await axios.post(`${API_URL}/transactions`, newTransaction);
            console.log("Транзакция добавлена:", response.data);
            
            onTransactionAdded(response.data); // Передаем API-ответ
            setAmount(""); // Очищаем форму
            setCategory("");
        } catch (error) {
            console.error("Ошибка при добавлении транзакции:", error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Сумма"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Выберите категорию</option>
                <option value="Food">Еда</option>
                <option value="Transport">Транспорт</option>
                <option value="Shopping">Покупки</option>
            </select>
            <button type="submit">Добавить</button>
        </form>
    );
};

export default ExpenseForm;