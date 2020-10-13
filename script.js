// Set items array equal to an empty array or equal to the local storage 'items' if it exists
const items = JSON.parse(localStorage.getItem("items")) || [];

updateListDisplay(items);


// When a user presses enter, the text in the input is added to the array and to the list
$("#todoInput").on("keypress", function(e){
    if(e.which === 13){
        // get value and push to array
        let item = $(this).val();
        if(item === ""){
            return;
        } else {
            items.push(item);
        }
        
        updateListDisplay(items);

        // Clear the input 
        $(this).val("");
    }
});


// When a user clicks on the trash can icon (inside span), delete the entire parent li
$("ul").on("click", "span", function(){
    let deleteItem = $(this).parent();
    
    // Delete the corresponding element in the array
    let index = deleteItem.attr("data");
    items.splice(index, 1);

    // Delete the li from the html
    deleteItem.remove();

    updateListDisplay(items);
});


// When a user clicks on the list item itself, the item is crossed off, but stays on the list
$("ul").on("click", "li", function(){
    $(this).toggleClass("complete");
});


// update the list display
function updateListDisplay(arr){
    // Empty list before we loop through the array and add its updated items to the list
    $("ul").empty();
    for(let i = 0; i < arr.length; i++){
        $("ul").append("<li data=" + i + "><span><i class='fa fa-trash'></i></span>" + arr[i] + "</li>");
    }

    // Save item to array in local storage
    localStorage.setItem("items", JSON.stringify(items));
}