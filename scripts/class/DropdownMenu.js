import { Tag } from "./Tag.js";
import { removeDuplicates, ucFirst } from "../utils/utils.js";

/**
 * @description Class representing a dropdown menu
 */
export default class DropdownMenu {
  /**
   *
   * @param {Object} recipes array of recipes
   * @param {HTMLElement} container dropdown menu container
   * @param {Function} callbackOnSelect
   * @param {string} name title of dropdown menu
   */
  constructor(recipes, container, callbackOnSelect, name) {
    this.recipes = recipes;
    this.container = container;
    this.callbackOnSelect = callbackOnSelect;
    this.name = name;
    this.selectedListElement = null;
    this.listContainer = null;
    this.searchInput = null;
  }

  /**
   * @description create a DOM Element
   */
  createBaseDropdownMenu() {
    const searchResultsContainer = document.createElement("div");
    const searchInputContainer = document.createElement("div");
    const searchInput = document.createElement("input");
    const searchButton = document.createElement("button");
    const searchButtonIcon = document.createElement("img");
    const searchResults = document.createElement("div");
    const searchResultsList = document.createElement("ul");
    const selectedListElement = document.createElement("ul");

    searchResultsContainer.classList.add("dropdown-menu-search-container");
    searchInputContainer.classList.add("dropdown-menu-search");
    searchButton.classList.add("search-btn");
    searchResults.classList.add("dropdown-menu-results");

    searchResultsContainer.setAttribute("id", `${this.name}-results-container`);
    searchResults.setAttribute("id", `${this.name}-results`);
    searchResultsList.setAttribute("id", `${this.name}-list`);
    selectedListElement.setAttribute("id", `${this.name}-list-selected`);
    searchInput.setAttribute("id", `${this.name}-search-input`);
    searchButton.setAttribute("aria-label", "Rechercher");
    searchButton.setAttribute("type", "button");
    searchButtonIcon.setAttribute("src", "/assets/svg/search-icon-grey.svg");
    searchButtonIcon.setAttribute("alt", "");

    this.listContainer = searchResultsList;
    this.selectedListElement = selectedListElement;
    this.searchInput = searchInput;

    this.createDropdownMenuList(this.recipes);

    searchResultsContainer.appendChild(searchResults);
    searchInputContainer.appendChild(searchInput);
    searchInputContainer.appendChild(searchButton);
    searchResults.appendChild(searchInputContainer);
    searchResults.appendChild(selectedListElement);
    searchResults.appendChild(searchResultsList);
    searchButton.appendChild(searchButtonIcon);
    this.container.appendChild(searchResultsContainer);
  }

  /**
   * @description create recipes list in DOM
   * @param {Object} list array of recipes
   */
  createDropdownMenuList(list) {
    const tagsContainer = document.getElementById(
      `${this.name}-tags-container`
    );
    let searchResultsListElements = this.getDropdownMenuList(list);
    const listElements = this.selectedListElement?.querySelectorAll("li");
    if (this.listContainer) {
      this.listContainer.innerHTML = "";
    }
    listElements.forEach((el) => {
      searchResultsListElements = searchResultsListElements.filter(
        (e) => e !== el.textContent.toLowerCase().trim()
      );
    });

    for (let i = 0; i < searchResultsListElements.length; i++) {
      const listElement = document.createElement("li");
      listElement.textContent = ucFirst(searchResultsListElements[i]);
      listElement.addEventListener("click", () => {
        this.callbackOnSelect(searchResultsListElements[i]);
        this.searchInput.value = "";
        const elementTag = new Tag(searchResultsListElements[i], () =>
          this.callbackOnSelect(searchResultsListElements[i])
        );
        const tag = elementTag.createTag();
        tagsContainer.appendChild(tag);
      });
      this.listContainer.appendChild(listElement);
    }
  }

  /**
   * @description remove class to display dropdown menu content
   * @param {HTMLElement} dropdownMenu
   */
  displayDropdownMenu(dropdownMenu) {
    dropdownMenu.classList.remove("dropdown-menu-search-container-hidden");
  }

  /**
   * @description add class to hide dropdown menu content
   * @param {HTMLElement} dropdownMenu
   */
  hideDropdownMenu(dropdownMenu) {
    dropdownMenu.classList.add("dropdown-menu-search-container-hidden");
  }

  /**
   * @description handle dropdown menu opening
   * @param {HTMLElement} dropdownMenu
   */
  handleDropdownMenuVisibility(dropdownMenu) {
    const dropdownMenuClassList = Array.from(dropdownMenu.classList);
    if (
      dropdownMenuClassList.includes("dropdown-menu-search-container-hidden")
    ) {
      this.displayDropdownMenu(dropdownMenu);
    } else {
      this.hideDropdownMenu(dropdownMenu);
    }
  }

  /**
   * @description handle if we create or display the dropdown menu
   */
  handleDropdownMenu() {
    const dropdownMenu = document.getElementById(
      `${this.name}-results-container`
    );
    const resultsList = document.getElementById(`${this.name}-results`);
    if (!resultsList) {
      this.createBaseDropdownMenu();
    } else {
      this.handleDropdownMenuVisibility(dropdownMenu);
    }
  }

  /**
   * @description get the displayed list in the dropdown menu
   * @param {Object} list array of recipes
   * @returns {Object} displayed list in the dropdown menu
   */
  getDropdownMenuList(recipesList) {
    let list = [];

    for (let i = 0; i < recipesList.length; i++) {
      if (this.name === "ingredients") {
        for (let j = 0; j < recipesList[i].ingredients.length; j++) {
          const recipeIngredient = recipesList[i].ingredients[j].ingredient
            .toLowerCase()
            .trim();
          list.push(recipeIngredient);
        }
      } else if (this.name === "ustensils") {
        for (let j = 0; j < recipesList[i].ustensils.length; j++) {
          const recipeUstensils = recipesList[i].ustensils[j]
            .toLowerCase()
            .trim();
          list.push(recipeUstensils);
        }
      } else {
        list.push(recipesList[i].appliance.toLowerCase().trim());
      }
    }

    list = removeDuplicates(list);
    return list;
  }

  /**
   * @description add selected element of selected list and add the selected element class
   * @param {Object} selectedElements array of selected dropdown menu items
   */
  addSelectedElement(selectedElements) {
    this.selectedListElement.innerHTML = ``;
    selectedElements.forEach((el) => {
      const listElement = document.createElement("li");
      const listElementText = document.createElement("span");
      const removeSelectedElementButton = document.createElement("button");
      const removeSelectedElementIcon = document.createElement("img");
      listElement.classList.add("dropdown-menu-item-selected");

      removeSelectedElementButton.setAttribute(
        "aria-label",
        "Supprimer le filtre"
      );
      removeSelectedElementButton.setAttribute("type", "button");
      removeSelectedElementIcon.setAttribute(
        "src",
        "/assets/svg/close-filled-icon.svg"
      );
      removeSelectedElementIcon.setAttribute("alt", "");
      removeSelectedElementButton.classList.add(
        "dropdown-menu-item-remove-button"
      );

      listElementText.textContent = ucFirst(el);
      removeSelectedElementButton.appendChild(removeSelectedElementIcon);
      listElement.appendChild(listElementText);
      listElement.appendChild(removeSelectedElementButton);
      this.selectedListElement.appendChild(listElement);

      listElement.addEventListener("click", () => {
        this.callbackOnSelect(el);
      });
    });
  }
  /**
   * @description clear dropdown content then create a new list
   * @param {Object} list array of recipes
   */
  updateDropdownMenuList(list) {
    this.listContainer.innerHTML = ``;
    this.createDropdownMenuList(list);
  }

  handleDropdownSearch(inputValue) {
    this.listContainer.childNodes.forEach((element) => {
      if (!element.textContent.toLowerCase().includes(inputValue)) {
        element.style.display = "none";
      } else {
        element.style.display = "flex";
      }
    });
  }
}
