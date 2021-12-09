import Cookie from "js-cookie";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { useOutsideClickHandler } from "../../hooks/outsideClick.hook";

import { AppContext } from "../../app/app.provider";
import { SessionContext } from "../../session/session.provider";

import AuthModal from "../AuthModal/authModal";
import Select from "../Select/select";

import LogoutIcon from "../../assets/icons/logoutIcon";
import ScheduleIcon from "../../assets/icons/scheduleIcon";
import SettingsIcon from "../../assets/icons/settingsIcon";
import StatsIcon from "../../assets/icons/statsIcon";
import TeamIcon from "../../assets/icons/teamIcon";
import UserIcon from "../../assets/icons/userIcon";

import styles from "./header.module.css";

function Header() {
  const { isAuthenticated, logOutUser } = useContext(SessionContext);
  const { getSeason } = useContext(AppContext);
  const [modal, setModal] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const userPanelRef = useRef(null);
  const closeUserPanel: boolean = useOutsideClickHandler(userPanelRef);

  useEffect(() => {
    if (isAuthenticated && closeUserPanel && modal) setModal(false);
  }, [closeUserPanel, isAuthenticated, modal]);

  useEffect(() => {
    const lang = Cookie.get("language");
    i18n.changeLanguage(lang || "en");
  }, [i18n]);

  const toggleModal = () => setModal(!modal);
  const closeOnLogin = () => setModal(false);
  const handleGetActiveLanguage = useCallback(
    (option: string) => i18n.changeLanguage(option),
    [i18n]
  );
  const handleGetActiveSeason = useCallback(
    async (option: string) => {
      await getSeason(option);
    },
    [getSeason]
  );

  return (
    <header className={styles.header}>
      <NavLink className={styles.logo} exact to="/">
        <h1>
          Team Stat<span>Z</span>
        </h1>
      </NavLink>
      <Select
        options={["18/19", "19/20", "20/21"]}
        className={styles.seasonsSwitcher}
        getActive={handleGetActiveSeason}
        defaultValue={"20/21"}
      />
      <nav className={styles.navList}>
        <ul>
          <li>
            <NavLink to="/team" activeClassName={styles.isActive}>
              <TeamIcon width="36px" height="36px" />
              <span>{t("Team")}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule" activeClassName={styles.isActive}>
              <ScheduleIcon width="36px" height="36px" />
              <span>{t("Schedule")}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" activeClassName={styles.isActive}>
              <StatsIcon width="36px" height="36px" />
              <span>{t("Stats")}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Select
        options={["en", "ru", "uk"]}
        className={styles.languageSwitcher}
        getActive={handleGetActiveLanguage}
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
              onClick={() => logOutUser()}
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
          <div className={styles.modalBg} onClick={() => toggleModal()} />
        </>
      ) : null}
    </header>
  );
}

export default Header;
