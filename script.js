// Set items array equal to an empty array or equal to the local storage 'items' if it exists
const items = JSON.parse(localStorage.getItem("items")) || [];

updateListDisplay(items);


// When a user presses enter, the text in the input is added to the array of objects and to the list
$("#todoInput").on("keypress", function(e){
    if(e.which === 13){
        // get value and push to array
        let item = $(this).val();
        if(item === ""){
            return;
        } else {
            items.push(
                {
                    desc: item,
                    status: "in-progress"
                }
            );
        }
        
        updateListDisplay(items);

        // Clear the input 
        $(this).val("");
    }
});


// When a user clicks on the trash can icon (inside span), delete the entire parent li
$("ul").on("click", "span", function(e){
    e.stopPropagation();

    let deleteItem = $(this).parent();
    
    // Delete the corresponding element in the array
    let index = deleteItem.attr("data");
    items.splice(index, 1);

    // Delete the li from the html
    deleteItem.remove();

    updateListDisplay(items);
});


// When a user clicks on the list item itself, the item's status toggles to 'complete' or 'in-progress', but stays on the list
$("ul").on("click", "li", function(){
    var clickedItem = $(this);
    var index = clickedItem.attr("data");

    if(clickedItem.attr("status") === "in-progress"){
        items[index].status = "complete";
    } else if (clickedItem.attr("status") === "complete"){
        items[index].status = "in-progress";
    }
    
    updateListDisplay(items);
    
});


// update the list display with data and status attribute and class status as well as the todo item
function updateListDisplay(arr){
    // Empty list before we loop through the array and add its updated items to the list
    $("ul").empty();
    for(let i = 0; i < arr.length; i++){
        let item = "<li data=" + i + " " + "status=" + arr[i].status + " " + "class=" + arr[i].status + "><span><i class='fa fa-trash'></i></span>" + arr[i].desc + "</li>";

        $("ul").append(item);
        
    }

    // Save item to array in local storage
    localStorage.setItem("items", JSON.stringify(items));
}