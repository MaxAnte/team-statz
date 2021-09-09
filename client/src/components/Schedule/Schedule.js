import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { SessionContext } from "../../context/session.provider";
import { WEEKDAYS, MONTHS } from "../../helpers/time.helpers";

import GameCardCalendar from "../GameCardCalendar/GameCardCalendar";
import AddDatePopup from "../AddDatePopup/AddDatePopup";
import PlusIcon from "../../assets/icons/PlusIcon";

import styles from "./schedule.module.css";

function Schedule() {
  const { isAuthenticated } = useContext(SessionContext);
  const [dates, setDates] = useState([]);
  const [addDateForm, setAddDateForm] = useState({ form: false, date: "" });
  const { request, error, clearError } = useHttp();
  const message = useMessage();
  const { t } = useTranslation();

  const getDates = useCallback(async () => {
    try {
      const data = await request("/api/date/dates", "POST", {});
      if (Object.keys(data).length) setDates(Object.values(data));
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => getDates(), [getDates]);

  const closeHandler = () => setAddDateForm({ form: false, date: "" });

  const weekday = require("dayjs/plugin/weekday");
  const weekOfYear = require("dayjs/plugin/weekOfYear");
  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);

  const TODAY = dayjs().format("YYYY-MM-DD");

  const INITIAL_YEAR = dayjs().format("YYYY");
  const INITIAL_MONTH = dayjs().format("M");

  const [calendar, setCalendar] = useState({
    year: INITIAL_YEAR,
    month: INITIAL_MONTH,
  });

  const CURRENT_YEAR = calendar.year;
  const CURRENT_MONTH = MONTHS[calendar.month - 1];

  const updateCalendar = (e) => {
    let curMonth;
    let curYear;
    curYear = calendar.year;
    curMonth = +calendar.month;

    switch (e.target.id) {
      case "next":
        if (curMonth < 12) {
          curMonth++;
        } else {
          curMonth = 1;
          curYear++;
        }
        break;
      case "prev":
        if (curMonth > 1) {
          curMonth--;
        } else {
          curMonth = 12;
          curYear--;
        }
        break;
      default:
        break;
    }
    setCalendar({ year: curYear.toString(), month: curMonth.toString() });
  };

  const getNumberOfDaysInMonth = (year, month) => {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  };

  const createDaysForCurrentMonth = (year, month) => {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => ({
      date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: true,
    }));
  };

  const createDaysForPreviousMonth = (year, month) => {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);

    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;
    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
      .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
      .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => ({
      date: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format("YYYY-MM-DD"),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false,
    }));
  };

  const createDaysForNextMonth = (year, month) => {
    const lastDayOfTheMonthWeekday = getWeekday(
      `${year}-${month}-${currentMonthDays.length}`
    );

    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((_, index) => ({
      date: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
    }));
  };

  const getWeekday = (date) => {
    return dayjs(date).weekday();
  };

  let currentMonthDays = createDaysForCurrentMonth(
    calendar.year,
    calendar.month
  );
  let previousMonthDays = createDaysForPreviousMonth(
    calendar.year,
    calendar.month
  );
  let nextMonthDays = createDaysForNextMonth(calendar.year, calendar.month);

  let days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

  const handleChangeDates = (newDate) =>
    setDates((prevDates) => [...prevDates, newDate]);

  return (
    <div className={`${styles.schedule} page-wrapper`}>
      <h1 className="title">{t("Schedule")}</h1>
      <div
        className={styles.calendarMonth}
        onWheel={(deltaMode) => console.log(deltaMode)}
      >
        <section className={styles.calendarMonthHeader}>
          <div
            id="selected-month"
            className={styles.calendarMonthHeaderSelectedMonth}
          >
            <span id="prev" onClick={(e) => updateCalendar(e)}>
              {"<"}
            </span>
            {t(CURRENT_MONTH)}, {CURRENT_YEAR}
            <span id="next" onClick={(e) => updateCalendar(e)}>
              {">"}
            </span>
          </div>
        </section>
        <ol className={styles.dayOfWeek}>
          {WEEKDAYS.map((weekday) => (
            <li key={weekday}>{t(weekday)}</li>
          ))}
        </ol>
        <ol className={styles.daysGrid}>
          {days.map((day) => (
            <li
              key={day.date}
              className={`${styles.calendarDay} ${
                !day.isCurrentMonth ? styles.calendarDayNotCurrent : ""
              }
              ${day.date === TODAY ? styles.calendarDayToday : ""}`}
              onClick={() =>
                dates && dates.find((el) => el.date === day.date)
                  ? null
                  : setAddDateForm({ form: true, date: day.date })
              }
            >
              <span>{day.dayOfMonth}</span>
              {dates &&
              dates.filter((game) => game.date === day.date).length ? (
                dates
                  .filter((game) => game.date === day.date)
                  .map((game) => (
                    <div key={game._id} className={styles.dayCell}>
                      <Link to={`/#${game.date}`}></Link>
                      <GameCardCalendar game={game} />
                    </div>
                  ))
              ) : isAuthenticated && day.isCurrentMonth ? (
                <div className={styles.addGameDate}>
                  <PlusIcon width="20px" heigth="20px" color="white" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      {isAuthenticated && addDateForm.form ? (
        <AddDatePopup
          closeHandler={closeHandler}
          date={addDateForm.date}
          handleChangeDates={handleChangeDates}
        />
      ) : null}
    </div>
  );
}

export default Schedule;
