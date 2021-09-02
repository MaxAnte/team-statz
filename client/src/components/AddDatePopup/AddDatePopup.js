import React, { useState, useCallback, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import Select from "../Select/select";

import CloseIcon from "../../assets/icons/CloseIcon";

import styles from "./addDatePopup.module.css";

function AddGamePopup({ closeHandler, date, handleChangeDates }) {
  const [teams, setTeams] = useState(undefined);
  const [form, setForm] = useState([]);
  const [formClose, setFormClose] = useState(false);
  const message = useMessage();
  const { request, clearError } = useHttp();
  const { t } = useTranslation();

  const getTeams = useCallback(async () => {
    try {
      const data = await request("/api/team/teams", "POST", {});
      if (Object.keys(data).length) setTeams(Object.values(data));
    } catch (e) {}
  }, [request]);

  const teamList = teams ? teams.map((team) => team.name) : [];

  useEffect(() => {
    setForm((prevState) => ({ ...prevState, date, time: "18:00" }));
    getTeams();
  }, [date, getTeams]);

  const handleGetActive = useCallback(
    (enemy) => setForm((prevState) => ({ ...prevState, enemy })),
    []
  );
  const handleChangeTime = (e) =>
    setForm((prevState) => ({ ...prevState, time: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request("/api/date/add-date", "POST", { ...form });
      handleChangeDates(form);
      setFormClose(true);
    } catch (e) {
      message(e.message);
      clearError();
    }
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
            options={teamList ? teamList : []}
            className={styles.selectWrap}
            getActive={handleGetActive}
            defaultValue="Enemy Team"
          />
          <button className="btn__main">{t("Add")}</button>
        </form>
      ) : (
        <div className={styles.addDateForm}>
          {t("Date is added successfully")}
        </div>
      )}
      <div className={styles.closeBtn} onClick={() => closeHandler()}>
        <CloseIcon width="20px" heigth="20px" color="black" />
      </div>
    </div>
  );
}

export default AddGamePopup;
