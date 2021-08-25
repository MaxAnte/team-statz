import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";

import BirthDayPopup from "../BirthDayPopup/BirthDayPopup";

function BirthDayResolver() {
  const [isClosed, setIsClosed] = useState(false);
  const [isBirthDay, setIsBirthDay] = useState(false);
  const [birthdayPlayers, setBirthdayPlayers] = useState([]);
  const { request, error, clearError } = useHttp();
  const message = useMessage();

  const checkBirthDate = useCallback(async () => {
    try {
      const data = await request("/api/player/birthDay", "POST", {});
      if (Object.keys(data).length) {
        setIsBirthDay(true);
        setBirthdayPlayers(Object.values(data));
      }
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => checkBirthDate(), [checkBirthDate]);

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
