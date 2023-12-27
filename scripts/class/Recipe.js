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
    const recipeTime = document.createElement("span");
    const recipeImg = document.createElement("img");
    const recipeContainer = document.createElement("div");
    const recipeTitle = document.createElement("span");
    const recipeRecipeSubtitle = document.createElement("span");
    const recipeIngredientsSubtitle = document.createElement("span");
    const recipeDescription = document.createElement("p");

    recipeCard.classList.add("recipe-card");
    recipeContent.classList.add("recipe-content");
    recipeIngredients.classList.add("recipe-ingredients");
    recipeTime.classList.add("recipe-time");
    recipeContainer.classList.add("recipe");
    recipeTitle.classList.add("recipe-title");
    recipeRecipeSubtitle.classList.add("recipe-subtitle");
    recipeIngredientsSubtitle.classList.add("recipe-subtitle");
    recipeDescription.classList.add("recipe-description");

    recipeCard.setAttribute("id", this.id);
    recipeIngredientsSubtitle.setAttribute("id", "recipe-subtitle-ingredients");
    recipeImg.setAttribute("src", `../../../assets/recipes/${this.image}`);
    recipeImg.setAttribute("alt", this.name);

    recipeTime.textContent = `${this.time}min`;
    recipeTitle.textContent = this.name;
    recipeRecipeSubtitle.textContent = "recette";
    recipeIngredientsSubtitle.textContent = "ingrédients";
    recipeDescription.textContent = this.description;

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

    recipeContent.appendChild(recipeRecipeSubtitle);
    recipeContent.appendChild(recipeDescription);
    recipeContent.appendChild(recipeIngredientsSubtitle);
    recipeContent.appendChild(recipeIngredients);
    recipeContainer.appendChild(recipeTitle);
    recipeContainer.appendChild(recipeContent);
    recipeCard.appendChild(recipeTime);
    recipeCard.appendChild(recipeImg);
    recipeCard.appendChild(recipeContainer);
    card.appendChild(recipeCard);
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
    let isIngredientsContained = false;
    this.ingredients.forEach((ingredient) => {
      if (
        ingredient.ingredient
          .toLocaleLowerCase()
          .includes(value.toLowerCase().trim())
      ) {
        isIngredientsContained = true;
      }
    });
    return isIngredientsContained;
  }
}
