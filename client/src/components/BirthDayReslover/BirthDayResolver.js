import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";

import BirthDayPopup from "../BirthDayPopup/BirthDayPopup";

// import styles from "./birthDayPopup.module.css";

function BirthDayResolver() {
  const [isClosed, setIsClosed] = useState(false);
  const [isBirthDay, setIsBirthDay] = useState(false);
  const [birthdayPlayers, setBirthdayPlayers] = useState([]);
  const { request, error, clearError } = useHttp();
  const message = useMessage();

  const checkBirthDate = async () => {
    try {
      const data = await request("/api/player/birthDay", "POST", {});
      if (Object.keys(data).length) {
        setIsBirthDay(true);
        setBirthdayPlayers(Object.values(data));
      }
    } catch (e) {}
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => checkBirthDate(), []);

  const closeHandler = () => {
    Cookies.set("BirthDayEventWatched", true, { expires: 1 });
    setIsClosed(true);
  };

  return (
    isBirthDay &&
    !Cookies.get("BirthDayEventWatched") &&
    !isClosed && (
      <BirthDayPopup players={birthdayPlayers} closeHandler={closeHandler} />
    )
  );
}

export default BirthDayResolver;
