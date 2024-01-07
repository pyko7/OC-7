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

const recipesFilteredByIngredients = (selectedIngredients) => {
  let recipesFilteredByDropdown = [];
  filteredRecipes.forEach((filteredRecipe) => {
    if (filteredRecipe.hasAllIngredients(selectedIngredients)) {
      recipesFilteredByDropdown.push(filteredRecipe);
    }
  });

  return recipesFilteredByDropdown;
};
const recipesFilteredByUstensils = (selectedUstensils) => {
  let recipesFilteredByDropdown = [];
  filteredRecipes.forEach((filteredRecipe) => {
    if (filteredRecipe.hasAllUstensils(selectedUstensils)) {
      recipesFilteredByDropdown.push(filteredRecipe);
    }
  });

  return recipesFilteredByDropdown;
};
const recipesFilteredByAppliances = (selectedAppliances) => {
  let recipesFilteredByDropdown = [];
  filteredRecipes.forEach((filteredRecipe) => {
    if (filteredRecipe.hasAppliance(selectedAppliances)) {
      recipesFilteredByDropdown.push(filteredRecipe);
    }
  });

  return recipesFilteredByDropdown;
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

ingredientsDropdownToggleButton.addEventListener("click", (e) => {
  const dropdownMenu = new DropdownMenu(
    filteredRecipes,
    ingredientsDropdownMenuContainer,
    "ingredients"
  );

  dropdownMenu.handleDropdownMenu();

  const ingredientsList = document.getElementById("ingredients-list");
  ingredientsList.childNodes.forEach((ingredient) => {
    ingredient.addEventListener("click", (e) => {
      let selectedIngredients = [];
      selectedIngredients.push(ingredient.textContent);
      let recipesByIngredients =
        recipesFilteredByIngredients(selectedIngredients);
      recipeCardsContainer.innerHTML = "";

      recipesByIngredients.forEach((recipe) => {
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
      displayRecipesNumber(recipesByIngredients);
    });
  });
});

appliancesDropdownToggleButton.addEventListener("click", (e) => {
  const dropdownMenu = new DropdownMenu(
    filteredRecipes,
    applianceDropdownMenuContainer,
    "appliance"
  );
  dropdownMenu.handleDropdownMenu();

  const appliancesList = document.getElementById("appliance-list");
  appliancesList.childNodes.forEach((appliance) => {
    appliance.addEventListener("click", (e) => {
      let selectedAppliances = [];
      selectedAppliances.push(appliance.textContent);
      let recipesByAppliances = recipesFilteredByAppliances(selectedAppliances);
      recipeCardsContainer.innerHTML = "";

      recipesByAppliances.forEach((recipe) => {
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
      displayRecipesNumber(recipesByAppliances);
    });
  });
});

ustensilsDropdownToggleButton.addEventListener("click", (e) => {
  const dropdownMenu = new DropdownMenu(
    filteredRecipes,
    ustensilsDropdownMenuContainer,
    "ustensils"
  );
  dropdownMenu.handleDropdownMenu();

  const ustensilsList = document.getElementById("ustensils-list");
  ustensilsList.childNodes.forEach((ustensil) => {
    ustensil.addEventListener("click", (e) => {
      let selectedUstensils = [];
      selectedUstensils.push(ustensil.textContent);
      let recipesByUstensils = recipesFilteredByUstensils(selectedUstensils);
      recipeCardsContainer.innerHTML = "";

      recipesByUstensils.forEach((recipe) => {
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
      displayRecipesNumber(recipesByUstensils);
    });
  });
});

init();
