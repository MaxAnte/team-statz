import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TEAMNAME } from "../../project.const";
import { AppContext } from "../../context/app.provider.tsx";

import TeamInfo from "../TeamInfo/TeamInfo";
import PlayerCard from "../PlayerCard/PlayerCard";
import BlockLoader from "../Loader/BlockLoader";

import styles from "./team.module.css";

function Team() {
  const { t } = useTranslation();
  const { loading, getPlayers, getGames, players, games } =
    useContext(AppContext);

  useEffect(() => {
    getPlayers();
    getGames();
  }, []);

  return (
    <div className="team page-wrapper">
      <h2 className="title">{t("TeamName", { teamName: TEAMNAME })}</h2>
      {loading ? (
        <BlockLoader />
      ) : (
        <>
          <TeamInfo players={players} games={games} />
          <div className={styles.teamPlayers}>
            {players.map((player) => (
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
