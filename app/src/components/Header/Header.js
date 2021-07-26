import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AuthModal from "../AuthModal/AuthModal";

import styles from "./header.module.css";

function Header() {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation();

  const toggleModal = () => setModal(!modal);
  const closeOnLogin = () => setModal(false);
  return (
    <header className={styles.header}>
      <NavLink className={styles.logo} exact={true} to="/">
        <h1>
          Team Stat<span>Z</span>
        </h1>
      </NavLink>
      <nav className={styles.navList}>
        <ul>
          <li>
            <NavLink to="/team" activeClassName={styles.isActive}>
              <span>{t("Team")}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule" activeClassName={styles.isActive}>
              <span>{t("Schedule")}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" activeClassName={styles.isActive}>
              <span>{t("Stats")}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <span className={styles.auth} onClick={() => toggleModal()}>
        <span>{t("Moder")}</span>
      </span>
      {modal ? <AuthModal closeOnLogin={closeOnLogin} /> : null}
      {modal ? (
        <div className={styles.modalBg} onClick={() => toggleModal()}></div>
      ) : null}
    </header>
  );
}

export default Header;
