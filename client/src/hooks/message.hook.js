import { useCallback } from "react";

export const useMessage = () => {
  return useCallback((text) => {
    if (text) {
      const wrapper = document.createElement("div");
      wrapper.className = "errorWrap";
      const textEl = document.createTextNode(text);
      wrapper.appendChild(textEl);
      const element = document.getElementById("root");
      element.appendChild(wrapper);
      const errorEl = document.querySelector(".errorWrap");
      setTimeout(() => {
        errorEl.classList.add("fadeIn");
      }, 100);
      setTimeout(() => {
        errorEl.classList.add("fadeAway");
        setTimeout(() => {
          errorEl.remove();
        }, 300);
      }, 2000);
    }
  }, []);
};
