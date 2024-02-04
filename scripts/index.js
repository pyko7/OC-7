import { recipes } from "./utils/recipes.js";
import Recipe from "./class/Recipe.js";
import DropdownMenu from "./class/DropdownMenu.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const recipeCardsContainer = document.getElementById("cards-container");
const ingredientsDropdownMenuContainer = document.getElementById(
  "dropdown-menu-ingredients-container"
);
const applianceDropdownMenuContainer = document.getElementById(
  "dropdown-menu-appliance-container"
);
const ustensilsDropdownMenuContainer = document.getElementById(
  "dropdown-menu-ustensils-container"
);
const ingredientsDropdownToggleButton = document.getElementById(
  "dropdown-menu-ingredients-header"
);
const ustensilsDropdownToggleButton = document.getElementById(
  "dropdown-menu-ustensils-header"
);
const appliancesDropdownToggleButton = document.getElementById(
  "dropdown-menu-appliances-header"
);

const recipeClasses = [];
let filteredRecipes = [];
let selectedIngredients = [];
let selectedAppliances = [];
let selectedUstensils = [];
let ingredientsDropdownMenu = undefined;
let ustensilsDropdownMenu = undefined;
let appliancesDropdownMenu = undefined;

const selectAnIngredient = (ingredient) => {
  if (selectedIngredients.includes(ingredient)) {
    selectedIngredients.splice(selectedIngredients.indexOf(ingredient), 1);
  } else {
    selectedIngredients.push(ingredient);
  }
  ingredientsDropdownMenu.addSelectedElement(selectedIngredients);
  filterRecipes();
  displayRecipes(filteredRecipes);
  handleDropdownListUpdates();
};

const selectAnAppliance = (appliance) => {
  if (selectedAppliances.includes(appliance)) {
    selectedAppliances.splice(selectedAppliances.indexOf(appliance), 1);
  } else {
    selectedAppliances.push(appliance);
  }
  appliancesDropdownMenu.addSelectedElement(selectedAppliances);
  filterRecipes();
  displayRecipes(filteredRecipes);
  handleDropdownListUpdates();
};

const selectAnUstensil = (ustensil) => {
  if (selectedUstensils.includes(ustensil)) {
    selectedUstensils.splice(selectedUstensils.indexOf(ustensil), 1);
  } else {
    selectedUstensils.push(ustensil);
  }
  ustensilsDropdownMenu.addSelectedElement(selectedUstensils);
  filterRecipes();
  displayRecipes(filteredRecipes);
  handleDropdownListUpdates();
};

/**
 * @description displays the number of recipes
 * @param {Object} recipesList list of recipes
 */
const displayRecipesNumber = (recipesList) => {
  const recipesNumber = document.getElementById("recipes-number");
  const isGreaterThanOne = recipesList.length > 1;
  const recipeWording = isGreaterThanOne ? "recettes" : "recette";
  const recipesValue = recipesList.length.toString().padStart(2, "0");
  recipesNumber.textContent = `${recipesValue} ${recipeWording}`;
};

/**
 * @description create DOM Elements and display them
 * @param {Object} recipesList list of recipes
 */
const displayRecipes = (recipesList) => {
  recipeCardsContainer.innerHTML = "";
  recipesList.forEach((recipe) => {
    recipe.createBaseCard();
  });
  displayRecipesNumber(recipesList);
};

/**
 * @description display default recipes
 */
const init = () => {
  recipes.forEach((recipe) => {
    const recipeClass = new Recipe(
      recipe.id,
      recipe.image,
      recipe.name,
      recipe.servings,
      recipe.ingredients,
      recipe.time,
      recipe.description,
      recipe.appliance,
      recipe.ustensils
    );
    recipeClasses.push(recipeClass);
  });
  displayRecipes(recipeClasses);
  filteredRecipes = recipeClasses;
};

/**
 *
 * @param {string} searchValue input value
 * @returns {Object} recipes containing input's value
 */
const searchRecipes = (searchValue) => {
  let results = [];
  recipeClasses.forEach((recipe) => {
    if (
      recipe.titleContains(searchValue) ||
      recipe.descriptionContains(searchValue) ||
      recipe.ingredientsContains(searchValue)
    ) {
      results.push(recipe);
    }
  });

  return results;
};

/**
 * @description filter recipes with dropdown menus
 * @returns {Object} array of corresponding recipes
 */
const filterRecipes = () => {
  let recipesFilteredByDropdown = [];
  let filteredRecipeBySearch = [];
  if (searchInput.value.length < 3 && searchInput.value.length !== 0) {
    filteredRecipeBySearch = filteredRecipes;
  } else {
    filteredRecipeBySearch = searchRecipes(searchInput.value);
  }
  filteredRecipeBySearch.forEach((recipe) => {
    if (
      recipe.hasAllIngredients(selectedIngredients) &&
      recipe.hasAllUstensils(selectedUstensils) &&
      recipe.hasAppliance(selectedAppliances)
    ) {
      recipesFilteredByDropdown.push(recipe);
    }
  });
  filteredRecipes = recipesFilteredByDropdown;
};

/**
 * @description update dropdown list content
 */
const handleDropdownListUpdates = () => {
  if (ingredientsDropdownMenu) {
    ingredientsDropdownMenu.updateDropdownMenuList(filteredRecipes);
  }
  if (appliancesDropdownMenu) {
    appliancesDropdownMenu.updateDropdownMenuList(filteredRecipes);
  }
  if (ustensilsDropdownMenu) {
    ustensilsDropdownMenu.updateDropdownMenuList(filteredRecipes);
  }
};

searchBtn.addEventListener("click", () => {
  const ingredientsDropdownList = document.getElementById(
    "ingredients-results-container"
  );
  const ustensilsDropdownList = document.getElementById(
    "ustensils-results-container"
  );
  const appliancesDropdownList = document.getElementById(
    "appliance-results-container"
  );
  filterRecipes();
  displayRecipes(filteredRecipes);
  ingredientsDropdownMenu?.hideDropdownMenu(ingredientsDropdownList);
  ustensilsDropdownMenu?.hideDropdownMenu(ustensilsDropdownList);
  appliancesDropdownMenu?.hideDropdownMenu(appliancesDropdownList);
  handleDropdownListUpdates();
});

ingredientsDropdownToggleButton.addEventListener("click", () => {
  if (!ingredientsDropdownMenu) {
    ingredientsDropdownMenu = new DropdownMenu(
      filteredRecipes,
      ingredientsDropdownMenuContainer,
      selectAnIngredient,
      "ingredients"
    );
  }
  ingredientsDropdownMenu.handleDropdownMenu();
  const ingredientsSearchInput = document.getElementById(
    "ingredients-search-input"
  );

  if (ingredientsSearchInput) {
    ingredientsSearchInput.addEventListener("input", (e) => {
      ingredientsDropdownMenu.handleDropdownSearch(e.target.value);
    });
  }
});

appliancesDropdownToggleButton.addEventListener("click", () => {
  if (!appliancesDropdownMenu) {
    appliancesDropdownMenu = new DropdownMenu(
      filteredRecipes,
      applianceDropdownMenuContainer,
      selectAnAppliance,
      "appliance"
    );
  }
  appliancesDropdownMenu.handleDropdownMenu();
  const appliancesSearchInput = document.getElementById(
    "appliance-search-input"
  );
  if (appliancesSearchInput) {
    appliancesSearchInput.addEventListener("input", (e) => {
      appliancesDropdownMenu.handleDropdownSearch(e.target.value);
    });
  }
});

ustensilsDropdownToggleButton.addEventListener("click", () => {
  if (!ustensilsDropdownMenu) {
    ustensilsDropdownMenu = new DropdownMenu(
      filteredRecipes,
      ustensilsDropdownMenuContainer,
      selectAnUstensil,
      "ustensils"
    );
  }
  ustensilsDropdownMenu.handleDropdownMenu();
  const ustensilsSearchInput = document.getElementById(
    "ustensils-search-input"
  );
  if (ustensilsSearchInput) {
    ustensilsSearchInput.addEventListener("input", (e) => {
      ustensilsDropdownMenu.handleDropdownSearch(e.target.value);
    });
  }
});

init();
