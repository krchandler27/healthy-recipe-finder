var foodItem = document.getElementById("foodItem");
var searchButton = document.getElementById("searchButton");

// Using the enter key to search
foodItem.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});

// Runs the search input food name through the APIs
function foodSearch() {
  var food = foodItem.value;
  console.log(food);
  findFoodFacts(food);
  findRecipe(food);
}

// // Fetching the info from 1st API
function findFoodFacts(food) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2baebc70a1mshd27e67c12d60db1p17859ejsn0d50f086b942",
      "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
    },
  };

  fetch(
    "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=" +
      food +
      "",
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      foodInfo(data);
    });
}

// Placing the fetched information into the web page from the 1st API, makeing it visible to the user.
function foodInfo(info) {
  document.getElementById("foodName").innerHTML = "";
  document.getElementById("nutrientsInfo").innerHTML = "";

  var foodItemName = document.createElement("h2");
  foodItemName.innerHTML =
    info.hints[0].food.label.charAt(0).toUpperCase() +
    info.hints[0].food.label.slice(1);

  var foodImg = document.getElementById("foodPicture");
  foodImg.src = info.hints[0].food.image;

  var carbList = document.createElement("li");
  carbList.innerHTML =
    "Carbohydrate, by difference: " +
    info.hints[0].food.nutrients.CHOCDF.toFixed(2) +
    "g";

  var energyList = document.createElement("li");
  energyList.innerHTML =
    "Energy: " + info.hints[0].food.nutrients.ENERC_KCAL.toFixed(2) + "kcal";

  var fatList = document.createElement("li");
  fatList.innerHTML =
    "Fat (total lipid) content: " +
    info.hints[0].food.nutrients.FAT.toFixed(2) +
    "g";

  var fiberList = document.createElement("li");
  fiberList.innerHTML =
    "Fiber, total dietary: " +
    info.hints[0].food.nutrients.FIBTG.toFixed(2) +
    "g";

  var proteinList = document.createElement("li");
  proteinList.innerHTML =
    "Protein: " + info.hints[0].food.nutrients.PROCNT.toFixed(2) + "g";

  document.getElementById("foodName").appendChild(foodItemName);
  var nutrientsInformation = document.getElementById("nutrientsInfo");
  nutrientsInformation.appendChild(carbList);
  nutrientsInformation.appendChild(energyList);
  nutrientsInformation.appendChild(fatList);
  nutrientsInformation.appendChild(fiberList);
  nutrientsInformation.appendChild(proteinList);
}

// Fetching info from the 2nd API
function findRecipe(food) {
  var APIKey1 = "4e66bd31b33a6e725fd7414ce112e3bd";
  var APIid = "bdaa3a33";
  var queryURL1 =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    food +
    "&app_id=" +
    APIid +
    "&app_key=" +
    APIKey1;
  var responseText = document.getElementById("response-text");

  getAPI(queryURL1);

  function getAPI(queryURL1) {
    fetch(queryURL1)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        var myDiv = document.createElement("div");
        myDiv.setAttribute("id", "myId");
        myDiv.classList.add("myClass");
        myDiv.textContent = data.recipeName;
        document.querySelector("#response-text").appendChild(myDiv);
        console.log(data);

        firstAPIInfo(data);
      });
  }
}

// Putting the fetched information from the 2nd API onto the page making it visible to the user.
// This first part clears the old information, making room for only the new information to be visible.
function firstAPIInfo(info) {
  document.getElementById("directions").innerHTML = "";
  document.getElementById("ingredientLines").innerHTML = "";
  document.getElementById("digest").innerHTML = "";
  document.getElementById("recipeList").innerHTML = "";
  document.getElementById("healthLabels").innerHTML = "";
  document.getElementById("dietLabels").innerHTML = "";

  var recipeImg = document.getElementById("recipePicture");
  recipeImg.src = info.hits[0].recipe.image;

  document.getElementById("label").innerHTML = info.hits[0].recipe.label;

  document.getElementById("calories").innerHTML =
    "Calories: " + info.hits[0].recipe.calories.toFixed(2);

  // Displaying the ingredients list
  var ingredientTitle = document.createElement("h2");
  ingredientTitle.innerHTML = "Ingredients:";
  document.getElementById("ingredientLines").appendChild(ingredientTitle);
  document.getElementById("ingredientLines").classList.add("foodInformation");
  var ingredientsList = document.createElement("ul");

  for (var i = 0; i < info.hits[0].recipe.ingredientLines.length; i++) {
    console.log(info.hits[0].recipe.ingredientLines.length);

    var ingredients = info.hits[0].recipe.ingredientLines[i];
    var ingredientInfo = document.createElement("li");
    var ingredientInfoBox = document.createTextNode(ingredients);
    ingredientsList.appendChild(ingredientInfo);
    ingredientInfo.appendChild(ingredientInfoBox);
    document.getElementById("ingredientLines").appendChild(ingredientsList);
  }

  // Displaying link to the cooking directions
  var directionTitle = document.createElement("h2");
  directionTitle.innerHTML = "Directions";
  document.getElementById("directions").appendChild(directionTitle);
  document.getElementById("directions").classList.add("foodInformation");

  var directions = info.hits[0].recipe.url;
  var directionsInfo = document.createElement("a");
  var directionsInfoBox = document.createTextNode(directions);
  directionsInfo.appendChild(directionsInfoBox);
  directionsInfo.title = "Cooking Directions";
  directionsInfo.href = directions;
  document.getElementById("directions").appendChild(directionsInfo);

  // Displaying the nutrition facts
  var nutritionFactsTitle = document.createElement("h2");
  nutritionFactsTitle.innerHTML = "Nutritional Information:";
  document.getElementById("digest").appendChild(nutritionFactsTitle);
  document.getElementById("digest").classList.add("foodInformation");
  var digestInfoList = document.createElement("ul");

  for (var i = 0; i < info.hits[0].recipe.digest.length; i++) {
    console.log(info.hits[0].recipe.digest.length);

    var digestion =
      info.hits[0].recipe.digest[i].label +
      ": " +
      info.hits[0].recipe.digest[i].total.toFixed(2) +
      info.hits[0].recipe.digest[i].unit;

    var digestInfo = document.createElement("li");
    var digestInfoBox = document.createTextNode(digestion);
    digestInfoList.appendChild(digestInfo);
    digestInfo.appendChild(digestInfoBox);
    document.getElementById("digest").appendChild(digestInfoList);
  }

  //   Displaying the diet labels
  document.getElementById("dietLabels").innerHTML = "";
  var dietTypeTitle = document.createElement("h2");
  dietTypeTitle.innerHTML = "Diet Type(s):";
  document.getElementById("dietLabels").appendChild(dietTypeTitle);
  document.getElementById("dietLabels").classList.add("foodInformation");
  var dietInfoList = document.createElement("ul");

  for (var i = 0; i < info.hits[0].recipe.dietLabels.length; i++) {
    console.log(info.hits[0].recipe.dietLabels.length);
    var dietTypes = info.hits[0].recipe.dietLabels[i];
    var dietInfo = document.createElement("li");
    var dietInfoBox = document.createTextNode(dietTypes);
    dietInfoList.appendChild(dietInfo);
    dietInfo.appendChild(dietInfoBox);
    document.getElementById("dietLabels").appendChild(dietInfoList);
  }

  //  Displaying the health labels
  document.getElementById("healthLabels").innerHTML = "";
  var healthLabelsTitle = document.createElement("h2");
  healthLabelsTitle.innerHTML = "Health Labels:";
  document.getElementById("healthLabels").appendChild(healthLabelsTitle);
  document.getElementById("healthLabels").classList.add("foodInformation");
  var healthInfoList = document.createElement("ul");

  for (var i = 0; i < info.hits[0].recipe.healthLabels.length; i++) {
    console.log(info.hits[0].recipe.healthLabels.length);
    var health = info.hits[0].recipe.healthLabels[i];
    var healthInfo = document.createElement("li");
    var healthInfoBox = document.createTextNode(health);
    healthInfoList.appendChild(healthInfo);
    healthInfo.appendChild(healthInfoBox);
    document.getElementById("healthLabels").appendChild(healthInfoList);
  }

  //  Displaying additional recipes.
  document.getElementById("recipeList").innerHTML = "";
  var recipeListTitle = document.createElement("h2");
  recipeListTitle.innerHTML = "Additional Recipes:";
  document.getElementById("recipeList").appendChild(recipeListTitle);
  document.getElementById("recipeList").classList.add("foodInformation");
  var recipeButtonList = document.createElement("ul");

  for (let i = 0; i < 5; i++) {
    var recipes = info.hits[i].recipe.label;

    var recipeButtonItems = document.createElement("li");
    var recipeButton = document.createElement("BUTTON");
    recipeButton.setAttribute("data-recipe", recipes);
    var recipeButtonBox = document.createTextNode(recipes);
    recipeButtonList.appendChild(recipeButtonItems);
    recipeButtonItems.appendChild(recipeButton);
    recipeButton.appendChild(recipeButtonBox);
    document.getElementById("recipeList").appendChild(recipeButtonList);

    recipeButton.onclick = function () {
      var recipeButtonClick = event.target.getAttribute("data-recipe");

      console.log(event.target.getAttribute("data-recipe"));
      console.log(recipeButtonClick);
      findFoodFacts(recipeButtonClick);
      findRecipe(recipeButtonClick);

      localStorage.setItem("recipe", recipeButtonClick);
      getSavedRecipe();
    };

    console.log(info.hits[i].recipe.label);
  }

  // Alphabetize the li elements inside of an ul element. Courtesy of w3Schools.com
  function sortList(list) {
    var list;
    var i;
    var switching;
    var b;
    var shouldSwitch;
    list = document.getElementById(list);
    switching = true;
    while (switching) {
      switching = false;
      b = list.getElementsByTagName("li");
      for (i = 0; i < b.length - 1; i++) {
        shouldSwitch = false;
        if (
          b[i].innerHTML.toLocaleLowerCase() >
          b[i + 1].innerHTML.toLocaleLowerCase()
        ) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }
  sortList("digest");
  sortList("dietLabels");
  sortList("healthLabels");
  sortList("recipeList");
}

// Uses local storage to retrieve recipes that were searched for and save them onto the page for easy researching.
function getSavedRecipe() {
  var savedRecipe = localStorage.getItem("recipe");
  console.log(savedRecipe);

  var recipeButton = document.createElement("BUTTON");
  var recipeButtonBtn = document.createTextNode(savedRecipe);
  recipeButton.appendChild(recipeButtonBtn);
  document.getElementById("savedRecipeBox").appendChild(recipeButton);

  recipeButton.onclick = function (recipe) {
    recipe = savedRecipe;

    findFoodFacts(recipe);
    findRecipe(recipe);

    console.log(savedRecipe);
  };
  sortList("recipeList");
}