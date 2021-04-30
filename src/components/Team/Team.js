import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import TeamInfo from "../TeamInfo/TeamInfo";
import PlayerCard from "../PlayerCard/PlayerCard";

import "./Team.scss";

function Team({store}) {
  const [state, setState] = useState(store);
  // console.log(state);

  let bestPts = {pts: 0, id: 0};
  let bestReb = {reb: 0, id: 0};
  let bestAst = {ast: 0, id: 0};
  let bestBlk = {blk: 0, id: 0};
  let bestStl = {stl: 0, id: 0};
  state.players.forEach(el => {
    if (el.pts > bestPts.pts) {
      bestPts.pts = el.pts;
      bestPts.id = el.id;
    }
    if (el.reb > bestReb.reb) {
      bestReb.reb = el.reb;
      bestReb.id = el.id;
    }
    if (el.ast > bestAst.ast) {
      bestAst.ast = el.ast;
      bestAst.id = el.id;
    }
    if (el.blk > bestBlk.blk) {
      bestBlk.blk = el.blk;
      bestBlk.id = el.id;
    }
    if (el.stl > bestStl.stl) {
      bestStl.stl = el.stl;
      bestStl.id = el.id;
    }
  });
  state.players.map(el => {
    if (el.id === bestPts.id) {
      el.bestInPts = true;
    }
    if (el.id === bestReb.id) {
      el.bestInReb = true;
    }
    if (el.id === bestAst.id) {
      el.bestInAst = true;
    }
    if (el.id === bestBlk.id) {
      el.bestInBlk = true;
    }
    if (el.id === bestStl.id) {
      el.bestInStl = true;
    }
    return el;
  });

  return (
    <div className="team">
      <h2 className="title">Basketball City Team</h2>
      <div className="team__info">
        <TeamInfo data={state} />
      </div>
      <div className="team__players">
        {state.players.map((player, id) => {
          return (
            <div className="player__item" key={id}>
              <NavLink to={`/player/${id}`} className="player__link">
                <PlayerCard player={player} />
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Team;
