import axios from "axios";

const API_URL = "https://finance-tracker-api.onrender.com/api";

export const fetchTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}/transactions`);
        return response.data; 
    } catch (error) {
        console.error("Ошибка загрузки транзакций:", error);
        return [];
    }
};

export const addTransaction = async (transaction) => {
    try {
        console.log("Отправка транзакции:", transaction); // Логируем отправляемые данные
        const response = await axios.post(`${API_URL}/transactions`, transaction);
        console.log("Ответ API:", response.data); // Логируем ответ API
        return response.data;
    } catch (error) {
        console.error("Ошибка добавления транзакции:", error);
        throw error;
    }
};
