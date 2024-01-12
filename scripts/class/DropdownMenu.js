import { removeDuplicates, ucFirst } from "../utils/utils.js";

/**
 * @description Class representing a dropdown menu
 */
export default class DropdownMenu {
  /**
   *
   * @param {Object} recipes array of recipes
   * @param {HTMLElement} container dropdown menu container
   * @param {string} name title of dropdown menu
   */
  constructor(recipes, container, name) {
    this.recipes = recipes;
    this.container = container;
    this.name = name;
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

    const searchResultsListElements = this.getDropdownMenuList();

    searchResultsListElements.forEach((element) => {
      const listElementContainer = document.createElement("li");
      const listElement = document.createElement("span");
      const removeElementButton = document.createElement("button");
      const removeElementIcon = document.createElement("img");
      removeElementButton.setAttribute("aria-label", "Supprimer le filtre");
      removeElementButton.setAttribute("type", "button");
      removeElementIcon.setAttribute(
        "src",
        "/assets/svg/close-filled-icon.svg"
      );
      removeElementIcon.setAttribute("alt", "");
      removeElementButton.classList.add(
        "dropdown-menu-item-remove-button-hidden"
      );

      listElement.textContent = ucFirst(element);
      removeElementButton.appendChild(removeElementIcon);
      listElementContainer.appendChild(listElement);
      listElementContainer.appendChild(removeElementButton);
      searchResultsList.appendChild(listElementContainer);
    });

    searchResultsContainer.appendChild(searchResults);
    searchInputContainer.appendChild(searchInput);
    searchInputContainer.appendChild(searchButton);
    searchResults.appendChild(searchInputContainer);
    searchResults.appendChild(selectedListElement);
    searchResults.appendChild(searchResultsList);
    searchButton.appendChild(searchButtonIcon);
    this.container.appendChild(searchResultsContainer);
  }

  // updateDropdownMenuList() {
  //   const resultsList = document.getElementById(`${this.name}-list`);
  //   const resultsListContainer = document.getElementById(
  //     `${this.name}-results`
  //   );

  //   const searchResultsListElements = this.getDropdownMenuList();
  //   resultsList.innerHTML = "";

  //   searchResultsListElements.forEach((element) => {
  //     const listElementContainer = document.createElement("li");
  //     const listElement = document.createElement("span");
  //     const removeElementButton = document.createElement("button");
  //     const removeElementIcon = document.createElement("img");
  //     removeElementButton.setAttribute("aria-label", "Supprimer le filtre");
  //     removeElementButton.setAttribute("type", "button");
  //     removeElementIcon.setAttribute(
  //       "src",
  //       "/assets/svg/close-filled-icon.svg"
  //     );
  //     removeElementIcon.setAttribute("alt", "");
  //     removeElementButton.classList.add(
  //       "dropdown-menu-item-remove-button-hidden"
  //     );

  //     listElement.textContent = ucFirst(element);
  //     removeElementButton.appendChild(removeElementIcon);
  //     listElementContainer.appendChild(listElement);
  //     listElementContainer.appendChild(removeElementButton);
  //     resultsList.appendChild(listElementContainer);
  //   });
  //   resultsListContainer.appendChild(resultsList);
  // }

  displayDropdownMenu(dropdownMenu) {
    dropdownMenu.classList.remove("dropdown-menu-search-container-hidden");
  }
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
      // this.updateDropdownMenuList(resultsList);
      this.handleDropdownMenuVisibility(dropdownMenu);
    }
  }

  /**
   * @description get the displayed list in the dropdown menu
   * @returns {Object} displayed list in the dropdown menu
   */
  getDropdownMenuList() {
    let list = [];
    this.recipes.forEach((recipe) => {
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
        list.push(recipe.appliance);
      }
    });
    list = removeDuplicates(list);
    return list;
  }

  /**
   * @description remove all results lists in dropdown menus
   */
  static removeDropdownMenuList() {
    const dropdownMenus = document.querySelectorAll(
      ".dropdown-menu-search-container"
    );
    dropdownMenus.forEach((menu) => menu.remove());
  }
}
