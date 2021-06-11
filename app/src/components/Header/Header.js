import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import AuthModal from "../AuthModal/AuthModal";

import "./Header.scss";

function Header() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  return (
    <header>
      <NavLink className="logo" exact={true} to="/">
        <h1>
          Team Stat<span>Z</span>
        </h1>
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink to="/team" activeClassName="is-active">
              <span>Team</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule" activeClassName="is-active">
              <span>Schedule</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" activeClassName="is-active">
              <span>Stats</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <span className="auth" onClick={() => toggleModal()}>
        <span>Moder</span>
      </span>
      {modal ? <AuthModal /> : null}
      {modal ? (
        <div className="modal-bg" onClick={() => toggleModal()}></div>
      ) : null}
    </header>
  );
}

export default Header;
