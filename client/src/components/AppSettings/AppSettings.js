import React, { useEffect, useContext, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../context/app.provider";
import { SessionContext } from "../../context/session.provider";

import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import ErrorPage from "../ErrorPage/ErrorPage";

import styles from "./appSettings.module.css";

function AppSettings() {
  const { settings, getSettings, clearPlayoffsBracket } =
    useContext(AppContext);
  const { isAuthenticated } = useContext(SessionContext);
  const [form, setForm] = useState({ playoffsStart: "" });
  const [popup, setPopup] = useState(false);
  const message = useMessage();
  const { request, clearError } = useHttp();
  const { t } = useTranslation();

  useEffect(() => getSettings(), []);
  useEffect(() => setForm({ ...settings }), [settings]);

  const handleTextInputChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleCheckboxInputChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.id]: !!e.target.checked }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        /[0-9]{4}-[0-9]{2}-[0-9]{2}/i.test(form.playoffsStart) &&
        form.playoffsStart.split("-")[0].length <= 4 &&
        +form.playoffsStart.split("-")[1] <= 12 &&
        +form.playoffsStart.split("-")[2] <= 31
      ) {
        await request("/api/settings/save", "POST", { ...form });
        message("Settings saved!", "success");
      } else {
        throw new Error("Wrong date format");
      }
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  const handleBuildBracket = async () => {
    try {
      await request("/api/bracket/build", "POST", {});
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  const handleGetAnswer = (answer) => {
    setPopup(false);
    if (answer) {
      handleBuildBracket();
      setForm((prev) => ({ ...prev, playoffsBracketBuilt: true }));
    }
  };

  if (!isAuthenticated) return <ErrorPage />;
  return (
    <div className={`page-wrapper ${styles.appSettings}`}>
      <h1 className="title">{t("Settings")}</h1>
      <form className={styles.settingsForm} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h5 className={styles.sectionTitle}>{t("General")}</h5>
          <div className={styles.inputGroup}>
            <label htmlFor="enableCalendarScrollMode">
              Calendar change month on mouse scroll:
            </label>
            <input
              type="checkbox"
              className={styles.inputCheckbox}
              id="enableCalendarScrollMode"
              name="enableCalendarScrollMode"
              onChange={handleCheckboxInputChange}
              checked={form.enableCalendarScrollMode}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="dummy2">Dummy:</label>
            <input
              type="text"
              className={styles.inputText}
              placeholder="dummy"
              id="dummy2"
            />
          </div>
        </div>
        <div className={styles.section}>
          <h5 className={styles.sectionTitle}>{t("Playoffs")}</h5>
          <div className={styles.inputGroup}>
            <label htmlFor="playoffsStart">{t("Playoffs start")}:</label>
            <input
              type="text"
              className={styles.inputText}
              placeholder={t("When do the playoffs start?")}
              id="playoffsStart"
              onChange={handleTextInputChange}
              value={form.playoffsStart}
              maxLength={10}
            />
          </div>
          <div className={styles.warning}>
            <p className={styles.subText}>
              <span className={styles.dividers}>{t("or")}</span>
              {t("Build the Playoffs bracket by pressing this button")}.{" "}
              {t(
                "Be careful, because it will make changes in the standings table too"
              )}
            </p>
            <button
              type="button"
              className={`btn__main warning ${styles.btn}`}
              onClick={() => setPopup(true)}
            >
              {form.playoffsBracketBuilt ? t("Rebuild") : t("Build")}
            </button>
            <p
              className={styles.littleText}
              onClick={() => {
                clearPlayoffsBracket();
                setForm((prev) => ({ ...prev, playoffsBracketBuilt: false }));
                message("Playoff bracket cleared!", "success");
              }}
            >
              {t("Clear playoffs")}
            </p>
          </div>
        </div>

        <button type="submit" className={`btn__main ${styles.btn}`}>
          {t("Save")}
        </button>
      </form>
      {popup ? (
        <>
          <ConfirmPopup
            title={t("Are you shure?")}
            handleGetAnswer={handleGetAnswer}
            loadingTitle={`${t("Building")}...`}
          />
          <div className="dark-overlay" onClick={() => setPopup(false)}></div>
        </>
      ) : null}
    </div>
  );
}

export default AppSettings;
