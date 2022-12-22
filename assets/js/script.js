var foodItem = document.getElementById("foodItem");
var searchButton = document.getElementById("searchButton");


// Remove previous food information
searchButton.addEventListener("click", removeOldInfo);
function removeOldInfo() {

    

}

function foodSearch() {
  var food = foodItem.value;
  console.log(food);
  findFoodFacts(food);
  findRecipe(food);
}

foodItem.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("searchButton").click();
  }
});


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
    // nutrientsList(info);

    document.getElementById("foodName").innerHTML = "";
    document.getElementById("nutrientsInfo").innerHTML = "";
   
    

    var foodItemName = document.createElement("h2");
    foodItemName.innerHTML = info.text.charAt(0).toUpperCase() +
    info.text.slice(1);
    document.getElementById("foodName").style.color = "blue";
    document.getElementById("foodName").style.fontSize = "35px";


    var foodImg = document.getElementById("foodPicture");
    foodImg.src = info.hints[0].food.image;

    var carbList = document.createElement("li");
    carbList.innerHTML = "Carbohydrate, by difference: " + info.hints[0].food.nutrients.CHOCDF + "g";
    
    var energyList = document.createElement("li");
    energyList.innerHTML = "Energy: " + info.hints[0].food.nutrients.ENERC_KCAL + "kcal";

    var fatList = document.createElement("li");
    fatList.innerHTML = "Total lipid (fat) content: " + (info.hints[0].food.nutrients.FAT) + "g";

    var fiberList = document.createElement("li");
    fiberList.innerHTML = "Fiber, total dietary: " + info.hints[0].food.nutrients.FIBTG + "g";

    var proteinList = document.createElement("li");
    proteinList.innerHTML = "Protein: " + info.hints[0].food.nutrients.PROCNT + "g";

    document.getElementById("foodName").appendChild(foodItemName);
    document.getElementById("nutrientsInfo").appendChild(carbList);
    document.getElementById("nutrientsInfo").appendChild(energyList);
    document.getElementById("nutrientsInfo").appendChild(fatList);
    document.getElementById("nutrientsInfo").appendChild(fiberList);
    document.getElementById("nutrientsInfo").appendChild(proteinList);

//     function nutrientsList (info) {
//     document.getElementById("CHOCDF").innerHTML = "Carbohydrate, by difference: " + info.hints[0].food.nutrients.CHOCDF + "g";
//     document.getElementById("ENERC_KCAL").innerHTML = "Energy: " + info.hints[0].food.nutrients.ENERC_KCAL + "kcal";
//     document.getElementById("FAT").innerHTML = "Total lipid (fat) content: " + (info.hints[0].food.nutrients.FAT) + "g";
//     document.getElementById("FIBTG").innerHTML = "Fiber, total dietary: " + info.hints[0].food.nutrients.FIBTG + "g";
//     document.getElementById("PROCNT").innerHTML = "Protein: " + info.hints[0].food.nutrients.PROCNT + "g";
// }
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
  document.getElementById("directions").innerHTML = "";
  document.getElementById("ingredientLines").innerHTML = "";
  document.getElementById("digest").innerHTML = "";
  document.getElementById("recipeList").innerHTML = "";
  document.getElementById("healthLabels").innerHTML = "";
  document.getElementById("dietLabels").innerHTML = "";

  var recipeImg = document.getElementById("recipePicture");
  recipeImg.src = info.hits[0].recipe.image;

  
  document.getElementById("label").innerHTML = info.hits[0].recipe.label;
  document.getElementById("label").style.color = "green";
  document.getElementById("label").style.fontWeight = "bolder";

  document.getElementById("calories").innerHTML =
    "Calories: " + (info.hits[0].recipe.calories).toFixed(2);

   

// Displaying the ingredients list
var ingredientTitle = document.createElement("h2");
    ingredientTitle.innerHTML = "Ingredients:";
    document.getElementById("ingredientLines").appendChild(ingredientTitle);
    document.getElementById("ingredientLines").classList.add("foodInformation");

    for(var i = 0; i < info.hits[0].recipe.ingredientLines.length; i++) {
        console.log(info.hits[0].recipe.ingredientLines.length);
    
        var ingredients = info.hits[0].recipe.ingredientLines[i];
        var ingredientInfo = document.createElement("li");
        var ingredientInfoBox = document.createTextNode(ingredients)
        ingredientInfo.appendChild(ingredientInfoBox);
        document.getElementById("ingredientLines").appendChild(ingredientInfo); 
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

for (var i = 0; i < info.hits[0].recipe.digest.length; i++) {
    console.log((info.hits[0].recipe.digest).length);

    var digestion =
      info.hits[0].recipe.digest[i].label +
      ": " +
      (info.hits[0].recipe.digest[i].total).toFixed(2);

    var digestInfo = document.createElement("li");
    var digestInfoBox = document.createTextNode(digestion);
    digestInfo.appendChild(digestInfoBox);
    document.getElementById("digest").appendChild(digestInfo);
  }

//   Displaying the diet labels
var dietTypeTitle = document.createElement("h2");
    dietTypeTitle.innerHTML = "Diet Type(s):";
    document.getElementById("dietLabels").appendChild(dietTypeTitle);
    document.getElementById("dietLabels").classList.add("foodInformation");

for(var i = 0; i < info.hits[0].recipe.dietLabels.length; i++) {
    console.log(info.hits[0].recipe.dietLabels.length);

    var dietTypes = info.hits[0].recipe.dietLabels[i];

    var dietInfo = document.createElement("li");
    var dietInfoBox = document.createTextNode(dietTypes);
    dietInfo.appendChild(dietInfoBox);
    document.getElementById("dietLabels").appendChild(dietInfo);

}

//  Displaying the health labels
var healthLabelsTitle = document.createElement("h2");
    healthLabelsTitle.innerHTML = "Health Labels:";
    document.getElementById("healthLabels").appendChild(healthLabelsTitle);
    document.getElementById("healthLabels").classList.add("foodInformation");

for(var i = 0; i < info.hits[0].recipe.healthLabels.length; i++) {
    console.log(info.hits[0].recipe.healthLabels.length);

    var health = info.hits[0].recipe.healthLabels[i];

    var healthInfo = document.createElement("li");
    var healthInfoBox = document.createTextNode(health);
    healthInfo.appendChild(healthInfoBox);
    document.getElementById("healthLabels").appendChild(healthInfo);
}
  

  //  Displaying additional recipes.
  var recipeListTitle = document.createElement("h2");
      recipeListTitle.innerHTML = "Additional Recipes:";
      document.getElementById("recipeList").appendChild(recipeListTitle);
      document.getElementById("recipeList").classList.add("foodInformation");

  for (let i = 0; i < 5; i++) {

    var recipes = info.hits[i].recipe.label;
    
    var recipeButtonList = document.createElement("li");
    var recipeButton = document.createElement("BUTTON");
    recipeButton.setAttribute("data-recipe", recipes);

    var recipeButtonBox = document.createTextNode(recipes);
    recipeButtonList.appendChild(recipeButton);
    recipeButton.appendChild(recipeButtonBox);
    document.getElementById("recipeList").appendChild(recipeButtonList);
    
    recipeButton.onclick = function () {

    var recipeButtonClick = event.target.getAttribute("data-recipe");

      console.log(event.target.getAttribute("data-recipe"));
      console.log(recipeButtonClick);

      findFoodFacts(recipeButtonClick);
    //   findRecipe(recipeButtonClick);

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

//  var APIkey2="450378b744e7b7f6a628e60f5546bab8";
//  var APIid2 = "3842e9bc";

//testing from here down

// $("#search-button").on("click", function () {
//     var ingredients = $("#search-value").val();
//     $("#search-value").val("");
//     nutritionFacts(ingredients);
//   });

//   //search button enter key 
//   $("#search-button").keypress(function (event) {
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if (keycode === 13) {
//       nutritionFacts(ingredients);
//     }
//   });


//   function nutritionFacts(ingredients) {
//     $.ajax({
//       type: "GET",
//       url: "https://api.edamam.com/api/nutrition-data?" + "app_id=" + APIid2 + "&app_key=" + APIkey2 + "&nutrition-type=cooking&ingr=" + ingredients

//     }).then(function (data) {
//       console.log(data);
//       $("#nurtition-data").html("<h4 class=\"mt-3\">Facts:</h4>").append("<div class=\"row\">");

//         })
//     }
//   findFoodFacts(food);
//   findRecipe(food);
// }




