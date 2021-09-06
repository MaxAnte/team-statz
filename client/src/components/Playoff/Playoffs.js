import React from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import Table from "../Table/Table";
import BracketCanvas from "../BracketCanvas/BracketCanvas";

import styles from "./playoffs.module.css";

function Playoffs() {
  const { request, error, clearError } = useHttp();
  const message = useMessage();
  const { t } = useTranslation();

  return (
    <div className={`${styles.playoff} page-wrapper`}>
      <h1 className="title">{t("Playoffs")}</h1>
      <Table />
      <div className={styles.bracket}>
        <BracketCanvas />
      </div>
    </div>
  );
}

export default Playoffs;
