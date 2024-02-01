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

//enlever
const handleRecipesList = () => {
  return filteredRecipes;
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

const handleDropdownListUpdates = () => {
  const ingredientsList = document.getElementById("ingredients-list");
  const ingredientsListContainer = document.getElementById(
    "ingredients-results"
  );

  const appliancesList = document.getElementById("appliance-list");
  const appliancesListContainer = document.getElementById("appliance-results");
  const ustensilsList = document.getElementById("ustensils-list");
  const ustensilsListContainer = document.getElementById("ustensils-results");

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

/**
 * @description create a recipe instance to create new HTML Elements for the search results
 *
 */
const handleMainSearch = () => {
  if (searchInput.value.length < 3 && searchInput.value.length !== 0) {
    return;
  } else {
    filteredRecipes = searchRecipes(searchInput.value);
    displayRecipes(filteredRecipes);
  }
};

searchBtn.addEventListener("click", (e) => {
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

ingredientsDropdownToggleButton.addEventListener("click", (e) => {
  const recipesList = handleRecipesList();
  if (!ingredientsDropdownMenu) {
    ingredientsDropdownMenu = new DropdownMenu(
      recipesList,
      ingredientsDropdownMenuContainer,
      selectAnIngredient,
      "ingredients"
    );
  }
  ingredientsDropdownMenu.handleDropdownMenu();
});

appliancesDropdownToggleButton.addEventListener("click", (e) => {
  const recipesList = handleRecipesList();
  if (!appliancesDropdownMenu) {
    appliancesDropdownMenu = new DropdownMenu(
      recipesList,
      applianceDropdownMenuContainer,
      selectAnAppliance,
      "appliance"
    );
  }

  appliancesDropdownMenu.handleDropdownMenu();
});

ustensilsDropdownToggleButton.addEventListener("click", (e) => {
  const recipesList = handleRecipesList();
  if (!ustensilsDropdownMenu) {
    ustensilsDropdownMenu = new DropdownMenu(
      recipesList,
      ustensilsDropdownMenuContainer,
      selectAnUstensil,
      "ustensils"
    );
  }
  ustensilsDropdownMenu.handleDropdownMenu();
});

init();
