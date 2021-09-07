import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./appSettings.module.css";

function AppSettings() {
  const { t } = useTranslation();
  return (
    <div className={`page-wrapper ${styles.appSettings}`}>
      <h1 className="title">{t("Settings")}</h1>
      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>{t("General")}</h5>
        <div className={styles.inputGroup}>
          <label htmlFor="dummy1">Dummy:</label>
          <input type="text" placeholder="dummy" id="dummy1" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="dummy2">Dummy:</label>
          <input type="text" placeholder="dummy" id="dummy2" />
        </div>
      </div>
      <div className={`${styles.section} ${styles.warning}`}>
        <h5 className={styles.sectionTitle}>{t("Playoffs")}</h5>
        <div className={styles.inputGroup}>
          <label htmlFor="playoffsStart">{t("Playoffs start")}:</label>
          <input
            type="text"
            placeholder={t("When do the playoffs start?")}
            id="playoffsStart"
          />
        </div>
        <button className={`btn__main ${styles.btn}`}>Save</button>
        <p className={styles.subText}>
          <span className={styles.dividers}>{t("or")}</span>
          {t("Build the Playoffs bracket by pressing this button")}
        </p>
        <button className={`btn__main ${styles.btn}`}>{t("Build")}</button>
      </div>
    </div>
  );
}

export default AppSettings;
