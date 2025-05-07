import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import transactionsRoute from './routes/transactions.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();
console.log('MongoDB Connected');

// Register the transactions route
app.use('/api/transactions', transactionsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
