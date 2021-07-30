import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TEAMNAME } from "../../project.const";

import SelectArrowIcon from "../../assets/icons/SelectArrowIcon";

import styles from "./select.module.css";

function Select({
  options,
  className = "",
  getActive,
  defaultValue,
  arrow = true,
}) {
  const [active, setActive] = useState(defaultValue);
  const [toggle, setToggle] = useState(false);
  const { t } = useTranslation();

  const clickHandle = (e) => {
    setActive(e.target.dataset.option);
    setToggle(false);
  };

  useEffect(() => getActive(active), [active]);

  return (
    <div className={`${styles.selectWrap} ${className}`}>
      <div className={styles.optionActive} onClick={() => setToggle(!toggle)}>
        {t(active)}
        {arrow ? (
          <SelectArrowIcon
            width="12px"
            heigth="12px"
            className={`${styles.selectArrow} ${
              toggle ? styles.selectArrowFlipped : ""
            }`}
          />
        ) : null}
      </div>
      <div
        className={`${styles.optionsHidden} ${
          toggle ? styles.optionsVisible : ""
        }`}
      >
        {options
          .filter((option) => option !== active && option !== TEAMNAME)
          .map((option) => (
            <div
              key={`option_${option}`}
              onClick={(e) => clickHandle(e)}
              data-option={option}
            >
              {t(option)}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Select;
