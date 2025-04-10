import React from "react";
import styles from "./SignupPage.module.css";

function SignupPage() {
  const registerUser = (e)=>{
    e.preventDefault();
    const username = e.target.username;
    const email = e.target.email;
    const password = e.target.password; 
  }
  return (
    <div className={styles.signupPage}>
      <h1>Signup Page</h1>
      <form onSubmit={registerUser}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
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
