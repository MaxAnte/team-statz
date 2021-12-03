import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { parseSubTime } from "../../helpers/time.helpers";

import CloseIcon from "../../assets/icons/closeIcon";
import SubstitutionArrowIcon from "../../assets/icons/substitutionArrowIcon";

import styles from "./substitutionInput.module.css";

type Props = {
  isStarter: boolean;
  getSubstitutions: (list: string[]) => void;
};

function SubstitutionInput({ isStarter, getSubstitutions }: Props) {
  const { t } = useTranslation();
  const [tmpTime, setTmpTime] = useState<string>("");
  const [subsList, setSubsList] = useState<string[]>([]);

  const onChangeSub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpTime(e.target.value);
  };

  const addSubstitution = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        setSubsList(subsList.concat(parseSubTime(tmpTime)));
        setTmpTime("");
      }
    },
    [subsList, tmpTime]
  );

  useEffect(() => {
    //@ts-ignore
    window.addEventListener("keydown", addSubstitution);
    return () => {
      //@ts-ignore
      window.removeEventListener("keydown", addSubstitution);
    };
  }, [addSubstitution]);

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
          onChange={onChangeSub}
          placeholder="15:35"
          value={tmpTime}
        />
      </div>
    </div>
  );
}

export default SubstitutionInput;
