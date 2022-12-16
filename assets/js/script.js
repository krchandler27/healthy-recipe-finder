




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