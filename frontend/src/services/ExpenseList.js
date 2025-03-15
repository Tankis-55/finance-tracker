import React, { useEffect, useState } from "react";
import { fetchTransactions, deleteTransaction } from "./api";

const ExpenseList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions().then(setTransactions);
    }, []);

    const handleDelete = async (id) => {
        await deleteTransaction(id);
        setTransactions(transactions.filter((t) => t._id !== id));
    };

    return (
        <ul>
            {transactions.map((t) => (
                <li key={t._id}>
                    {t.category}: ${t.amount}
                    <button onClick={() => handleDelete(t._id)}>Удалить</button>
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;