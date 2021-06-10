import React from "react";
import {NavLink} from "react-router-dom";

import "./Header.scss";

function Header() {
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
      <span className="auth">
        <span>Moder</span>
      </span>
    </header>
  );
}

export default Header;
