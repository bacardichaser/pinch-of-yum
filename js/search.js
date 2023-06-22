async function searchMeals() {
    const title = document.getElementById('title');
    const userSearch = document.getElementById('searchField').value.trim();

    if(userSearch === '') {
        title.innerHTML = '<p>ALL RECIPES</p>';
        display();
        return;
    }

    const mealsObj = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${userSearch}`);
    const mealList = await mealsObj.json();

    if(!mealList.meals) {
        userSearch.replace(' ','-');
        const ingredientsObj = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${userSearch}`);
        const mealListByIngr = await ingredientsObj.json();
        
        if(!mealListByIngr.meals) {
            title.innerHTML = '<p>No recipe has been found!<p>';
            document.getElementById('cards').innerHTML = '';
            return;
        }

        display(mealListByIngr.meals);
        title.innerHTML = '';
        return
    }

    display(mealList.meals)
    title.innerHTML = '';

}
