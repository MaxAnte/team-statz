import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Team } from "../../app/app.types";
import { AddDateForm } from "./addDatePopup.types";

import { AppContext } from "../../app/app.provider";

import Select from "../Select/select";

import CloseIcon from "../../assets/icons/closeIcon";

import styles from "./addDatePopup.module.css";

type Props = {
  closeHandler: () => void;
  date: string;
};

function AddDatePopup({ closeHandler, date }: Props) {
  const { getTeams, teams, addDate } = useContext(AppContext);
  const [form, setForm] = useState<AddDateForm>({
    date: "",
    enemy: "",
    time: "",
  });
  const [formClose, setFormClose] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    setForm((prevState) => ({ ...prevState, date, time: "18:00" }));
    getTeams();
  }, [date, getTeams]);

  const handleGetActive = useCallback(
    (enemy: string) => setForm((prevState) => ({ ...prevState, enemy })),
    []
  );
  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prevState) => ({ ...prevState, time: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDate(form);
    setFormClose(true);
  };
  return (
    <div
      className={`${styles.addDatePopup} ${
        formClose ? styles.closedPopup : ""
      }`}
    >
      {!formClose ? (
        <form className={styles.addDateForm} onSubmit={handleSubmit}>
          <h5 className={styles.title}>{t("Add game into schedule")}</h5>
          <div className={styles.dateWrap}>
            <span>{date} </span>
            <input
              type="text"
              name="time"
              placeholder="18:00"
              onChange={handleChangeTime}
            />
          </div>
          <Select
            options={teams.map((team: Team) => team.name)}
            className={styles.selectWrap}
            getActive={handleGetActive}
            defaultValue="Enemy Team"
          />
          <button type="submit" className="btn__main">
            {t("Add")}
          </button>
        </form>
      ) : (
        <div className={styles.addDateForm}>
          {t("Date is added successfully")}
        </div>
      )}
      <div className={styles.closeBtn} onClick={() => closeHandler()}>
        <CloseIcon width="20px" height="20px" color="black" />
      </div>
    </div>
  );
}

export default AddDatePopup;
