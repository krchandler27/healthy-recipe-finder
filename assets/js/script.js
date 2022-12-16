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