import React, { useState, useEffect, createRef } from "react";
import Cookie from "js-cookie";
import { useTranslation } from "react-i18next";
import { TEAMNAME } from "../../project.const";

import SelectArrowIcon from "../../assets/icons/selectArrowIcon";

import styles from "./select.module.css";

type Props = {
  options: string[];
  className: string;
  getActive: (active: string) => void;
  defaultValue: string;
  type?: string;
  arrow?: boolean;
};

function Select({
  options,
  className = "",
  getActive,
  defaultValue,
  type = "",
  arrow = true,
}: Props) {
  const [active, setActive] = useState(defaultValue);
  const [toggle, setToggle] = useState(false);
  const { t } = useTranslation();
  const [optionsRefs, setOptionsRefs] = useState<
    React.MutableRefObject<HTMLInputElement>[]
  >([]);

  useEffect(() => {
    setOptionsRefs((optionsRefs) =>
      Array(4)
        .fill({})
        .map((_, i) => optionsRefs[i] || createRef())
    );
  }, []);

  const clickHandle = (optionId: number) => {
    const option = optionsRefs[optionId].current.dataset.option;
    if (option) {
      setActive(option);
      type === "language" &&
        Cookie.set("language", option, {
          expires: 1,
        });
      setToggle(false);
    }
  };

  useEffect(() => getActive(active), [active, getActive]);

  return (
    <div className={`${styles.selectWrap} ${className}`}>
      <div className={styles.optionActive} onClick={() => setToggle(!toggle)}>
        {t(active)}
        {arrow ? (
          <SelectArrowIcon
            width="12px"
            height="12px"
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
          .map((option, optionId) => (
            <div
              key={`option_${option}`}
              onClick={() => clickHandle(optionId)}
              data-option={option}
              ref={optionsRefs[optionId]}
            >
              {t(option)}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Select;
