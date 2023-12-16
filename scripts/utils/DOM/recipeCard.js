/**
 *
 * @param {Object[]} recipes Array of recipes
 */
export const createBaseCard = (recipes) => {
  const card = document.querySelector(".cards-container");
  recipes.forEach((recipe) => {
    card.innerHTML += `
        <div class="recipe-card" id=${recipe.id}>
            <span class="recipe-time">${recipe.time}min</span>
            <img src='../../../assets/recipes/${recipe.image}' alt=${recipe.name}/>
            <div class="recipe">
                <span class="recipe-title">${recipe.name}</span>
                <div class="recipe-content">
                    <span class="recipe-subtitle">recette</span>
                <p class="recipe-description">${recipe.description}</p>
            </div>
                <div class="recipe-content">
                    <span class="recipe-subtitle" id="recipe-subtitle-ingredients">ingrédients</span>
                    <div class="recipe-ingredients">
                    </div>
                </div>
        </div>
        `;
  });
};

/**
 *
 * @param {Object[]} recipes Array of recipes
 * @param {number} id ID of the recipe
 */
export const setRecipeIngredients = (recipes, id) => {
  const [recipe] = recipes.filter((el) => el.id === id);
  const recipeCard = document.getElementById(id);
  const ingredientsSection = recipeCard.querySelector(".recipe-ingredients");

  recipe.ingredients.forEach((ingredient) => {
    ingredientsSection.innerHTML += `
            <div>
              <span class="recipe-ingredient-name">${
                ingredient.ingredient
              }</span>
              <span class="recipe-ingredient-quantity">${
                ingredient.quantity ?? ""
              }${ingredient.unit ?? ""}</span>
            </div>
            `;
  });
};
