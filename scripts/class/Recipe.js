/**
 * @description Class representing a recipe
 */
export default class Recipe {
  /**
   *
   * @param {number} id
   * @param {string} image
   * @param {string} name
   * @param {number} servings
   * @param {Object} ingredients
   * @param {number} time
   * @param {string} description
   * @param {string} appliance
   * @param {Object} ustensils
   */
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

  /**
   * @description create a DOM Element
   */
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
    recipeImg.setAttribute("src", `assets/recipes/${this.image}`);
    recipeImg.setAttribute("alt", this.name);

    recipeTime.textContent = `${this.time}min`;
    recipeTitle.textContent = this.name;
    recipeRecipeSubtitle.textContent = "recette";
    recipeIngredientsSubtitle.textContent = "ingrédients";
    recipeDescription.textContent = this.description;

    for (let i = 0; i < this.ingredients.length; i++) {
      recipeIngredients.innerHTML += `
        <div>
          <span class="recipe-ingredient-name">${
            this.ingredients[i].ingredient
          }</span>
          <span class="recipe-ingredient-quantity">${
            this.ingredients[i].quantity ?? ""
          } ${this.ingredients[i].unit ?? ""}</span>
        </div>
        `;
    }

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

  /**
   * @description check if the title contains the searched value
   * @param {string} value searched value
   * @returns {boolean} true if the value in contained
   */
  titleContains(value) {
    return this.name.toLocaleLowerCase().includes(value.toLowerCase().trim());
  }

  /**
   * @description check if the description contains the searched value
   * @param {string} value searched value
   * @returns {boolean} true if the value in contained
   */
  descriptionContains(value) {
    return this.description
      .toLocaleLowerCase()
      .includes(value.toLowerCase().trim());
  }

  /**
   * @description check if the ingredients contain the searched value
   * @param {string} value searched value
   * @returns {boolean} true if the value in contained
   */
  ingredientsContains(value) {
    for (let i = 0; i < this.ingredients.length; i++) {
      if (
        this.ingredients[i].ingredient
          .toLocaleLowerCase()
          .includes(value.toLowerCase().trim())
      ) {
        return true;
      }
    }

    return false;
  }

  hasAllIngredients(ingredients) {
    const totalIngredientsSelected = ingredients.length;
    let totalIngredients = 0;
    ingredients.forEach((ingredient) => {
      this.ingredients.forEach((recipeIngredient) => {
        if (
          ingredient.toLocaleLowerCase() ===
          recipeIngredient.ingredient.toLocaleLowerCase().trim()
        ) {
          totalIngredients++;
        }
      });
    });
    return totalIngredientsSelected == totalIngredients;
  }

  hasAllUstensils(ustensils) {
    const totalUstensilsSelected = ustensils.length;
    let totalUstensils = 0;
    ustensils.forEach((ustensil) => {
      this.ustensils.forEach((recipeUstensil) => {
        if (
          ustensil.toLocaleLowerCase() ===
          recipeUstensil.toLocaleLowerCase().trim()
        ) {
          totalUstensils++;
        }
      });
    });
    return totalUstensilsSelected == totalUstensils;
  }

  hasAppliance(appliances) {
    const totalAppliancesSelected = appliances.length;
    let totalAppliances = 0;
    appliances.forEach((appliance) => {
      if (
        appliance.toLocaleLowerCase() ===
        this.appliance.toLocaleLowerCase().trim()
      ) {
        totalAppliances++;
      }
    });
    return totalAppliancesSelected == totalAppliances;
  }
}
