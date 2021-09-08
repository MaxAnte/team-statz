import React, { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import styles from "./appSettings.module.css";

function AppSettings() {
  const message = useMessage();
  const { request, clearError } = useHttp();
  const { t } = useTranslation();
  const [form, setForm] = useState({});

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/i.test(form.playoffsStart)) {
        await request("/api/settings/save", "POST", { ...form });
      } else {
        throw new Error("Wrong date format");
      }
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  return (
    <div className={`page-wrapper ${styles.appSettings}`}>
      <h1 className="title">{t("Settings")}</h1>
      <form className={styles.settingsForm} onSubmit={handleSubmit}>
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
        <div className={styles.section}>
          <h5 className={styles.sectionTitle}>{t("Playoffs")}</h5>
          <div className={styles.inputGroup}>
            <label htmlFor="playoffsStart">{t("Playoffs start")}:</label>
            <input
              type="text"
              placeholder={t("When do the playoffs start?")}
              id="playoffsStart"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.warning}>
            <p className={styles.subText}>
              <span className={styles.dividers}>{t("or")}</span>
              {t("Build the Playoffs bracket by pressing this button")}
            </p>
            <button type="button" className={`btn__main warning ${styles.btn}`}>
              {t("Build")}
            </button>
          </div>
        </div>

        <button type="submit" className={`btn__main ${styles.btn}`}>
          {t("Save")}
        </button>
      </form>
    </div>
  );
}

export default AppSettings;
