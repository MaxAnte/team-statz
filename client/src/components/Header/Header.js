import React, { useState, useEffect, useCallback } from "react";
import Cookie from "js-cookie";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AuthModal from "../AuthModal/AuthModal";
import Select from "../Select/select";

import styles from "./header.module.css";

function Header() {
  const [modal, setModal] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lang = Cookie.get("language");
    i18n.changeLanguage(lang);
  }, [i18n]);

  const toggleModal = () => setModal(!modal);
  const closeOnLogin = () => setModal(false);
  const handleGetActive = useCallback(
    (option) => i18n.changeLanguage(option),
    [i18n]
  );

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
      <Select
        options={["en", "ru", "uk"]}
        className={styles.languageSwitcher}
        getActive={handleGetActive}
        defaultValue={Cookie.get("language") || "en"}
        type="language"
        arrow={false}
      />
      <span className={styles.auth} onClick={() => toggleModal()}>
        <span>{t("Moder")}</span>
      </span>
      {modal ? (
        <>
          <AuthModal closeOnLogin={closeOnLogin} />
          <div className={styles.modalBg} onClick={() => toggleModal()}></div>
        </>
      ) : null}
    </header>
  );
}

export default Header;
