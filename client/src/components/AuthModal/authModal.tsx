import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../context/session.provider";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import styles from "./authModal.module.css";

type Props = {
  closeOnLogin: () => void;
};
type UserLoginData = {
  login: string;
  password: string;
};

function AuthModal({ closeOnLogin }: Props) {
  const { login } = useContext(SessionContext);
  const { loading, error, request, clearError } = useHttp();
  const message = useMessage();
  const { t } = useTranslation();
  const [form, setForm] = useState<UserLoginData>({ login: "", password: "" });

  useEffect(() => {
    if (error) {
      message(error);
      clearError();
    }
  }, [error, message, clearError]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      login(data.token, data.userId);
      closeOnLogin();
    } catch (e) {}
  };

  // const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const data = await request("/api/auth/register", "POST", { ...form });
  //     console.log("Data:", data);
  //   } catch (e) {}
  // };

  return (
    <div className={styles.authModal}>
      <h3 className="title">{t("Authentication")}</h3>
      <form className={styles.authCont} onSubmit={loginHandler}>
        <div className={styles.authInput}>
          <input
            type="text"
            name="login"
            id="login"
            placeholder="Login"
            onChange={changeHandler}
          />
          <label htmlFor="login">{t("Login")}</label>
        </div>
        <div className={styles.authInput}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
          />
          <label htmlFor="password">{t("Password")}</label>
        </div>
        <div className={styles.authAction}>
          <button type="submit" className="btn-submit" disabled={loading}>
            {t("Login")}
          </button>
          {/* <button
            className="btn-submit"
            onClick={registerHandler}
            disabled={loading}
          >
            {t("Register")}
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default AuthModal;
