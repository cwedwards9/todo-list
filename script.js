// When a user presses enter, the text in the input is added to the list
$("#todoInput").on("keypress", function(e){
    if(e.which === 13){
        var listItem = $(this).val();
        $("ul").append("<li><span><i class='fa fa-trash'></i></span>" + listItem + "</li>");
        $(this).val("");
    }
});

// When a user clicks on the trash can icon (inside span), that whole li it is nested in is deleted
$("ul").on("click", "span", function(){
    $(this).parent().remove();
});

// When a user clicks on the list item itself, the item is crossed off, but stays on the list
$("ul").on("click", "li", function(){
    $(this).toggleClass("complete");
})