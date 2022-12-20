




var foodItem = document.getElementById("foodItem");

function foodSearch(food) {
    food = foodItem.value;
    console.log(food);

    // findFoodFacts(food);
    findRecipe(food);
}



// // Fetching the information from API
// function findFoodFacts(food) {

//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '2baebc70a1mshd27e67c12d60db1p17859ejsn0d50f086b942',
//             'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
//         }
//     };

// fetch('https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=' + food + '', options)
// 	// .then(response => response.json())
// 	// .then(response => console.log(response))
// 	// .catch(err => console.error(err))
//     .then(function(response) {return response.json() })
//     .then(function(data) {
//         console.log(data);
//         foodInfo(data);
//     });
// }

    
// // Place the fetched information into the web page
// function foodInfo (info) {
//     document.getElementById("CHOCDF").innerHTML = "Carbohydrate, by difference: " + info.hints[0].food.nutrients.CHOCDF + "g";
//     document.getElementById("ENERC_KCAL").innerHTML = "Energy: " + info.hints[0].food.nutrients.ENERC_KCAL + "kcal";
//     document.getElementById("FAT").innerHTML = " Total lipid (fat) content: " + (info.hints[0].food.nutrients.FAT) + "g";
//     document.getElementById("FIBTG").innerHTML = "Fiber, total dietary: " + info.hints[0].food.nutrients.FIBTG + "g";
//     document.getElementById("PROCNT").innerHTML = "Protein: " + info.hints[0].food.nutrients.PROCNT + "g";


//     var foodImg = document.getElementById("foodPicture");
//     foodImg.src = info.hints[0].food.image;
// }







// Fetching the 1st API
function findRecipe (food) {

var APIKey1 = "4e66bd31b33a6e725fd7414ce112e3bd";
var APIid = "bdaa3a33";
var recipe = 'chicken';
var queryURL1 = "https://api.edamam.com/api/recipes/v2?type=public&q=" + food + "&app_id=" + APIid + "&app_key=" + APIKey1;
var responseText = document.getElementById('response-text');

getAPI(queryURL1);

function getAPI(queryURL1) {
    fetch(queryURL1)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            var myDiv = document.createElement('div');
            myDiv.setAttribute("id", "myId");
            myDiv.classList.add("myClass");
            myDiv.textContent = data.recipeName;
            document.querySelector("#response-text").appendChild(myDiv);
            console.log(data);

            firstAPIInfo(data);
        })

}
}

// getAPI(queryURL1);

// Putting the fetched information onto the page making it visible to the user.
function firstAPIInfo (info) {
    var recipeImg = document.getElementById("recipePicture");
    recipeImg.src = info.hits[0].recipe.image;

    document.getElementById("label").innerHTML = "Dish Name: " + info.hits[0].recipe.label;
    document.getElementById("calories").innerHTML = "Calories: " + info.hits[0].recipe.calories;

for (var i=0; i<5; i++) {    
    // document.getElementById("digest").innerHTML = info.hits[i].recipe.digest[i].label;
    console.log(info.hits[i].recipe.digest[i].label);

    var digestion = (info.hits[i].recipe.digest[i].label) + ": " + (info.hits[i].recipe.digest[i].total);


    var digestInfo = document.createElement("li");
    var digestInfoBox = document.createTextNode(digestion);
            digestInfo.appendChild(digestInfoBox);
            document.getElementById("digest").appendChild(digestInfo);

}
    
    document.getElementById("dietLabels").innerHTML = "Diet Labels: " + toString(info.hits[0].dietLabels);
    document.getElementById("healthLabels").innerHTML = " Health Labels: " + info.hits[0].healthLabels;


    // console.log(toString(info.hits[0].dietLabels));




    
//  Placeing fetched info from an array onto the page for user to see.
        for(let i=0; i<5; i++) {
            document.getElementById("arrayInfo").innerHTML = " Array: " + info.hits[i].recipe.label;
            
            var recipes = info.hits[i].recipe.label;
            // var recipeList = document.getElementById("arrayInfo").innerHTML;


            var recipeButton = document.createElement("BUTTON");
            var recipeButtonBox = document.createTextNode(recipes);
            recipeButton.appendChild(recipeButtonBox);
            document.getElementById("recipeList").appendChild(recipeButton);


            recipeButton.onclick = function(recipe) {
                recipe = recipes;

                // findFoodFacts(recipe);
                findRecipe(recipe);

                console.log(recipes);
            }

            console.log(info.hits[i].recipe.label);
    };

    
}
       



















// Fetching the 2nd API
var APIkey2="450378b744e7b7f6a628e60f5546bab8";
var APIid2 = "3842e9bc";
var health = "3 eggs";
var queryURL2 = "https://api.edamam.com/api/nutrition-data?" + "app_id=" + APIid2 + "&app_key=" + APIkey2 + "&nutrition-type=cooking&ingr=" + health;
var responseText=document.getElementById('response-text'); 
//https://api.edamam.com/api/nutrition-data?app_id=3842e9bc&app_key=450378b744e7b7f6a628e60f5546bab8&nutrition-type=cooking&ingr=3%20eggs
function getAPI(queryURL2)  {   
        fetch(queryURL2)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var myDiv = document.createElement('div');
                myDiv.setAttribute("id", "myId");
                myDiv.classList.add("myClass");
                myDiv.textContent = data.recipeName;
                document.querySelector("#response-text").appendChild(myDiv);
                console.log(data);
            })
    
    }
getAPI(queryURL2);