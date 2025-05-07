import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "@/services/api";
import { Button } from "@/components/ui/button";
import TransactionForm from "./TransactionForm";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(null);

  const fetchData = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    fetchData();
  };

  const handleEdit = (tx) => {
    setEditTx(tx); // Set editTx to the selected transaction to trigger edit mode
  };

  const handleUpdate = () => {
    setEditTx(null); 
    fetchData(); 
  };

  const handleAdd = (newTx) => {
    setTransactions((prevTransactions) => [newTx, ...prevTransactions]); // Add new transaction to the top
  };

  return (
    <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Transactions
      </h2>

      {/* Only render TransactionForm once */}
      <TransactionForm
        editData={editTx}
        onUpdate={handleUpdate}
        onAdd={handleAdd}
      />

      {transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No transactions yet.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((tx) => (
            <li
              key={tx._id}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg"
            >
              <div className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-medium">₹{tx.amount}</span> -{" "}
                {tx.description} on{" "}
                <span className="italic">
                  {new Date(tx.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(tx)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(tx._id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
