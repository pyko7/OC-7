import { removeDuplicates, ucFirst } from "../utils/utils.js";

export default class DropdownMenu {
  constructor(recipes, container, name) {
    this.recipes = recipes;
    this.container = container;
    this.name = name;
  }
  createBaseDropdownMenu() {
    const searchContainer = document.createElement("div");
    const searchInputContainer = document.createElement("div");
    const searchInput = document.createElement("input");
    const searchButton = document.createElement("button");
    const searchButtonIcon = document.createElement("img");
    const searchResultsContainer = document.createElement("div");
    const searchResultsList = document.createElement("ul");

    searchContainer.classList.add("dropdown-menu-search-container");
    searchInputContainer.classList.add("dropdown-menu-search");
    searchButton.classList.add("search-btn");
    searchResultsContainer.classList.add("dropdown-menu-results");

    searchContainer.setAttribute("id", `${this.name}-results`);
    searchButton.setAttribute("aria-label", "Rechercher");
    searchButton.setAttribute("type", "button");
    searchButtonIcon.setAttribute("src", "/assets/svg/search-icon-grey.svg");
    searchButtonIcon.setAttribute("aria-hidden", true);

    const searchResultsListElements = this.getDropdownMenuList();

    searchResultsListElements.forEach((element) => {
      const listElement = document.createElement("li");
      listElement.textContent = ucFirst(element);
      searchResultsList.appendChild(listElement);
    });

    searchContainer.appendChild(searchInputContainer);
    searchContainer.appendChild(searchResultsContainer);
    searchInputContainer.appendChild(searchInput);
    searchInputContainer.appendChild(searchButton);
    searchResultsContainer.appendChild(searchResultsList);
    searchButton.appendChild(searchButtonIcon);
    this.container.appendChild(searchContainer);
  }

  displayDropdownMenu() {
    const dropdownMenu = document.getElementById(`${this.name}-results`);
    dropdownMenu.classList.remove("dropdown-menu-search-container-hidden");
  }
  hideDropdownMenu() {
    const dropdownMenu = document.getElementById(`${this.name}-results`);
    dropdownMenu.classList.add("dropdown-menu-search-container-hidden");
  }

  handleDropdownMenuVisibility(dropdownMenuResults) {
    const dropdownMenuClassList = Array.from(dropdownMenuResults.classList);
    if (
      dropdownMenuClassList.includes("dropdown-menu-search-container-hidden")
    ) {
      this.displayDropdownMenu();
    } else {
      this.hideDropdownMenu();
    }
  }

  handleDropdownMenu() {
    const ingredientsResults = document.getElementById(`${this.name}-results`);
    if (!ingredientsResults) {
      this.createBaseDropdownMenu();
    } else {
      this.handleDropdownMenuVisibility(ingredientsResults);
    }
  }

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
}
