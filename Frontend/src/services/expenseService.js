import API from './api';

export const getAllExpenses = async () => {
  return await API.get('/expenses'); 
};

export const addExpense = async (expenseData) => {
  return await API.post('/expenses', expenseData);
};

export const deleteExpense = async (id) => {
  return await API.delete(`/expenses/${id}`);
};