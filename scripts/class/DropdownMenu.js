export default class DropdownMenu {
  constructor(container, name) {
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

    searchContainer.classList.add("dropdown-menu-search-container");
    searchInputContainer.classList.add("dropdown-menu-search");
    searchButton.classList.add("search-btn");
    searchResultsContainer.classList.add("dropdown-menu-results");

    searchContainer.setAttribute("id", `${this.name}-results`);
    searchButton.setAttribute("aria-label", "Rechercher");
    searchButton.setAttribute("type", "button");
    searchButtonIcon.setAttribute("src", "/assets/svg/search-icon-grey.svg");
    searchButtonIcon.setAttribute("aria-hidden", true);

    searchContainer.appendChild(searchInputContainer);
    searchInputContainer.appendChild(searchInput);
    searchInputContainer.appendChild(searchButton);
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
}
