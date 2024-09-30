// pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('income');
  const [note, setNote] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses
    async function fetchExpenses() {
      const { data } = await axios.get('/api/expenses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setExpenses(data.expenses);
    }

    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/expenses', {
      amount,
      date,
      type,
      note,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    setAmount('');
    setDate('');
    setNote('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" />
        <button type="submit">Add Expense</button>
      </form>

      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>{`${expense.date} - ${expense.amount} - ${expense.type} - ${expense.note}`}</li>
        ))}
      </ul>
    </div>
  );
}
