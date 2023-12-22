export default class Recipe {
  constructor(
    id,
    image,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils
  ) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
  }

  createBaseCard() {
    const card = document.querySelector(".cards-container");
    const recipeCard = document.createElement("div");
    const recipeContent = document.createElement("div");
    const recipeIngredients = document.createElement("div");

    recipeCard.classList.add("recipe-card");
    recipeContent.classList.add("recipe-content");
    recipeIngredients.classList.add("recipe-ingredients");
    recipeCard.setAttribute("id", this.id);
    recipeCard.innerHTML = `
    <span class="recipe-time">${this.time}min</span>
    <img src='../../../assets/recipes/${this.image}' alt=${this.name}/>
    <div class="recipe">
        <span class="recipe-title">${this.name}</span>
        <div class="recipe-content">
            <span class="recipe-subtitle">recette</span>
        <p class="recipe-description">${this.description}</p>
    </div>
    `;

    recipeContent.innerHTML = `<span class="recipe-subtitle" id="recipe-subtitle-ingredients">ingrédients</span>
    `;
    this.ingredients.forEach((ingredient) => {
      recipeIngredients.innerHTML += `
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
    card.appendChild(recipeCard);
    recipeCard.appendChild(recipeContent);
    recipeContent.appendChild(recipeIngredients);
  }

  titleContains(value) {
    return this.name.toLocaleLowerCase().includes(value.toLowerCase().trim());
  }
  descriptionContains(value) {
    return this.description
      .toLocaleLowerCase()
      .includes(value.toLowerCase().trim());
  }
  ingredientsContains(value) {
    let isIngredientsContained = [];
    this.ingredients.forEach((ingredient) => {
      const currentIngredientIsContained = ingredient.ingredient
        .toLocaleLowerCase()
        .includes(value.toLowerCase().trim());
      if (currentIngredientIsContained) {
        console.log(currentIngredientIsContained, ingredient.ingredient);
      }

      isIngredientsContained.push(currentIngredientIsContained);
    });
    return isIngredientsContained.includes(true);
  }
}
