const inputField = document.getElementById("input-field");
const button = document.getElementById("btn");
const mainSection = document.getElementById("main");
const detailsSection = document.getElementById("details-section");

// functions

const displayFoodDetails = id => {
    const urlId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(urlId)
        .then(res => res.json())
        .then(data => {
            detailsSection.innerHTML = "";
            const meal = data["meals"][0];
            const detailsDiv = document.createElement("div");
            const detailsInfo = `
            <img src="${meal.strMealThumb}" alt="pic">
            <h2>${meal.strMeal}</h2>
            <h4>Instructions</h4>
            <p>${meal.strInstructions}</p>
        `;
            detailsDiv.innerHTML = detailsInfo;
            detailsSection.appendChild(detailsDiv);
        });
}

const process = data => {
    mainSection.innerHTML = ""; // this line clears previously searched items
    const meals = data["meals"];
    meals.forEach(meal => {
        const newDiv = document.createElement("div");
        newDiv.className = "food-item";
        const mealInfo = `
            <img src="${meal.strMealThumb}" alt="pic">
            <h3>${meal.strMeal}</h3>
            <button onclick='displayFoodDetails("${meal.idMeal}")'>Details</button>
        `;
        newDiv.innerHTML = mealInfo;
        mainSection.appendChild(newDiv);
    });
}

// event listeners
button.addEventListener('click', () => {
    const inputText = inputField.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => process(data));
});

