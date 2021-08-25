import React, { useState } from "react";

import OurTeamLogo from "../../assets/images/logo-bc.png";
import EnemyTeamIcon from "../../assets/icons/EnemyTeam";
import PlusIcon from "../../assets/icons/PlusIcon";

import styles from "./tableQuarters.module.css";

function TableQuarters({ quarters, mode = "", handleGetQuarters }) {
  const [editableQuaters, setEditableQuaters] = useState([
    { our: 0, enemy: 0 },
    { our: 0, enemy: 0 },
    { our: 0, enemy: 0 },
    { our: 0, enemy: 0 },
  ]);

  const handleQuarterChange = (e) => {
    const newQuarters = editableQuaters.map((quarter, i) => {
      if (i === +e.target.dataset.index) {
        e.target.dataset.side === "our"
          ? (quarter.our = +e.target.value)
          : (quarter.enemy = +e.target.value);
      }
      return quarter;
    });
    handleGetQuarters(newQuarters);
  };

  if (quarters && quarters.length < 4) return null;
  return (
    <div className={styles.quartersTable}>
      <table>
        <thead>
          <tr>
            <th></th>
            {mode
              ? editableQuaters.map((_, i) => (
                  <th key={i}>{i > 3 ? `OT${i - 3}` : i + 1}</th>
                ))
              : quarters.map((_, i) => (
                  <th key={i}>{i > 3 ? `OT${i - 3}` : i + 1}</th>
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
                  <td
                    key={i}
                    className={`${
                      quarter.our > quarter.enemy ? styles.win : styles.lose
                    }`}
                  >
                    <input
                      type="number"
                      id={`our_${i}`}
                      placeholder={quarter.our}
                      data-index={i}
                      data-side={"our"}
                      onChange={handleQuarterChange}
                    />
                  </td>
                ))
              : quarters.map((quarter, i) => (
                  <td
                    key={i}
                    className={`${
                      quarter.our > quarter.enemy ? styles.win : styles.lose
                    }`}
                  >
                    {quarter.our}
                  </td>
                ))}
          </tr>
          <tr>
            <td className={styles.logoCell}>
              <EnemyTeamIcon width="40px" heigth="40px" />
            </td>
            {mode
              ? editableQuaters.map((quarter, i) => (
                  <td key={i}>
                    <input
                      type="number"
                      id={`enemy_${i}`}
                      placeholder={quarter.enemy}
                      data-side={"enemy"}
                      data-index={i}
                      onChange={handleQuarterChange}
                    />
                  </td>
                ))
              : quarters.map((quarter, i) => <td key={i}>{quarter.enemy}</td>)}
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
          <PlusIcon width="10px" heigth="10px" color="white" />
        </button>
      )}
    </div>
  );
}

export default TableQuarters;
