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

const recipeClasses = [];
let filteredRecipes = recipes;

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
    recipeClass.createBaseCard();
  });
  displayRecipesNumber(recipes);
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
 * @description create a recipe instance to create new HTML Elements for the search results
 *
 */
const handleMainSearch = () => {
  if (searchInput.value.length < 3 && searchInput.value.length !== 0) {
    return;
  } else {
    filteredRecipes = searchRecipes(searchInput.value);
    recipeCardsContainer.innerHTML = "";
    filteredRecipes.forEach((filteredRecipe) => {
      filteredRecipe.createBaseCard();
    });
  }
};

searchBtn.addEventListener("click", (e) => {
  handleMainSearch();
  displayRecipesNumber(filteredRecipes);
  DropdownMenu.removeDropdownMenuList();
});

ingredientsDropdownMenuContainer.addEventListener("click", (e) => {
  const dropdownMenu = new DropdownMenu(
    filteredRecipes,
    ingredientsDropdownMenuContainer,
    "ingredients"
  );
  dropdownMenu.handleDropdownMenu();
});

applianceDropdownMenuContainer.addEventListener("click", (e) => {
  const dropdownMenu = new DropdownMenu(
    filteredRecipes,
    applianceDropdownMenuContainer,
    "appliance"
  );

  dropdownMenu.handleDropdownMenu();
});

ustensilsDropdownMenuContainer.addEventListener("click", (e) => {
  const dropdownMenu = new DropdownMenu(
    filteredRecipes,
    ustensilsDropdownMenuContainer,
    "ustensils"
  );

  dropdownMenu.handleDropdownMenu();
});

init();
