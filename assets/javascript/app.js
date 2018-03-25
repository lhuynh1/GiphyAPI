$( document ).ready(function() {

var foodArray = ["Pizza", "Donuts", "Pasta", "Ice Cream", "Burgers", "Steak"];

// function that creates buttons in #buttonArea
var makeButtons = function() {
for (var i = 0; i < foodArray.length; i++){
    // var buttons = $(`<button type="button"> ${foodArray[i]} </button>`).attr(`"data", ${foodArray[i]}`);
    var buttons = $('<button type=' + 'button' + '>' + foodArray[i] + '</button>').addClass('btn btn-info foodbtn').attr('data', foodArray[i]);
    $('#buttonArea').append(buttons);
    
    
    }
}
makeButtons();


// on click function for submit button that grabs user input to dynamically create a new button
$('#submit').on('click', function(event){
    event.preventDefault();

  
    // storing the user input into a variable
    var newFood = $('#food-input').val().trim();

    // grabbing that input and pushing it into the array of food
    foodArray.push(newFood);

    // call the button function to generate new buttons for new foods based on user input
    makeButtons();
});



// on click function that generates gifs through giphy API
$('#buttonArea').on("click", ".foodbtn", function(){
   
    var hungry = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hungry + "&api_key=k5zQjlfypeivYROKfyP2ow63QEu9HEJO&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
 
    }).done(function(response){
    console.log(response);

    var foodResults = response.data;

    for (i = 0; i < foodResults.length; i++){
       //  create <p> tag to hold ratings from the obj
       var p = $('<p>');
       p.text(foodResults[i].rating);
   
       var p = $('<p>').text('Rating: ' + foodResults[i].rating).addClass('ratingArea');
   
       // create an img tag for gifs to store all the attributes + class of gif for styling
       var foodImg = $('<img>').addClass('gif');
   
       // add the data attributes for animate and still to be used later in an on click function
       foodImg.attr('src', foodResults[i].images.fixed_height_still.url);
       foodImg.attr('data-still', foodResults[i].images.fixed_height_still.url);
       foodImg.attr('data-animate', foodResults[i].images.fixed_height.url);
       foodImg.attr('data-state', 'still');
      

   
   
       $('#gifArea').prepend(p);
       $('#gifArea').prepend(foodImg);

    //    $('#newGifs').prepend(foodImg);
        }
    });

});

$('#gifArea').on("click", ".gif", function(){
    // event.preventDefault();

    // current state of clicked gif // class attribute that was added above in the foodImg var
    var state = $(this).attr("data-state");

    // based on what state the gif is in; it will switch between animate and still
    if(state === "still"){
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
    
  });



});
