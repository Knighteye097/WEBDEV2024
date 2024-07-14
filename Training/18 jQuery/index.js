$("h1").addClass("h1-font");


$(document).keydown(function(event){
    $("h1").text(event.key);
})