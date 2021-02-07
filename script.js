const inputField = document.getElementById("input-field");
const button = document.getElementById("btn");
const mainSection = document.getElementById("main");

// functions
const process = data => {
    mainSection.innerHTML = "";
    const meals = data["meals"];
    meals.forEach(meal => {
        const newDiv = document.createElement("div");
        newDiv.className = "food-item";
        const mealInfo = `
            <img src="${meal.strMealThumb}" alt="pic">
            <h3>${meal.strMeal}</h3>
        `
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
