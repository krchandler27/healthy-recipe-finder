




var foodItem = document.getElementById("foodItem");

function foodSearch() {
    foodInput = foodItem.value;
    console.log(foodInput);

    findFoodFacts(foodInput);
}



// Fetching the information from API
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


    var img = document.querySelector("img");
    img.src = info.hints[0].food.image;


}





// var myHeaders = new Headers();
// myHeaders.append("apikey", "68fJDTBKHjPohvLHpGu9o5ZuGCiLAIEl");

// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow',
//   headers: myHeaders
// };

// fetch("https://api.apilayer.com/spoonacular/recipes/autocomplete?query=chicken", requestOptions)
// //   .then(response => response.text())
// //   .then(result => console.log(result))
// //   .catch(error => console.log('error', error));

//     .then(function(response) {return response.json() })
//     .then(function(data) {
//         console.log(data);
//         foodThings(data);
//     });

//   function foodThings(info) {
//     document.getElementById("foodStuff").innerHTML = info[0].title;

//     console.log(info[0].title);
//   }






var APIKey1 = "4e66bd31b33a6e725fd7414ce112e3bd";
var APIid = "bdaa3a33";
var recipe = 'chicken';
var queryURL1 = "https://api.edamam.com/api/recipes/v2?type=public&q=" + recipe + "&app_id=" + APIid + "&app_key=" + APIKey1;
var responseText = document.getElementById('response-text');

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
        })

}

getAPI(queryURL1);

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