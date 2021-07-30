import { useCallback } from "react";

export const useMessage = () => {
  return useCallback((text) => {
    if (text) {
      console.log(text);
      var wrapper = document.createElement("div");
      wrapper.className = "errorWrap";
      var textEl = document.createTextNode(text);
      wrapper.appendChild(textEl);
      var element = document.getElementById("root");
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
