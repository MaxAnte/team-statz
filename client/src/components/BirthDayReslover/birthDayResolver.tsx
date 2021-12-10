import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../../app/app.provider";

import BirthDayPopup from "../BirthDayPopup/birthDayPopup";

function BirthDayResolver() {
  const { season, getBirthdayPlayers, birthDayPlayers } =
    useContext(AppContext);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  useEffect(() => {
    if (season) getBirthdayPlayers();
  }, [getBirthdayPlayers, season]);

  const closeHandler = () => {
    Cookies.set("BirthDayEventWatched", "true", { expires: 1 });
    setIsClosed(true);
  };

  return birthDayPlayers?.length &&
    !Cookies.get("BirthDayEventWatched") &&
    !isClosed ? (
    <BirthDayPopup players={birthDayPlayers} closeHandler={closeHandler} />
  ) : null;
}

export default BirthDayResolver;
