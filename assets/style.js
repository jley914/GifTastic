$(document).ready(function () {

    //key: tu2P9D5XnWOMtSfUbElo4aZRfeZSdNY9//
    // create a array of animals
    var animalTypes = ["cow", "dog", "cat", "horse"];
    renderButtons();

    function displayGif() {
        $('#animal-content').empty()
        var topics = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=tu2P9D5XnWOMtSfUbElo4aZRfeZSdNY9&limit=10";

        // use AJAX call for the specific animal button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .done(function (response) {

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div 
                    var topicsDiv = $("<div class='userAnimal'>");
                    console.log(topicsDiv)
                    topicsDiv.addClass("gif");

                    console.log(topicsDiv)

                    // Creating a paragraph w/ rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image 
                    var topicsImage = $("<img>");
                    topicsImage.addClass("movemen");
                    // Setting the image to a property pulled off the result 
                    topicsImage.attr("src", results[i].images.fixed_height_still.url);
                    topicsImage.attr("data-still", results[i].images.fixed_height_still.url);
                    topicsImage.attr("data-animate", results[i].images.fixed_height.url);
                    topicsImage.attr("data-state", "still");



                    // Appending the paragraph and image to the topicsDiv
                    topicsDiv.append(p);
                    topicsDiv.append(topicsImage);
                    console.log(topicsDiv)
                    // Prependng the TopicsDiv to the HTML page in the "#gifs-appear-here" div
                    $("#animal-content").append(topicsDiv);


                }

            })
    }

    $(document).on("click", ".movemen", function () {
        // alert("clicked!")
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            console.log($(this).attr("data-animate"))
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


    // Function for displaying data
    function renderButtons() {

        // Deletes the animals to adding animals
        $("#buttons-view").empty();
        // Loops through the array
        for (var i = 0; i < animalTypes.length; i++) {
            var a = $("<button>");
            // Adds a class of dance to our button
            a.addClass("animals");
            // Added a data-attribute
            a.attr("data-name", animalTypes[i]);
            // Provided the initial button text
            a.text(animalTypes[i]);
            // Added the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This on click function handles events where a button is clicked
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var topics = $("#animal-input").val().trim();

        // pushes input to origin topics array and rerun render of buttons (new buttons)
        animalTypes.push(topics);
        $("#aminal-input").val("");
        renderButtons();
    });
    // On click event listener to all elements
    $(document).on("click", ".animals", displayGif);
    renderButtons();
});