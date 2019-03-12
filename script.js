var topics = ["cheese", "zelda", "chocolate", "more chocolate"];

showButtons();
function showButtons() {
    $("#buttons-div").empty();

    for (var i = 0; i < topics.length; i++) {
        var topicButton = $("<button>");
        topicButton.addClass("topic");
        topicButton.attr("topic-data", topics[i]);
        topicButton.text(topics[i]);

        $("#buttons-div").append(topicButton);
    }
}

$("#add-topic").on("click", function (event) {
    event.preventDefault();

    var topic = $("#topic-input").val().trim();

    topics.push(topic);

    $("#topic-form")[0].reset();

    showButtons();
});

$(document).on("click", ".topic", function () {
    $("#gifDisplayContainer").empty();
    var topic = $(this).attr("topic-data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=fU9aqiuySTdE530XsODvbOTRXnSREONa&limit=10";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var topicImageDiv = $("<div>");
            topicImageDiv.addClass("topicImageDiv");
            var p = $("<p>");
            p = "Rating: " + results[i].rating + "<br />";
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("static-url", results[i].images.fixed_height_still.url);
            topicImage.attr("active-url", results[i].images.fixed_height.url);
            topicImage.addClass("topicImage");
            topicImage.attr("gif-state", "still");
            topicImageDiv.append(p);
            topicImageDiv.append(topicImage);
            $("#gifDisplayContainer").prepend(topicImageDiv);
            console.log(topicImage);
        }

    });
});

$(document).on("click", ".topicImage", function () {
    console.log("image clicked");
    if ($(this).attr("gif-state") === "still") {
        $(this).attr("gif-state", "animate");
        $(this).attr("src", $(this).attr("active-url"));

    } else {
        $(this).attr("gif-state", "still");
        $(this).attr("src", $(this).attr("static-url"));
    };
});