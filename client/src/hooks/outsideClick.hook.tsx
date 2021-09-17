import React, { useState, useEffect } from "react";

export const useOutsideClickHandler = (
  ref: React.MutableRefObject<HTMLElement | null>
) => {
  const [response, setResponse] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setResponse(
        ref.current && !ref.current.contains(event.target as HTMLElement)
          ? true
          : false
      );
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);
  return response;
};
