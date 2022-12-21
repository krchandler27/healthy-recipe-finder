var foodItem = document.getElementById("foodItem");

function foodSearch() {
    console.log(food);
  var food = foodItem.value;
  console.log(food);

  findFoodFacts(food);
  findRecipe(food);
}

// // Fetching the information from API
function findFoodFacts(food) {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2baebc70a1mshd27e67c12d60db1p17859ejsn0d50f086b942',
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
        }
    };

fetch('https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=' + food + '', options)
	// .then(response => response.json())
	// .then(response => console.log(response))
	// .catch(err => console.error(err))
    .then(function(response) {return response.json() })
    .then(function(data) {
        console.log(data);
        foodInfo(data);
    });
}

// Place the fetched information into the web page
function foodInfo (info) {
    document.getElementById("CHOCDF").innerHTML = "Carbohydrate, by difference: " + info.hints[0].food.nutrients.CHOCDF + "g";
    document.getElementById("ENERC_KCAL").innerHTML = "Energy: " + info.hints[0].food.nutrients.ENERC_KCAL + "kcal";
    document.getElementById("FAT").innerHTML = " Total lipid (fat) content: " + (info.hints[0].food.nutrients.FAT) + "g";
    document.getElementById("FIBTG").innerHTML = "Fiber, total dietary: " + info.hints[0].food.nutrients.FIBTG + "g";
    document.getElementById("PROCNT").innerHTML = "Protein: " + info.hints[0].food.nutrients.PROCNT + "g";

    var foodImg = document.getElementById("foodPicture");
    foodImg.src = info.hints[0].food.image;
}

// Fetching the 1st API
function findRecipe(food) {
  var APIKey1 = "4e66bd31b33a6e725fd7414ce112e3bd";
  var APIid = "bdaa3a33";
  var recipe = "chicken";
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

// getAPI(queryURL1);

// Putting the fetched information onto the page making it visible to the user.
function firstAPIInfo(info) {
  var recipeImg = document.getElementById("recipePicture");
  recipeImg.src = info.hits[0].recipe.image;

  document.getElementById("label").innerHTML =
    "Dish Name: " + info.hits[0].recipe.label;
  document.getElementById("calories").innerHTML =
    "Calories: " + (info.hits[0].recipe.calories).toFixed(2);


    for(var i = 0; i < info.hits[0].recipe.ingredientLines.length; i++) {
        console.log(info.hits[0].recipe.ingredientLines.length);
    
        var ingredients = info.hits[0].recipe.ingredientLines[i];
    
        var ingredientInfo = document.createElement("li");
        var ingredientInfoBox = document.createTextNode(ingredients);
        ingredientInfo.appendChild(ingredientInfoBox);
        document.getElementById("ingredientLines").appendChild(ingredientInfo);
    }    

    // Link to the cooking directions
    var directions = info.hits[0].recipe.url;
    var directionsInfo = document.createElement("a");
    var directionsInfoBox = document.createTextNode(directions);
    directionsInfo.appendChild(directionsInfoBox);
    directionsInfo.title = "Cooking Directions";
    directionsInfo.href = directions;
    document.getElementById("directions").appendChild(directionsInfo);



    
for (var i = 0; i < 5; i++) {
    console.log((info.hits[0].recipe.digest).length);

    var digestion =
      info.hits[i].recipe.digest[i].label +
      ": " +
      (info.hits[i].recipe.digest[i].total).toFixed(2);

    var digestInfo = document.createElement("li");
    var digestInfoBox = document.createTextNode(digestion);
    digestInfo.appendChild(digestInfoBox);
    document.getElementById("digest").appendChild(digestInfo);
  }

for(var i = 0; i < info.hits[0].recipe.dietLabels.length; i++) {
    console.log(info.hits[0].recipe.dietLabels.length);

    var dietTypes = info.hits[0].recipe.dietLabels[i];

    var dietInfo = document.createElement("li");
    var dietInfoBox = document.createTextNode(dietTypes);
    dietInfo.appendChild(dietInfoBox);
    document.getElementById("dietLabels").appendChild(dietInfo);

}

for(var i = 0; i < info.hits[0].recipe.healthLabels.length; i++) {
    console.log(info.hits[0].recipe.healthLabels.length);

    var health = info.hits[0].recipe.healthLabels[i];

    var healthInfo = document.createElement("li");
    var healthInfoBox = document.createTextNode(health);
    healthInfo.appendChild(healthInfoBox);
    document.getElementById("healthLabels").appendChild(healthInfo);
}
  

  //  Placeing fetched info from an array onto the page for user to see.
  for (let i = 0; i < 5; i++) {

    var recipes = info.hits[i].recipe.label;
    
    var recipeButtonList = document.createElement("li");
    var recipeButton = document.createElement("BUTTON");
    recipeButton.setAttribute("data-recipe", recipes)

    var recipeButtonBox = document.createTextNode(recipes);
    recipeButtonList.appendChild(recipeButton);
    recipeButton.appendChild(recipeButtonBox);
    document.getElementById("recipeList").appendChild(recipeButtonList);

    recipeButton.onclick = function () {

    var recipeButtonClick = event.target.getAttribute("data-recipe");

      console.log(event.target.getAttribute("data-recipe"));
      console.log(recipeButtonClick);

      findFoodFacts(recipeButtonClick);
    //   findRecipe(recipe);

    
    };

    console.log(info.hits[i].recipe.label);
  }
}

// Fetching the 2nd API
var APIkey2 = "450378b744e7b7f6a628e60f5546bab8";
var APIid2 = "3842e9bc";
var health = "3 eggs";
var queryURL2 =
  "https://api.edamam.com/api/nutrition-data?" +
  "app_id=" +
  APIid2 +
  "&app_key=" +
  APIkey2 +
  "&nutrition-type=cooking&ingr=" +
  health;
var responseText = document.getElementById("response-text");
//https://api.edamam.com/api/nutrition-data?app_id=3842e9bc&app_key=450378b744e7b7f6a628e60f5546bab8&nutrition-type=cooking&ingr=3%20eggs
function getAPI(queryURL2) {
  fetch(queryURL2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var myDiv = document.createElement("div");
      myDiv.setAttribute("id", "myId");
      myDiv.classList.add("myClass");
      myDiv.textContent = data.recipeName;
      document.querySelector("#response-text").appendChild(myDiv);
      console.log(data);
    });
}
getAPI(queryURL2);
