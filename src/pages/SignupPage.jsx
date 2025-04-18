import React, { useState } from "react";
import styles from "./SignupPage.module.css";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({username:'', email:'', password:'', role: 'user'});

  const navigate = useNavigate()

  const registerUser = (e)=>{
    e.preventDefault();
    console.log(formData)

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userPresent = users.find(user => user.email === formData.email)
    
    if(userPresent){
      alert('User already exists');
      return;
    }

    users.push(formData)
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully');
    navigate('/login');
  }
  return (
    <div className={styles.signupPage}>
      <h1>Signup Page</h1>
      <form onSubmit={registerUser}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input onChange={(e)=>setFormData({...formData, username: e.target.value})} type="text" id="username" name="username" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input onChange={(e) => setFormData({ ...formData, email: e.target.value })}  type="email" id="email" name="email" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" id="password" name="password" required />
        </div>
        <label htmlFor="role">Role:</label>
        <select onChange={(e)=>setFormData({...formData, role: e.target.value})} name="role" id="role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className={styles.signupBtn}>
          <button type="submit">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
