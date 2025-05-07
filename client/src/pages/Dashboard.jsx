import React, { useState, useEffect } from 'react';
import ExpenseChart from '@/components/ExpenseChart';
import { getMonthlyExpenses, addTransaction, deleteTransaction } from '@/api/transactionAPI'; 

const Dashboard = () => {
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
    // Fetch monthly expenses data on mount
    fetchMonthlyExpenses();
  }, []);

  const fetchMonthlyExpenses = async () => {
    try {
      const data = await getMonthlyExpenses(); 
      const formattedData = data.map(expense => ({
        month: expense.month,    
        amount: expense.totalAmount,  
      }));
      setExpensesData(formattedData); 
    } catch (error) {
      console.error('Error fetching monthly expenses:', error);
    }
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      await addTransaction(newTransaction);
      fetchMonthlyExpenses(); 
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id); 
      fetchMonthlyExpenses(); 
      console.log("Transaction deleted");
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p>Display charts, statistics, and summaries here.</p>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Monthly Expenses</h3>
        <ExpenseChart data={expensesData} />
      </div>

      <button onClick={() => handleAddTransaction({ title: 'Food', amount: 100, date: new Date() })}>Add Transaction</button>

      <button onClick={() => handleDeleteTransaction('transaction-id')}>Delete Transaction</button>
    </div>
  );
};

export default Dashboard;
