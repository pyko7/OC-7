import { recipes } from "./utils/recipes.js";
import {
  createBaseCard,
  setRecipeIngredients,
} from "./utils/DOM/recipeCard.js";

const init = () => {
  createBaseCard(recipes);
  recipes.forEach((recipe) => {
    setRecipeIngredients(recipes, recipe.id);
  });
};
init();
