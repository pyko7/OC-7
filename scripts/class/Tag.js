import { ucFirst } from "../utils/utils.js";

export class Tag {
  constructor(name) {
    this.name = name;
  }
  createTag() {
    const container = document.createElement("div");
    const tagName = document.createElement("span");
    const removeTagButton = document.createElement("button");
    const removeTagButtonIcon = document.createElement("img");

    container.classList.add("tag");
    removeTagButtonIcon.setAttribute("src", "/assets/svg/close-icon.svg");
    tagName.textContent = ucFirst(this.name);

    removeTagButton.appendChild(removeTagButtonIcon);
    container.appendChild(tagName);
    container.appendChild(removeTagButton);
    return container;
  }
}
