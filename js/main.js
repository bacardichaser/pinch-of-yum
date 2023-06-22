async function fetchMeals() {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    const obj = await fetch(url);
    const mealObj = await obj.json();
    return mealObj.meals;
}

async function display(mealList = fetchMeals()) {
    document.getElementById('cards').innerHTML = '';
    for(item of await mealList) {
        document.getElementById('cards').innerHTML += 
        `<div class='card'>
            <a href='/html/recipe-meal.html?idMeal=${item.idMeal}'>
            <img src='${item.strMealThumb}' alt='${item.strMeal}'/>
            <h2> ${item.strMeal} </h2>
            </a>
        </div>`;
    }
}