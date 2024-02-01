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
    searchButton.setAttribute("aria-label", "Rechercher");
    searchButton.setAttribute("type", "button");
    searchButtonIcon.setAttribute("src", "/assets/svg/search-icon-grey.svg");
    searchButtonIcon.setAttribute("alt", "");

    this.listContainer = searchResultsList;
    this.selectedListElement = selectedListElement;

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

    searchResultsListElements.forEach((element) => {
      const listElement = document.createElement("li");
      listElement.textContent = ucFirst(element);
      listElement.addEventListener("click", () => {
        this.callbackOnSelect(element);
      });
      this.listContainer.appendChild(listElement);
    });
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
   * @returns {Object} displayed list in the dropdown menu
   */
  getDropdownMenuList(recipesList) {
    let list = [];
    recipesList.forEach((recipe) => {
      if (this.name === "ingredients") {
        recipe.ingredients.forEach((ingredient) => {
          const recipeIngredient = ingredient.ingredient.toLowerCase().trim();
          list.push(recipeIngredient);
        });
      } else if (this.name === "ustensils") {
        recipe.ustensils.forEach((ustensil) => {
          const recipeUstensils = ustensil.toLowerCase().trim();
          list.push(recipeUstensils);
        });
      } else {
        list.push(recipe.appliance.toLowerCase().trim());
      }
    });
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

  updateDropdownMenuList(list) {
    this.listContainer.innerHTML = ``;
    this.createDropdownMenuList(list);
  }
}
