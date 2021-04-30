import React, {useState} from "react";
import PlayerCard from "../PlayerCard/PlayerCard";

import "./Team.css";

function Team({store}) {
  const [state, setState] = useState(store);
  console.log(state);

  let bestPts = {pts: 0, id: 0};
  let bestReb = {reb: 0, id: 0};
  let bestAst = {ast: 0, id: 0};
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
    return el;
  });

  return (
    <div className="team">
      <h2 className="title">Basketball City Team</h2>
      <div className="players__row">
        {state.players.map((player, id) => {
          return (
            <div className="player__item">
              <PlayerCard player={player} key={id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Team;
