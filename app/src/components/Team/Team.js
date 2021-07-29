import React, { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TEAMNAME } from "../../project.const";

import TeamInfo from "../TeamInfo/TeamInfo";
import PlayerCard from "../PlayerCard/PlayerCard";
import BlockLoader from "../Loader/BlockLoader";

import styles from "./team.module.css";

function Team() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const { t } = useTranslation();

  const getDB = async () => {
    const dataPlayers = await request("/api/player/players", "POST", {});
    if (dataPlayers) setPlayers(Object.values(dataPlayers));
    const dataGames = await request("/api/game/games", "POST", {});
    if (dataGames) setGames(Object.values(dataGames));
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    getDB();
  }, []);

  let bestPts = { pts: 0, id: 0 };
  let bestReb = { reb: 0, id: 0 };
  let bestAst = { ast: 0, id: 0 };
  let bestBlk = { blk: 0, id: 0 };
  let bestStl = { stl: 0, id: 0 };
  players.forEach((el) => {
    if (el.pts > bestPts.pts) {
      bestPts.pts = el.pts;
      bestPts.id = el._id;
    }
    if (el.reb > bestReb.reb) {
      bestReb.reb = el.reb;
      bestReb.id = el._id;
    }
    if (el.ast > bestAst.ast) {
      bestAst.ast = el.ast;
      bestAst.id = el._id;
    }
    if (el.blk > bestBlk.blk) {
      bestBlk.blk = el.blk;
      bestBlk.id = el._id;
    }
    if (el.stl > bestStl.stl) {
      bestStl.stl = el.stl;
      bestStl.id = el._id;
    }
  });
  players.forEach((el) => {
    if (el._id === bestPts.id) el.bestInPts = true;
    if (el._id === bestReb.id) el.bestInReb = true;
    if (el._id === bestAst.id) el.bestInAst = true;
    if (el._id === bestBlk.id) el.bestInBlk = true;
    if (el._id === bestStl.id) el.bestInStl = true;
  });

  return (
    <div className="team page-wrapper">
      <h2 className="title">
        {TEAMNAME} {t("Team")}
      </h2>
      {loading ? (
        <BlockLoader />
      ) : (
        <>
          <TeamInfo players={players} games={games} />
          <div className={styles.teamPlayers}>
            {players.map((player, id) => (
              <div className={styles.playerItem} key={id}>
                {/* <NavLink to={`/player/${id}`} className={styles.playerLink}> */}
                <PlayerCard player={player} />
                {/* </NavLink> */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Team;
