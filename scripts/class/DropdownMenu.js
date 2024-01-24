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

    this.createDropdownMenuList(
      this.recipes,
      searchResultsList,
      searchResultsContainer
    );

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
   * @param {HTMLUListElement} resultsList DOM Element containing recipes
   * @param {HTMLDivElement} resultsListContainer DOM Element containing the recipes list
   * @param {HTMLUListElement} selectedList DOM Element of selected items
   */
  createDropdownMenuList(
    list,
    resultsList,
    resultsListContainer,
    selectedList
  ) {
    const searchResultsListElements = this.getDropdownMenuList(list);
    if (resultsList) {
      resultsList.innerHTML = "";
    }

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
      resultsList.appendChild(listElementContainer);
      selectedList?.childNodes.forEach((children) => {
        if (children.textContent.toLowerCase().trim() === element) {
          resultsList.removeChild(listElementContainer);
        }
      });
    });
    resultsListContainer.appendChild(resultsList);
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
   * @param {HTMLUListElement} elementsList DOM ELement reprensenting a list of elements
   * @param {HTMLUListElement} selectedElementsList  DOM ELement reprensenting a list of selected elements
   * @param {Object} selectedElements array of selected dropdown menu items
   * @param {HTMLLIElement} element DOM element clicked by the user
   * @returns {Object} updated array of selected dropdown menu items
   */
  static addSelectedElement(
    elementsList,
    selectedElementsList,
    selectedElements,
    element
  ) {
    let removeSelectedElementButton = undefined;

    element.childNodes.forEach((node) => {
      if (node.nodeName === "BUTTON") {
        removeSelectedElementButton = node;
      }
    });

    removeSelectedElementButton.classList.add(
      "dropdown-menu-item-remove-button"
    );
    removeSelectedElementButton.classList.remove(
      "dropdown-menu-item-remove-button-hidden"
    );
    element.classList.add("dropdown-menu-item-selected");
    selectedElements.push(element.textContent);
    elementsList.removeChild(element);
    selectedElementsList.appendChild(element);
    return selectedElements;
  }

  /**
   * @description remove selected element of selected list and remove the selected element class
   * @param {HTMLUListElement} elementsList DOM ELement reprensenting a list of elements
   * @param {HTMLUListElement} selectedElementsList  DOM ELement reprensenting a list of selected elements
   * @param {Object} selectedElements array of selected dropdown menu items
   * @param {HTMLLIElement} element DOM element clicked by the user
   * @returns {Object} updated array of selected dropdown menu items
   */
  static removeSelectedElement(
    elementsList,
    selectedElementsList,
    selectedElements,
    element
  ) {
    let removeSelectedElementButton = undefined;

    element.childNodes.forEach((node) => {
      if (node.nodeName === "BUTTON") {
        removeSelectedElementButton = node;
      }
    });

    removeSelectedElementButton.classList.remove(
      "dropdown-menu-item-remove-button"
    );
    removeSelectedElementButton.classList.add(
      "dropdown-menu-item-remove-button-hidden"
    );
    element.classList.remove("dropdown-menu-item-selected");
    selectedElementsList.removeChild(element);
    elementsList.insertBefore(element, elementsList.firstChild);
    selectedElements = selectedElements.filter(
      (selectedElement) => selectedElement.textContent === element.textContent
    );
    return selectedElements;
  }

  /**
   * @description handle the selection of clicked element in a dropdown menu
   * @param {HTMLUListElement} elementsList DOM ELement reprensenting a list of elements
   * @param {HTMLUListElement} selectedElementsList  DOM ELement reprensenting a list of selected elements
   * @param {Object} selectedElements array of selected dropdown menu items
   * @param {HTMLLIElement} element DOM element clicked by the user
   * @returns {Object} updated array of selected dropdown menu items
   */
  static handleSelectedElement(
    elementsList,
    selectedElementsList,
    selectedElements,
    element
  ) {
    let removeSelectedElementButton = undefined;
    let isElementSelected = false;

    element.childNodes.forEach((node) => {
      if (node.nodeName === "BUTTON") {
        removeSelectedElementButton = node;
      }
    });

    selectedElementsList.childNodes.forEach((selectedElement) => {
      if (selectedElement.textContent === element.textContent) {
        isElementSelected = true;
      }
    });

    if (isElementSelected) {
      selectedElements = DropdownMenu.removeSelectedElement(
        elementsList,
        selectedElementsList,
        selectedElements,
        element
      );
    } else {
      selectedElements = DropdownMenu.addSelectedElement(
        elementsList,
        selectedElementsList,
        selectedElements,
        element
      );
    }
    return selectedElements;
  }
}
