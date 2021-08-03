import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import styles from "./player.module.css";

function Player() {
  const [player, setPlayer] = useState({});
  const { id } = useParams();
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const { t } = useTranslation();

  const getDB = async () => {
    const data = await request("/api/player/id", "POST", { _id: id });
    if (data) setPlayer(data);
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    getDB();
  }, []);

  return (
    <div className="player page-wrapper">
      <h2 className={styles.name}>{player.name}</h2>
      <p>Personal page setup</p>
    </div>
  );
}

export default Player;
