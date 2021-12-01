import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { Player } from "../../app/app.types";

import { AppContext } from "../../app/app.provider";

import PlayerCard from "../PlayerCard/playerCard";
import TeamInfo from "../TeamInfo/teamInfo";

import BasketBallIcon from "../../assets/icons/basketBallIcon";

import styles from "./team.module.css";

function Team() {
  const { t } = useTranslation();
  const {
    loading,
    getPlayers,
    getGames,
    players,
    games,
    settings: { teamName },
  } = useContext(AppContext);

  useEffect(() => {
    getPlayers();
    getGames();
  }, [getPlayers, getGames]);

  return (
    <div className="team page-wrapper">
      <h2 className="title">{t("TeamName", { teamName })}</h2>
      {loading ? (
        <BasketBallIcon width="120px" height="120px" />
      ) : (
        <>
          <TeamInfo players={players} games={games} />
          <div className={styles.teamPlayers}>
            {players.map((player: Player) => (
              <div className={styles.playerItem} key={player._id}>
                <NavLink
                  to={`/player/${player._id}`}
                  className={styles.playerLink}
                >
                  <PlayerCard player={player} />
                </NavLink>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Team;
