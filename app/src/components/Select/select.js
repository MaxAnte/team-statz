import React, { useState, useEffect } from "react";

import SelectArrowIcon from "../../assets/icons/SelectArrowIcon";

import styles from "./select.module.css";

function Select({ options, className = "", getActive, defaultValue }) {
  const [active, setActive] = useState(defaultValue);
  const [toggle, setToggle] = useState(false);

  const clickHandle = (e) => {
    setActive(e.target.innerText);
    setToggle(false);
  };

  useEffect(() => {
    getActive(active);
  }, [active]);

  return (
    <div className={`${styles.selectWrap} ${className}`}>
      <div className={styles.optionActive} onClick={() => setToggle(!toggle)}>
        {active}
        <SelectArrowIcon
          width="12px"
          heigth="12px"
          className={`${styles.selectArrow} ${
            toggle ? styles.selectArrowFlipped : ""
          }`}
        />
      </div>
      <div
        className={`${styles.optionsHidden} ${
          toggle ? styles.optionsVisible : ""
        }`}
      >
        {options
          .filter((option) => option !== active && option !== "Basketball City")
          .map((option) => (
            <div key={`option_${option}`} onClick={(e) => clickHandle(e)}>
              {option}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Select;
