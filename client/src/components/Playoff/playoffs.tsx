import React from "react";
import { useTranslation } from "react-i18next";

import Bracket from "../Bracket/bracket";
import Table from "../Table/table";

import styles from "./playoffs.module.css";

function Playoffs() {
  const { t } = useTranslation();
  return (
    <div className={`${styles.playoff} page-wrapper`}>
      <h1 className="title">{t("Playoffs")}</h1>
      <Table />
      <Bracket />
    </div>
  );
}

export default Playoffs;
