import React, { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";

import Select from "../Select/select";

import CloseIcon from "../../assets/icons/CloseIcon";

import styles from "./addDatePopup.module.css";

function AddGamePopup({ closeHandler, date }) {
  const [teams, setTeams] = useState(undefined);
  const [form, setForm] = useState([]);
  const [formClose, setFormClose] = useState(false);
  const { request } = useHttp();

  const getTeams = async () => {
    try {
      const data = await request("/api/team/teams", "POST", {});
      if (data) setTeams(Object.values(data));
    } catch (e) {}
  };

  const teamList = teams ? teams.map((team) => team.name) : [];

  useEffect(() => {
    setForm((prevState) => ({ ...prevState, date }));
    getTeams();
  }, []);

  const handleGetActive = (enemy) =>
    setForm((prevState) => ({ ...prevState, enemy }));
  const handleChangeTime = (e) =>
    setForm((prevState) => ({ ...prevState, time: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request("/api/date/add-date", "POST", { ...form });
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
          <h5 className={styles.title}>Add game into schedule</h5>
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
          />
          <button className="btn__main">Add</button>
        </form>
      ) : (
        <div className={styles.addDateForm}>Date is added successfully</div>
      )}
      <div className={styles.closeBtn} onClick={() => closeHandler()}>
        <CloseIcon width="20px" heigth="20px" color="black" />
      </div>
    </div>
  );
}

export default AddGamePopup;
