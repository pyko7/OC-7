import { openSelect, closeSelect } from "./select.js";

const menu = document.getElementById("1");

export const setupSelectListeners = () => {
  menu.addEventListener("click", () => {
    openSelect(menu);
  });
  closeSelect(menu);
};
