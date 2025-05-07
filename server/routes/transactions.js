import express from 'express';
import {
  getAllTransactions,
  createTransaction,
  getMonthlyExpenses,
  updateTransaction,
  deleteTransaction, 
} from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction); 
router.get('/monthly-expenses', getMonthlyExpenses);

export default router;
