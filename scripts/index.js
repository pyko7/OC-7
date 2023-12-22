import { recipes } from "./utils/recipes.js";
import Recipe from "./class/Recipe.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const recipeCardsContainer = document.getElementById("cards-container");
const recipeClasses = [];

const displayRecipesNumber = (recipesList) => {
  const recipesNumber = document.getElementById("recipes-number");
  const recipeWording = recipesList.length > 1 ? "recettes" : "recette";
  recipesNumber.textContent = `${recipesList.length} ${recipeWording}`;
};

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

searchBtn.addEventListener("click", (e) => {
  if (searchInput.value.length < 3 && searchInput.value.length !== 0) {
    return;
  } else {
    const filteredRecipes = searchRecipes(searchInput.value);
    recipeCardsContainer.innerHTML = "";
    filteredRecipes.forEach((filteredRecipe) => {
      const recipeClass = new Recipe(
        filteredRecipe.id,
        filteredRecipe.image,
        filteredRecipe.name,
        filteredRecipe.servings,
        filteredRecipe.ingredients,
        filteredRecipe.time,
        filteredRecipe.description,
        filteredRecipe.appliance,
        filteredRecipe.ustensils
      );
      recipeClasses.push(recipeClass);
      recipeClass.createBaseCard();
    });
    displayRecipesNumber(filteredRecipes);
  }
});

init();
