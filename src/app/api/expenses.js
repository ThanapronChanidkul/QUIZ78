// pages/api/expenses.js
import dbConnect from '../../lib/dbConnect';
import Expense from '../../models/Expense';
import { verify } from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  // ตรวจสอบว่า token มีอยู่ใน header หรือไม่
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  let decoded;
  try {
    decoded = verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (req.method === 'POST') {
    const { amount, date, type, note } = req.body;

    const expense = await Expense.create({
      amount,
      date,
      type,
      note,
      userId: decoded.userId,
    });

    res.status(201).json({ expense });
  } else if (req.method === 'GET') {
    const expenses = await Expense.find({ userId: decoded.userId });
    res.status(200).json({ expenses });
  }
}
