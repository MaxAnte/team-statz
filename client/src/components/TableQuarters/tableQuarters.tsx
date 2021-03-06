import React, { createRef, useEffect, useState } from "react";

import { Quarter } from "../../app/app.types";

import EnemyTeamIcon from "../../assets/icons/enemyTeamIcon";
import PlusIcon from "../../assets/icons/plusIcon";

import OurTeamLogo from "../../assets/images/logo-bc.png";

import styles from "./tableQuarters.module.css";

type Props = {
  quarters: Quarter[];
  gameId?: string;
  mode?: "edit";
  handleGetQuarters?: (quarters: Quarter[]) => void;
};

function TableQuarters({ quarters, gameId, mode, handleGetQuarters }: Props) {
  const [editableQuaters, setEditableQuaters] = useState<Quarter[]>(quarters);
  const [ourQuartersRefs, setOurQuartersRefs] = useState<
    React.MutableRefObject<HTMLInputElement>[]
  >([]);
  const [enemyQuartersRefs, setEnemyQuartersRefs] = useState<
    React.MutableRefObject<HTMLInputElement>[]
  >([]);

  useEffect(() => {
    setOurQuartersRefs((ourQuartersRefs) =>
      Array(4)
        .fill({})
        .map((_, i) => ourQuartersRefs[i] || createRef())
    );
    setEnemyQuartersRefs((enemyQuartersRefs) =>
      Array(4)
        .fill({})
        .map((_, i) => enemyQuartersRefs[i] || createRef())
    );
  }, []);

  const handleOurQuarterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quarterId = Number(e.target.id.split("_")[1]);
    const newQuarters: Quarter[] = editableQuaters.map((quarter, i) => {
      if (i === quarterId) quarter.our = Number(e.target.value);
      return quarter;
    });
    if (mode && handleGetQuarters) handleGetQuarters(newQuarters);
  };

  const handleEnemyQuarterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quarterId = Number(e.target.id.split("_")[1]);
    const newQuarters: Quarter[] = editableQuaters.map((quarter, i) => {
      if (i === quarterId) quarter.enemy = Number(e.target.value);
      return quarter;
    });
    if (mode && handleGetQuarters) handleGetQuarters(newQuarters);
  };

  if (!mode && !quarters?.length) return null;
  return (
    <div className={styles.quartersTable}>
      <table>
        <thead>
          <tr>
            <th />
            {mode
              ? editableQuaters.map((q, i) => (
                  <th key={`${gameId}-${q._id}-our`}>
                    {i > 3 ? `OT${i - 3}` : i + 1}
                  </th>
                ))
              : quarters?.map((q, i) => (
                  <th key={`${gameId}-${q._id}-enemy`}>
                    {i > 3 ? `OT${i - 3}` : i + 1}
                  </th>
                ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.logoCell}>
              <img src={OurTeamLogo} alt="" />
            </td>
            {mode
              ? editableQuaters.map((quarter, i) => (
                  <td key={`${gameId}-${quarter._id}-our-manage`}>
                    <input
                      type="number"
                      id={`our_${i}`}
                      placeholder={`${quarter.our}`}
                      data-side={"our"}
                      onChange={handleOurQuarterChange}
                      ref={ourQuartersRefs[i]}
                    />
                  </td>
                ))
              : quarters?.map((quarter) => (
                  <td
                    key={`${gameId}-${quarter._id}-our-static`}
                    className={`${
                      quarter.our > quarter.enemy
                        ? styles.win
                        : quarter.our < quarter.enemy
                        ? styles.lose
                        : styles.even
                    }`}
                  >
                    {quarter.our}
                  </td>
                ))}
          </tr>
          <tr>
            <td className={styles.logoCell}>
              <EnemyTeamIcon width="40px" height="40px" />
            </td>
            {mode
              ? editableQuaters.map((quarter, i) => (
                  <td key={`${gameId}-${quarter._id}-enemy-manage`}>
                    <input
                      type="number"
                      id={`enemy_${i}`}
                      placeholder={`${quarter.enemy}`}
                      data-side={"enemy"}
                      onChange={handleEnemyQuarterChange}
                      ref={enemyQuartersRefs[i]}
                    />
                  </td>
                ))
              : quarters?.map((quarter) => (
                  <td key={`${gameId}-${quarter._id}-enemy-static`}>
                    {quarter.enemy}
                  </td>
                ))}
          </tr>
        </tbody>
      </table>
      {mode && (
        <button
          className={styles.addQuarterBtn}
          type="button"
          onClick={() =>
            setEditableQuaters(editableQuaters.concat({ our: 0, enemy: 0 }))
          }
        >
          <PlusIcon width="10px" height="10px" color="white" />
        </button>
      )}
    </div>
  );
}

export default TableQuarters;
