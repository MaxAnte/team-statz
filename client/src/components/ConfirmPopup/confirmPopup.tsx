import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import MiniLoader from "../Loader/miniLoader";

import styles from "./confirmPopup.module.css";

type Props = {
  title: string;
  description?: string;
  handleGetAnswer: (answer: boolean) => void;
  loadingTitle?: string;
};

function ConfirmPopup({
  title,
  description = "",
  handleGetAnswer,
  loadingTitle = "Wait a second...",
}: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const handlePositive = () => {
    setLoading(true);
    setTimeout(() => {
      handleGetAnswer(true);
      setLoading(false);
    }, 1500);
  };
  return (
    <div className={styles.confirmPopup}>
      <h5>{loading ? t(loadingTitle) : title}</h5>
      {loading ? (
        <MiniLoader />
      ) : (
        <>
          <p>{description}</p>
          <div className={styles.actions}>
            <button
              type="button"
              className="btn__main warning"
              onClick={() => handleGetAnswer(false)}
            >
              {t("No")}
            </button>
            <button
              type="button"
              className="btn__main"
              onClick={() => handlePositive()}
            >
              {t("Yes")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ConfirmPopup;
