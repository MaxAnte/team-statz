import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import Cookie from "js-cookie";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SessionContext } from "../../context/session.provider";
import { useOutsideClickHandler } from "../../hooks/outsideClick.hook";

import AuthModal from "../AuthModal/AuthModal";
import Select from "../Select/select";
import TeamIcon from "../../assets/icons/TeamIcon";
import ScheduleIcon from "../../assets/icons/ScheduleIcon";
import StatsIcon from "../../assets/icons/StatsIcon";
import UserIcon from "../../assets/icons/UserIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";

import styles from "./header.module.css";

function Header() {
  const { isAuthenticated, logout } = useContext(SessionContext);
  const [modal, setModal] = useState(false);
  const { t, i18n } = useTranslation();
  const userPanelRef = useRef(null);
  const closeUserPanel = useOutsideClickHandler(userPanelRef);

  useEffect(() => {
    if (closeUserPanel && modal) setModal(false);
  }, [closeUserPanel]);

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
              <TeamIcon width="36px" heigth="36px" />
              <span>{t("Team")}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule" activeClassName={styles.isActive}>
              <ScheduleIcon width="36px" heigth="36px" />
              <span>{t("Schedule")}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" activeClassName={styles.isActive}>
              <StatsIcon width="36px" heigth="36px" />
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
      <span
        className={styles.auth}
        onClick={() => toggleModal()}
        ref={userPanelRef}
      >
        <UserIcon width="36px" height="36px" />
        {!isAuthenticated && !modal ? <span>{t("Moder")}</span> : null}
        {isAuthenticated ? (
          <div
            className={`${styles.userPanel} ${
              modal ? styles.userPanelOpened : ""
            }`}
          >
            <NavLink to={"/app/settings"}>
              <SettingsIcon width="30px" height="30px" />
            </NavLink>
            <button
              type="button"
              onClick={() => logout()}
              className={styles.hoverLogout}
            >
              <LogoutIcon width="30px" height="30px" />
            </button>
          </div>
        ) : null}
      </span>
      {modal && !isAuthenticated ? (
        <>
          <AuthModal closeOnLogin={closeOnLogin} />
          <div className={styles.modalBg} onClick={() => toggleModal()}></div>
        </>
      ) : null}
    </header>
  );
}

export default Header;
