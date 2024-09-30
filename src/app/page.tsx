// app/page.tsx
"use client"; // เพิ่มบรรทัดนี้เพื่อทำให้เป็น Client Component

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true); // สถานะเพื่อสลับระหว่างฟอร์มล็อกอินและฟอร์มลงทะเบียน

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ... โค้ดล็อกอิน (ไม่มีการเปลี่ยนแปลง)
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      alert('Registration successful! Please log in.');
      setIsLogin(true); // สลับกลับไปที่ฟอร์มล็อกอินหลังการลงทะเบียนสำเร็จ
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h2>{isLogin ? "Login" : "Register"}</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
            <p onClick={() => setIsLogin(false)} style={{ cursor: 'pointer' }}>Don't have an account? Register here.</p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Register</button>
            <p onClick={() => setIsLogin(true)} style={{ cursor: 'pointer' }}>Already have an account? Login here.</p>
          </form>
        )}

        </main>
    </div>
  );
}
