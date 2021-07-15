import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

import styles from "./authModal.module.css";

function AuthModal({ closeOnLogin }) {
  const auth = useContext(AuthContext);
  const { loading, error, request } = useHttp();
  const [form, setForm] = useState({ login: "", password: "" });

  // TODO: Errors handler
  // const useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
      closeOnLogin();
    } catch (e) {}
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log("Data:", data);
    } catch (e) {}
  };

  return (
    <div className={styles.authModal}>
      <h3 className="title">Authentication</h3>
      <div className={styles.authCont}>
        <div className={styles.authInput}>
          <input
            type="text"
            name="login"
            id="login"
            placeholder="Login"
            onChange={changeHandler}
          />
          <label htmlFor="login">Login</label>
        </div>
        <div className={styles.authInput}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className={styles.authAction}>
          <button
            className="btn-submit"
            onClick={loginHandler}
            disabled={loading}
          >
            Login
          </button>
          {/* <button
            className="btn-submit"
            onClick={registerHandler}
            disabled={loading}
          >
            Register
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
