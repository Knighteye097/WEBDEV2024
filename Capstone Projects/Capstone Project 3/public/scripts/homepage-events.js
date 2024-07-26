$("#create-new-blog").click(function(){
    $(".create-edit-form").removeClass("hide");
});

$("#SaveButton").click(function(){
    $(".create-edit-form").addClass("hide");
});

$("#DiscardButton").click(function(){
    $(".create-edit-form").addClass("hide");
});

$(".editable").hover(function(){
    $(this).removeClass("bg-body-secondary");
    $(this).addClass("bg-white")
}, function(){
    $(this).css("background-color", "rgba(0, 0, 0, 0)");
    $(this).addClass("bg-body-secondary");
});

$(".editable").click(function(){ 
    // Logging the contents
    let title = $(this).find("#editBlogTitle").text();
    let content = $(this).find("#editBlogContent").text().trim();
    let author = $(this).find("#editBlogAuthor").text();

    $(".create-edit-form").removeClass("hide");
    $("#blogTitle").val(title);
    $("#blogContent").val(content);
    $("#blogAuthor").val(author);
});