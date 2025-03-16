import recipes from './recipes.mjs';

document.addEventListener('DOMContentLoaded', init);

document.querySelector('.search-form').addEventListener('submit', searchHandler);

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    return list[random(list.length)];
}

function tagsTemplate(tags) {
    return `<ul class="recipe__tags">
        ${tags.map(tag => `<li>${tag}</li>`).join('')}
    </ul>`;
}

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        html += i <= rating ? 
            `<span aria-hidden="true" class="icon-star">⭐</span>` : 
            `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `<figure class="recipe">
        <img src="${recipe.image}" alt="image of ${recipe.name}" />
        <figcaption>
            ${tagsTemplate(recipe.tags)}
            <h2><a href="#">${recipe.name}</a></h2>
            <p class="recipe__ratings">
                ${ratingTemplate(recipe.rating)}
            </p>
            <p class="recipe__description">
                ${recipe.description}
            </p>
            <p><strong>Prep Time:</strong> ${recipe.prepTime} | <strong>Cook Time:</strong> ${recipe.cookTime} | <strong>Servings:</strong> ${recipe.recipeYield}</p>
            <h3>Ingredients:</h3>
            <ul>${recipe.recipeIngredient.map(ing => `<li>${ing}</li>`).join('')}</ul>
            <h3>Instructions:</h3>
            <ol>${recipe.recipeInstructions.map(step => `<li>${step}</li>`).join('')}</ol>
        </figcaption>
    </figure>`;
}

function renderRecipes(recipeList) {
    const recipeContainer = document.getElementById('recipes-container'); // Updated selector
    if (!recipeContainer) return;
    recipeContainer.innerHTML = recipeList.map(recipeTemplate).join('');
}


function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

function filterRecipes(query) {
    return recipes
        .filter(recipe =>
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(query)) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(query))
        )
        .sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.search-form input').value.toLowerCase();
    const filteredRecipes = filterRecipes(searchInput);
    renderRecipes(filteredRecipes);
}
