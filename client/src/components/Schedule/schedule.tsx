import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { SessionContext } from "../../context/session.provider";
import { AppContext } from "../../context/app.provider";
import { WEEKDAYS, MONTHS } from "../../helpers/time.helpers";
import { DateType } from "../../context/app.types";

import GameCardCalendar from "../GameCardCalendar/gameCardCalendar";
import AddDatePopup from "../AddDatePopup/addDatePopup";
import PlusIcon from "../../assets/icons/plusIcon";

import styles from "./schedule.module.css";

type AddDateForm = {
  form: boolean;
  date: string;
};

type YearMonth = {
  year: string;
  month: string;
};

type DaysForMonth = {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
};

function Schedule() {
  const { isAuthenticated } = useContext(SessionContext);
  const {
    settings: { enableCalendarScrollMode },
    getDates,
    dates,
  } = useContext(AppContext);
  const [addDateForm, setAddDateForm] = useState<AddDateForm>({
    form: false,
    date: "",
  });
  const { t } = useTranslation();

  useEffect(() => {
    getDates();
  }, []);

  const closeHandler = () => setAddDateForm({ form: false, date: "" });

  const weekday = require("dayjs/plugin/weekday");
  const weekOfYear = require("dayjs/plugin/weekOfYear");
  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);

  const TODAY: string = dayjs().format("YYYY-MM-DD");

  const INITIAL_YEAR: string = dayjs().format("YYYY");
  const INITIAL_MONTH: string = dayjs().format("M");

  const [calendar, setCalendar] = useState<YearMonth>({
    year: INITIAL_YEAR,
    month: INITIAL_MONTH,
  });

  const CURRENT_YEAR: string = calendar.year;
  const CURRENT_MONTH: string = MONTHS[Number(calendar.month) - 1];

  const updateCalendar = (e: React.MouseEvent) => {
    let curYear: number = Number(calendar.year);
    let curMonth: number = Number(calendar.month);

    switch ((e.target as HTMLElement).id) {
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
    setCalendar({ year: `${curYear}`, month: `${curMonth}` });
  };

  const getNumberOfDaysInMonth = (year: string, month: string): number => {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  };

  const createDaysForCurrentMonth = (
    year: string,
    month: string
  ): DaysForMonth[] => {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => ({
      date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: true,
    }));
  };

  const createDaysForPreviousMonth = (
    year: string,
    month: string
  ): DaysForMonth[] => {
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

  const createDaysForNextMonth = (
    year: string,
    month: string
  ): DaysForMonth[] => {
    const lastDayOfTheMonthWeekday: number = getWeekday(
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

  const getWeekday = (date: string): number => {
    //@ts-ignore
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

  //@ts-ignore
  const handleMouseScroll = (e) => {
    if (enableCalendarScrollMode) {
      e.deltaY > 0
        ? //@ts-ignore
          updateCalendar({ target: { id: "next" } })
        : //@ts-ignore
          updateCalendar({ target: { id: "prev" } });
    }
  };

  return (
    <div className={`${styles.schedule} page-wrapper`}>
      <h1 className="title">{t("Schedule")}</h1>
      <div className={styles.calendarMonth} onWheel={handleMouseScroll}>
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
                  <PlusIcon width="20px" height="20px" color="white" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      {isAuthenticated && addDateForm.form ? (
        <AddDatePopup closeHandler={closeHandler} date={addDateForm.date} />
      ) : null}
    </div>
  );
}

export default Schedule;
