import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTransaction, updateTransaction } from "@/services/api"; 

const TransactionForm = ({ editData, onUpdate, onAdd }) => {
    const [form, setForm] = useState({
        amount: "",
        date: "",
        description: "",
        category: "General",
    });

    useEffect(() => {
        if (editData) {
            setForm({
                amount: editData.amount,
                date: editData.date,
                description: editData.description,
                category: editData.category || "General", // Default category if not present
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.amount || !form.date || !form.description) {
            return alert("All fields are required.");
        }

        try {
            if (editData) {
                // Call the API to update the transaction
                await updateTransaction(editData._id, form);
                onUpdate(); 
            } else {
                const newTx = await addTransaction(form);
                onAdd(newTx);
            }

            setForm({
                amount: "",
                date: "",
                description: "",
                category: "General",
            });
        } catch (err) {
            alert("Error occurred while submitting the transaction.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-xl font-semibold text-white">
                {editData ? "Edit Transaction" : "Add New Transaction"}
            </h2>

            <div className="flex justify-between">
                <Input
                    name="amount"
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                />
                <Input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                />
                <Input
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />
            </div>
            <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 bg-gray-100 rounded-md"
            >
                <option value="General">General</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Bills">Bills</option>
            </select>

            <Button type="submit" className="w-full">
                {editData ? "Update Transaction" : "Add Transaction"}
            </Button>
        </form>
    );
};

export default TransactionForm;
