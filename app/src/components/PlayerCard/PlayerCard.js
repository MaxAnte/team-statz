import React from "react";

import "./PlayerCard.scss";

import blankPhoto from "../../assets/images/blank-silhouette.png";
import basket from "../../assets/images/basket.svg";
import glassCleaner from "../../assets/images/glass_cleaner.png";
import assist from "../../assets/images/assist.png";
import thief from "../../assets/images/thief.svg";
import block from "../../assets/images/block.svg";

function PlayerCard({ player }) {
  return (
    <div className="player__card">
      <div className="player__badges">
        {player.bestInPts ? (
          <div className="player__badge">
            <img src={basket} alt="Bucket mashine" />
            <span>Bucket mashine</span>
          </div>
        ) : (
          ""
        )}
        {player.bestInReb ? (
          <div className="player__badge">
            <img src={glassCleaner} alt="Glass cleaner" />
            <span>Glass cleaner</span>
          </div>
        ) : (
          ""
        )}
        {player.bestInAst ? (
          <div className="player__badge">
            <img src={assist} alt="Point GOD" />
            <span>Point GOD</span>
          </div>
        ) : (
          ""
        )}
        {player.bestInBlk ? (
          <div className="player__badge">
            <img src={block} alt="Block mashine" />
            <span>You shall NOT pass</span>
          </div>
        ) : (
          ""
        )}
        {player.bestInStl ? (
          <div className="player__badge">
            <img src={thief} alt="Thief" />
            <span>Thief</span>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="player__img">
        <img
          src={player.image_thumb === "" ? blankPhoto : player.image_thumb}
          alt="Player"
        />
      </div>
      <p className="player__name">
        {player.name}, {player.position}
      </p>
      <div className="player__stats">
        <div className="player__stats--item">PPG: {player.pts}</div>
        <div className="player__stats--item">RPG: {player.reb}</div>
        <div className="player__stats--item">APG: {player.ast}</div>
        <div className="player__stats--item">BPG: {player.blk}</div>
        <div className="player__stats--item">SPG: {player.stl}</div>
      </div>
    </div>
  );
}

export default PlayerCard;
