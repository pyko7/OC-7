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
  displayRecipesNumber(recipesList);
};

/**
 * @description display default recipes
 */
const init = () => {
  displayRecipes(recipes);
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
  const recipesList = handleRecipesList();
  recipesList.forEach((recipe) => {
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

const handleSelectedIngredients = (ingredient) => {
  const ingredientsList = document.getElementById("ingredients-list");
  const selectedIngredientsList = document.getElementById(
    "ingredients-list-selected"
  );
  let isIngredientSelected = false;
  selectedIngredientsList.childNodes.forEach((selectedIngredient) => {
    if (selectedIngredient.textContent === ingredient.textContent) {
      isIngredientSelected = true;
    }
  });
  if (isIngredientSelected) {
    ingredient.classList.remove("dropdown-menu-item-selected");
    selectedIngredientsList.removeChild(ingredient);
    ingredientsList.insertBefore(ingredient, ingredientsList.firstChild);
    selectedIngredients = selectedIngredients.filter(
      (selectedIngredient) =>
        selectedIngredient.textContent === ingredient.textContent
    );
    return;
  }
  ingredient.classList.add("dropdown-menu-item-selected");
  selectedIngredients.push(ingredient.textContent);
  ingredientsList.removeChild(ingredient);
  selectedIngredientsList.appendChild(ingredient);
};

const handleSelectedUstensils = (ustensil) => {
  const ustensilsList = document.getElementById("ustensils-list");
  const selectedUstensilsList = document.getElementById(
    "ustensils-list-selected"
  );
  let isUstensilsList = false;
  selectedUstensilsList.childNodes.forEach((selectedUstensil) => {
    if (selectedUstensil.textContent === ustensil.textContent) {
      isUstensilsList = true;
    }
  });
  if (isUstensilsList) {
    ustensil.classList.remove("dropdown-menu-item-selected");
    selectedUstensilsList.removeChild(ustensil);
    ustensilsList.insertBefore(ustensil, ustensilsList.firstChild);
    selectedUstensils = selectedUstensils.filter(
      (selectedUstensil) =>
        selectedUstensil.textContent === ustensil.textContent
    );
    return;
  }
  ustensil.classList.add("dropdown-menu-item-selected");
  selectedUstensils.push(ustensil.textContent);
  ustensilsList.removeChild(ustensil);
  selectedUstensilsList.appendChild(ustensil);
};
const handleSelectedAppliances = (appliance) => {
  const appliancesList = document.getElementById("appliance-list");
  const selectedAppliancesList = document.getElementById(
    "appliance-list-selected"
  );
  let isApplianceList = false;
  selectedAppliancesList.childNodes.forEach((selectedApplianceList) => {
    if (selectedApplianceList.textContent === appliance.textContent) {
      isApplianceList = true;
    }
  });
  if (isApplianceList) {
    appliance.classList.remove("dropdown-menu-item-selected");
    selectedAppliancesList.removeChild(appliance);
    appliancesList.insertBefore(appliance, appliancesList.firstChild);
    selectedAppliances = selectedAppliances.filter(
      (selectedAppliance) =>
        selectedAppliance.textContent === appliance.textContent
    );
    return;
  }
  appliance.classList.add("dropdown-menu-item-selected");
  selectedAppliances.push(appliance.textContent);
  appliancesList.removeChild(appliance);
  selectedAppliancesList.appendChild(appliance);
};

const handleDisplayedRecipesByIngredients = (ingredient) => {
  handleSelectedIngredients(ingredient);
  let filteredRecipes = filteredRecipesByDropdown(
    selectedIngredients,
    selectedUstensils,
    selectedAppliances
  );
  displayRecipes(filteredRecipes);
};
const handleDisplayedRecipesByUstensils = (ingredient) => {
  handleSelectedUstensils(ingredient);
  let filteredRecipes = filteredRecipesByDropdown(
    selectedIngredients,
    selectedUstensils,
    selectedAppliances
  );
  displayRecipes(filteredRecipes);
};
const handleDisplayedRecipesByAppliances = (appliance) => {
  handleSelectedAppliances(appliance);
  let filteredRecipes = filteredRecipesByDropdown(
    selectedIngredients,
    selectedUstensils,
    selectedAppliances
  );
  displayRecipes(filteredRecipes);
};

/**
 * @description filter recipes by ingredients and display them
 *
 */
const filterRecipesByIngredients = () => {
  const ingredientsList = document.getElementById("ingredients-list");
  const selectedIngredientsList = document.getElementById(
    "ingredients-list-selected"
  );

  selectedIngredientsList.childNodes.forEach((ingredient) => {
    ingredient.addEventListener("click", () =>
      handleDisplayedRecipesByIngredients(ingredient)
    );
  });

  ingredientsList.childNodes.forEach((ingredient) => {
    ingredient.addEventListener("click", () =>
      handleDisplayedRecipesByIngredients(ingredient)
    );
  });
};

/**
 * @description filter recipes by appliances and display them
 *
 */
const filterRecipesByAppliances = () => {
  const appliancesList = document.getElementById("appliance-list");
  const selectedAppliancesList = document.getElementById(
    "appliance-list-selected"
  );

  selectedAppliancesList.childNodes.forEach((appliance) => {
    appliance.addEventListener("click", () =>
      handleDisplayedRecipesByAppliances(appliance)
    );
  });

  appliancesList.childNodes.forEach((appliance) => {
    appliance.addEventListener("click", () =>
      handleDisplayedRecipesByAppliances(appliance)
    );
  });
};

/**
 * @description filter recipes by ustensils and display them
 *
 */
const filterRecipesByUstensils = () => {
  const ustensilsList = document.getElementById("ustensils-list");
  const selectedUstensilsList = document.getElementById(
    "ustensils-list-selected"
  );

  selectedUstensilsList.childNodes.forEach((ustensil) => {
    ustensil.addEventListener("click", () =>
      handleDisplayedRecipesByUstensils(ustensil)
    );
  });

  ustensilsList.childNodes.forEach((ustensil) => {
    ustensil.addEventListener("click", () =>
      handleDisplayedRecipesByUstensils(ustensil)
    );
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
  const recipesList = handleRecipesList();
  const dropdownMenu = new DropdownMenu(
    recipesList,
    ingredientsDropdownMenuContainer,
    "ingredients"
  );
  dropdownMenu.handleDropdownMenu();
  filterRecipesByIngredients();
});

appliancesDropdownToggleButton.addEventListener("click", (e) => {
  const recipesList = handleRecipesList();
  const dropdownMenu = new DropdownMenu(
    recipesList,
    applianceDropdownMenuContainer,
    "appliance"
  );
  dropdownMenu.handleDropdownMenu();
  filterRecipesByAppliances();
});

ustensilsDropdownToggleButton.addEventListener("click", (e) => {
  const recipesList = handleRecipesList();
  const dropdownMenu = new DropdownMenu(
    recipesList,
    ustensilsDropdownMenuContainer,
    "ustensils"
  );
  dropdownMenu.handleDropdownMenu();
  filterRecipesByUstensils();
});

init();

//CSS SELECTED ELEMENTS + CREATE BASE SELECTED ELEMENTS
//REMOVE FILTER + UPDATE LIST
//REMOVE DUPLICATA WHEN NO SEARCHS
