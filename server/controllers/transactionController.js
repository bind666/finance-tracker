import Transaction from '../models/Transaction.js';
import mongoose from 'mongoose';

export const getAllTransactions = async (req, res) => {
  try {
    const tx = await Transaction.find().sort({ date: -1 });
    res.json(tx);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const tx = await Transaction.create(req.body);
    res.status(201).json(tx);
    getMonthlyExpenses()
  } catch (error) {
    res.status(400).json({ message: 'Error creating transaction', error });
  }
};

export const getMonthlyExpenses = async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;

    const startOfYear = new Date(`${year}-01-01`);
    const endOfYear = new Date(`${+year + 1}-01-01`);

    const expenses = await Transaction.aggregate([
      {
        $match: {
          date: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    const monthNames = [
      "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedExpenses = expenses.map(exp => ({
      month: monthNames[exp._id],
      amount: exp.totalAmount
    }));

    res.json(formattedExpenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monthly expenses', error });
  }
};


export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTx = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are applied
    });

    if (!updatedTx) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    getMonthlyExpenses()

    res.json(updatedTx);
  } catch (error) {
    res.status(400).json({ message: 'Error updating transaction', error });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTx = await Transaction.findByIdAndDelete(id);

    if (!deletedTx) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    getMonthlyExpenses()

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error });
  }
};
