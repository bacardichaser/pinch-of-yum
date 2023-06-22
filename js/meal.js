async function getMeal() {
    const mealId = window.location.href.split('=')[1];
    const mealObj = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const meal = await mealObj.json();
    displayMeal(meal.meals[0]);
}

if(window.location.href.includes('recipe-meal.html')) {
    getMeal();
}

function displayMeal(oneMeal) {
    const ingredients = [];

    for (const [key, value] of Object.entries(oneMeal)) {
        if(key.includes('strIngredient') && value != ''){
            ingredients.push(value);
        }
    }

    document.getElementById('cards').innerHTML = '';
    document.getElementById('cards').innerHTML += 
        `<div id='aMeal'>
            <div id='mealImg' class="mealBlock"> 
                <h1> ${oneMeal.strMeal} </h1>
                <img src='${oneMeal.strMealThumb}' alt='${oneMeal.strMeal}'/>
            </div>
            <div id='ingredients' class="mealBlock"> 
                <h3> Ingredients: </h3>
            </div>
            <div id='recipe' class="mealBlock">
                <h3> Recipe: </h3>
                <p>${oneMeal.strInstructions}</p>
            </div>
        </div>`;
    let write = '<ul> ';
    for(let i = 0; i < ingredients.length; i++) {
        write += `
            <li> ${ingredients[i]} <input type='checkbox' name='chb-${ingredients[i]}'/> </li>
        `
    }
    write += '</ul>'
    document.getElementById('ingredients').innerHTML += write;
}