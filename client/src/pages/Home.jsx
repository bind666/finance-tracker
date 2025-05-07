import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "@/components/ExpenseChart";
import axios from "axios";

const Home = () => {
  const [chartData, setChartData] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transactions/monthly-expenses")
      .then((res) => setChartData(res.data))
      .catch(() => alert("Failed to fetch chart data"));
  }, []);

  const handleEdit = (transaction) => {
    setTransactionToEdit(transaction);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Personal Finance Tracker</h1>
      <TransactionList onEdit={handleEdit} />
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
        <ExpenseChart data={chartData} />
      </div>
    </div>
  );
};

export default Home;
