// consts for input and event handing
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
            detailsSection.innerHTML = ""; // this line clears previously searched items
            // fetched api with id.so only one element.so we take 0'th index of array 
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
            detailsSection.style.border = "5px dashed blue";
            detailsSection.style.margin = "50px";
            detailsSection.style.padding = "20px";
        });
    // this line automatically scrolls at top because we have shown details at top
    window.scrollTo(0, 0);
}

const process = data => {
    mainSection.innerHTML = ""; // this line clears previously searched items
    detailsSection.innerHTML = ""; // this line clears previously searched items
    detailsSection.style = "None";
    const meals = data["meals"];
    if (meals === null) {
        alert("Didn't find amy food.Invalid search.Try again please.");
        return;
    }
    meals.forEach(meal => {
        const newDiv = document.createElement("div");
        newDiv.className = "food-item";
        newDiv.addEventListener('click', () => {
            displayFoodDetails(meal.idMeal);
        });
        const mealInfo = `
            <img src="${meal.strMealThumb}" alt="pic">
            <h3>${meal.strMeal}</h3>
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

