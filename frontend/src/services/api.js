import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchTransactions = async () => {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
};

export const addTransaction = async (transaction) => {
    const response = await axios.post(`${API_URL}/transactions`, transaction);
    return response.data;
};

export const deleteTransaction = async (id) => {
    await axios.delete(`${API_URL}/transactions/${id}`);
};