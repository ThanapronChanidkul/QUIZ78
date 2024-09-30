// pages/expenses.js
import { useState, useEffect } from 'react';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/expenses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setExpenses(data.expenses); // สมมติว่า API ของคุณคืนค่ารายการค่าใช้จ่ายเป็นอาเรย์
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>ค่าใช้จ่ายของคุณ</h1>
      {/* แสดงรายการค่าใช้จ่ายที่นี่ */}
    </div>
  );
};

export default Expenses;
