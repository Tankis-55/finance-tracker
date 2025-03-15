import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "../components/ExpenseForm";
import { fetchTransactions, addTransaction, deleteTransaction } from "../services/api";

const API_URL = "https://finance-tracker-api.onrender.com/api";

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [filterCategory, setFilterCategory] = useState(""); 
    const [sortType, setSortType] = useState("amount"); 
    const [category, setCategory] = useState(""); 

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`${API_URL}/transactions`);
            console.log("Загруженные транзакции:", response.data);
            setTransactions(response.data);
        } catch (error) {
            console.error("Ошибка загрузки транзакций:", error);
        }
    };

    const handleAddTransaction = (transaction) => {
        console.log("Добавление новой транзакции в состояние:", transaction);
        setTransactions((prev) => [...prev, transaction]); // Обновляем список
    };

    
    useEffect(() => {
        console.log("Обновление списка транзакций...");
        fetchTransactions().then(setTransactions);
    }, [refresh]); // Зависимость от `refresh`

    const filteredTransactions = transactions.filter((tx) =>
        filterCategory ? tx.category === filterCategory : true
    );

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortType === "amount") {
            return b.amount - a.amount;
        } else if (sortType === "date") {
            return new Date(b.date) - new Date(a.date);
        }
        return 0;
    });

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <ExpenseForm onTransactionAdded={handleAddTransaction} />

            <div className="filter-sort">
                <select onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="">Все категории</option>
                    <option value="Food">Еда</option>
                    <option value="Transport">Транспорт</option>
                    <option value="Shopping">Покупки</option>
                </select>

                <select onChange={(e) => setSortType(e.target.value)}>
                    <option value="amount">По сумме</option>
                    <option value="date">По дате</option>
                </select>
            </div>

            <h2>Список транзакций</h2>
            <ul>
                {sortedTransactions.map((t, index) => (
                    <li key={index}>{t.category}: {t.amount} {t.currency}</li>
                ))}
            </ul>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Транспорт">Транспорт</option>
                <option value="Покупки">Покупки</option>
            </select>
        </div>
    );
};

export default Dashboard;