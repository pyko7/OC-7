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

const handleRecipesList = () => {
  return filteredRecipes.length > 0 ? filteredRecipes : recipeClasses;
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
 * @param {Object} selectedIngredients array of selected ingredients
 * @param {Object} selectedUstensils array of selected ustensils
 * @param {Object} selectedAppliances array of selected appliances
 * @returns {Object} array of corresponding recipes
 */
const filteredRecipesByDropdown = (
  selectedIngredients,
  selectedUstensils,
  selectedAppliances
) => {
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
  return recipesFilteredByDropdown;
};

/**
 * @description handle selected ingredients and display the list of selected/not selected ingredients
 * @param {HTMLLIElement} ingredient DOM element clicked by the user
 */
const handleDisplayedRecipesByIngredients = (ingredient) => {
  const ingredientsList = document.getElementById("ingredients-list");
  const selectedIngredientsList = document.getElementById(
    "ingredients-list-selected"
  );
  selectedIngredients = DropdownMenu.handleSelectedElement(
    ingredientsList,
    selectedIngredientsList,
    selectedIngredients,
    ingredient
  );
  filteredRecipes = filteredRecipesByDropdown(
    selectedIngredients,
    selectedUstensils,
    selectedAppliances
  );
  displayRecipes(filteredRecipes);
};

/**
 * @description handle selected ustensils and display the list of selected/not selected ustensils
 * @param {HTMLLIElement} ustensil DOM element clicked by the user
 */
const handleDisplayedRecipesByUstensils = (ustensil) => {
  const ustensilsList = document.getElementById("ustensils-list");
  const selectedUstensilsList = document.getElementById(
    "ustensils-list-selected"
  );
  selectedUstensils = DropdownMenu.handleSelectedElement(
    ustensilsList,
    selectedUstensilsList,
    selectedUstensils,
    ustensil
  );
  filteredRecipes = filteredRecipesByDropdown(
    selectedIngredients,
    selectedUstensils,
    selectedAppliances
  );
  displayRecipes(filteredRecipes);
};

/**
 * @description handle selected appliances and display the list of selected/not selected appliances
 * @param {HTMLLIElement} appliance DOM element clicked by the user
 */
const handleDisplayedRecipesByAppliances = (appliance) => {
  const appliancesList = document.getElementById("appliance-list");
  const selectedAppliancesList = document.getElementById(
    "appliance-list-selected"
  );
  selectedAppliances = DropdownMenu.handleSelectedElement(
    appliancesList,
    selectedAppliancesList,
    selectedAppliances,
    appliance
  );
  filteredRecipes = filteredRecipesByDropdown(
    selectedIngredients,
    selectedUstensils,
    selectedAppliances
  );
  displayRecipes(filteredRecipes);
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

  if (ingredientsList && ingredientsListContainer) {
    const selectedIngredientsList = document.getElementById(
      "ingredients-list-selected"
    );
    ingredientsDropdownMenu.createDropdownMenuList(
      filteredRecipes,
      ingredientsList,
      ingredientsListContainer,
      selectedIngredientsList
    );
    filterRecipesByIngredients();
  }
  if (appliancesList && appliancesListContainer) {
    const selectedAppliancesList = document.getElementById(
      "appliance-list-selected"
    );
    appliancesDropdownMenu.createDropdownMenuList(
      filteredRecipes,
      appliancesList,
      appliancesListContainer,
      selectedAppliancesList
    );
    filterRecipesByAppliances();
  }
  if (ustensilsList && ustensilsListContainer) {
    const selectedUstensilsList = document.getElementById(
      "ustensils-list-selected"
    );

    ustensilsDropdownMenu.createDropdownMenuList(
      filteredRecipes,
      ustensilsList,
      ustensilsListContainer,
      selectedUstensilsList
    );
    filterRecipesByUstensils();
  }
};

/**
 * @description filter recipes by ingredients and display them
 *
 */
const filterRecipesByIngredients = () => {
  const ingredientsList = document.getElementById("ingredients-list");

  ingredientsList.childNodes.forEach((ingredient) => {
    ingredient.addEventListener("click", () => {
      handleDisplayedRecipesByIngredients(ingredient);
      handleDropdownListUpdates();
    });
  });
};

/**
 * @description filter recipes by appliances and display them
 *
 */
const filterRecipesByAppliances = () => {
  const appliancesList = document.getElementById("appliance-list");

  appliancesList.childNodes.forEach((appliance) => {
    appliance.addEventListener("click", () => {
      handleDisplayedRecipesByAppliances(appliance);
      handleDropdownListUpdates();
    });
  });
};

/**
 * @description filter recipes by ustensils and display them
 *
 */
const filterRecipesByUstensils = () => {
  const ustensilsList = document.getElementById("ustensils-list");

  ustensilsList.childNodes.forEach((ustensil) => {
    ustensil.addEventListener("click", (e) => {
      handleDisplayedRecipesByUstensils(ustensil);
      handleDropdownListUpdates();
    });
  });
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
  handleMainSearch();
  displayRecipesNumber(filteredRecipes);
  DropdownMenu.removeDropdownMenuList();
});

ingredientsDropdownToggleButton.addEventListener("click", (e) => {
  const recipesList = handleRecipesList();
  if (!ingredientsDropdownMenu) {
    ingredientsDropdownMenu = new DropdownMenu(
      recipesList,
      ingredientsDropdownMenuContainer,
      "ingredients"
    );
  }
  ingredientsDropdownMenu.handleDropdownMenu();
  filterRecipesByIngredients();
});

appliancesDropdownToggleButton.addEventListener("click", (e) => {
  const recipesList = handleRecipesList();
  if (!appliancesDropdownMenu) {
    appliancesDropdownMenu = new DropdownMenu(
      recipesList,
      applianceDropdownMenuContainer,
      "appliance"
    );
  }

  appliancesDropdownMenu.handleDropdownMenu();
  filterRecipesByAppliances();
});

ustensilsDropdownToggleButton.addEventListener("click", (e) => {
  const recipesList = handleRecipesList();
  if (!ustensilsDropdownMenu) {
    ustensilsDropdownMenu = new DropdownMenu(
      recipesList,
      ustensilsDropdownMenuContainer,
      "ustensils"
    );
  }
  ustensilsDropdownMenu.handleDropdownMenu();
  filterRecipesByUstensils();
});

init();

//click 2 fois toggle menu --> bug
