import axios from 'axios';

const API_URL = "http://localhost:5000/api/transactions"; 

export const getTransactions = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const addTransaction = async (data) => {
    try {
        const response = await axios.post(API_URL, data); 
        return response.data;
    } catch (error) {
        throw new Error("Error adding transaction");
    }
};

export const updateTransaction = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data); 
        return response.data;
    } catch (error) {
        throw new Error("Error updating transaction");
    }
};

export const deleteTransaction = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const getMonthlyExpenses = async () => {
    const res = await axios.get(`${API_URL}/monthly-expenses`);
    return res.data;
};
