import { useState, useEffect } from "react";

export const useOutsideClickHandler = (ref) => {
  const [response, setResponse] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      setResponse(
        ref.current && !ref.current.contains(event.target) ? true : false
      );
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);
  return response;
};
