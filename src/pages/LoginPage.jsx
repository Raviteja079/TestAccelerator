import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const {login} = useAuth()
  const navigate = useNavigate()

  const loginUser = (e)=>{
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u)=> u.username === formData.username && u.password === formData.password);

    if(!user){
      alert('Invalid credentials');
      return;
    }

    const fakeToken = `fake-jwt-token-${Date.now()}`;
    const authData = {
        username: user.username,
        email: user.email,
        role: user.role,
        token: fakeToken
    }
    console.log('authData', authData)

    login(authData)
    navigate('/dashboard')
  }
  return (
    <div className={styles.loginPage}>
      <h1>Login Page</h1>
      <form onSubmit={loginUser}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input onChange={(e) => setFormData({ ...formData, username: e.target.value })} type="text" id="username" name="username" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" id="password" name="password" required />
        </div>
        <div className={styles.loginBtn}>
          <button type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
