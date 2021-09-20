import React, { useState, useEffect, useCallback, useContext } from "react";
import Cookies from "js-cookie";

import BirthDayPopup from "../BirthDayPopup/birthDayPopup";
import { AppContext } from "../../context/app.provider";

function BirthDayResolver() {
  const { getBirthdayPlayers, birthDayPlayers } = useContext(AppContext);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  useEffect(() => {
    getBirthdayPlayers();
  }, []);

  const closeHandler = () => {
    Cookies.set("BirthDayEventWatched", "true", { expires: 1 });
    setIsClosed(true);
  };

  return (
    birthDayPlayers?.length &&
    !Cookies.get("BirthDayEventWatched") &&
    !isClosed && (
      <BirthDayPopup players={birthDayPlayers} closeHandler={closeHandler} />
    )
  );
}

export default BirthDayResolver;