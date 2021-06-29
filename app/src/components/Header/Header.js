import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import AuthModal from "../AuthModal/AuthModal";

import styles from "./header.module.css";

function Header() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
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
              <span>Team</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule" activeClassName={styles.isActive}>
              <span>Schedule</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" activeClassName={styles.isActive}>
              <span>Stats</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <span className={styles.auth} onClick={() => toggleModal()}>
        <span>Moder</span>
      </span>
      {modal ? <AuthModal /> : null}
      {modal ? (
        <div className={styles.modalBg} onClick={() => toggleModal()}></div>
      ) : null}
    </header>
  );
}

export default Header;
