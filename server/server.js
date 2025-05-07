import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import transactionsRoute from './routes/transactions.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://finance-tracker-omega-ten.vercel.app/"],
    credentials: true,
}))

await connectDB();
console.log('MongoDB Connected');

// Register the transactions route
app.use('/api/transactions', transactionsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
