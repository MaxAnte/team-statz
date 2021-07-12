import React, { useState } from "react";
import dayjs from "dayjs";
import GameCardCalendar from "../GameCardCalendar/GameCardCalendar";

import styles from "./schedule.module.css";

function Schedule({ games }) {
  const weekday = require("dayjs/plugin/weekday");
  const weekOfYear = require("dayjs/plugin/weekOfYear");
  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);

  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
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
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
      return {
        date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true,
      };
    });
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

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
      (day, index) => {
        return {
          date: dayjs(
            `${previousMonth.year()}-${previousMonth.month() + 1}-${
              previousMonthLastMondayDayOfMonth + index
            }`
          ).format("YYYY-MM-DD"),
          dayOfMonth: previousMonthLastMondayDayOfMonth + index,
          isCurrentMonth: false,
        };
      }
    );
  };

  const createDaysForNextMonth = (year, month) => {
    const lastDayOfTheMonthWeekday = getWeekday(
      `${year}-${month}-${currentMonthDays.length}`
    );

    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return {
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: false,
      };
    });
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

  return (
    <div className={`${styles.schedule} page-wrapper`}>
      <h1 className="title">Schedule</h1>
      <div className={styles.calendarMonth}>
        <section className={styles.calendarMonthHeader}>
          <div
            id="selected-month"
            className={styles.calendarMonthHeaderSelectedMonth}
          >
            <span id="prev" onClick={(e) => updateCalendar(e)}>
              {"<"}
            </span>
            {CURRENT_MONTH}, {CURRENT_YEAR}
            <span id="next" onClick={(e) => updateCalendar(e)}>
              {">"}
            </span>
          </div>
        </section>
        <ol className={styles.dayOfWeek}>
          {WEEKDAYS.map((weekday, i) => (
            <li key={i}>{weekday}</li>
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
            >
              <span>{day.dayOfMonth}</span>
              {games.map((game) => {
                if (game.date === day.date) {
                  return <GameCardCalendar game={game} key={game.id} />;
                }
                return false;
              })}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Schedule;
