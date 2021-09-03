import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./errorPage.module.css";

function ErrorPage() {
  const { t } = useTranslation();
  return (
    <div className={`page-wrapper ${styles.errorPage}`}>
      <h1 className={styles.errorTitle}>
        <span className={styles.colorString}>{t("Whoops!")}</span>{" "}
        {t("Brick shot!")}
      </h1>
      <p className={styles.errorDescription}>
        {t("That's the wrong neighborhood, fam.")} {t("Let's do a")}{" "}
        <button type="button" onClick={() => window.history.go(-1)}>
          <strong>{t("Step back")}</strong>
        </button>{" "}
        {t("outta here")}!
      </p>
    </div>
  );
}

export default ErrorPage;
