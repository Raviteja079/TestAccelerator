import React from "react";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const loginUser = (e)=>{
    e.preventDefault();
    const username = e.target.username;
    const password = e.target.password;
  }
  return (
    <div className={styles.loginPage}>
      <h1>Login Page</h1>
      <form onSubmit={loginUser}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
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
