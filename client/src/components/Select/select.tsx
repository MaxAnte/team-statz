import Cookie from "js-cookie";
import React, { createRef, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AppContext } from "../../app/app.provider";

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
  const { settings } = useContext(AppContext);
  const { t } = useTranslation();
  const [active, setActive] = useState(defaultValue);
  const [toggle, setToggle] = useState(false);
  const [optionsRefs, setOptionsRefs] = useState<
    React.MutableRefObject<HTMLDivElement>[]
  >([]);

  useEffect(() => {
    if (options.length) {
      setOptionsRefs((optionsRefs) =>
        Array(options.length)
          .fill({})
          .map((_, i) => optionsRefs[i] || createRef())
      );
    }
  }, [options]);

  const clickHandle = (optionId: number) => {
    const { option } = optionsRefs[optionId].current.dataset;
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
          .filter((option) => option !== active && option !== settings.teamName)
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
