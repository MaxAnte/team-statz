import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { parseSubTime } from "../../helpers/time.helpers";

import { useMessage } from "../../hooks/message.hook";

import CloseIcon from "../../assets/icons/closeIcon";
import SubstitutionArrowIcon from "../../assets/icons/substitutionArrowIcon";

import styles from "./substitutionInput.module.css";

type Props = {
  isStarter: boolean;
  base?: string[];
  getSubstitutions: (list: string[]) => void;
};

function SubstitutionInput({ isStarter, base, getSubstitutions }: Props) {
  const message = useMessage();
  const { t } = useTranslation();
  const [subsList, setSubsList] = useState<string[]>(base || []);
  const inputRef = useRef(null);

  const addSubstitution = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.trim().length &&
      e.target.value.split(":").every((el) => Number(el))
    ) {
      setSubsList(subsList.concat(parseSubTime(e.target.value)));
    } else {
      message(t("Invalid value"));
    }
    //@ts-ignore
    inputRef.current.value = "";
  };

  const handleRemove = (index: number) => {
    setSubsList(subsList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    getSubstitutions(subsList);
  }, [getSubstitutions, subsList]);

  return (
    <div className={styles.wrapper}>
      <label htmlFor="minutes">{t("Minutes")}: </label>
      <div className={styles.subsWrapper}>
        {subsList.map((sub, i) => {
          const idx = !isStarter ? i + 1 : i;
          return (
            <span key={sub} className={styles.sub}>
              <SubstitutionArrowIcon
                width={"18"}
                height={"20"}
                className={`${idx % 2 === 1 ? styles.subUp : styles.subDown}`}
              />
              {sub}
              <span
                className={styles.remove}
                onClick={() => {
                  handleRemove(i);
                }}
              >
                <CloseIcon width={"5px"} height={"5px"} color={"white"} />
              </span>
            </span>
          );
        })}
        <input
          type="text"
          className={styles.input}
          id="substitution"
          ref={inputRef}
          onBlur={addSubstitution}
          placeholder="15:35"
        />
      </div>
    </div>
  );
}

export default SubstitutionInput;
