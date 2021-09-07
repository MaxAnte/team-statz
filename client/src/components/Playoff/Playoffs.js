import React from "react";
import { useTranslation } from "react-i18next";

import Table from "../Table/Table";
import Bracket from "../Bracket/Bracket";

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
