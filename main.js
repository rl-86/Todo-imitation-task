// JavaScript
console.log("main.js is loaded...");


//My HTML element variables
const input = document.querySelector("#todoInput");
const list = document.querySelector("ul");
const button = document.querySelector("#addTodo");
const info = document.querySelector("small");
const completedInfo = document.querySelector("p");
const title = document.querySelector("h1");


//My JS variables
let completedCount = 0;
const todoArray = [];
const simpleTodoArray = [];

// Example 
function simpleStuff(printThis) {
    console.log(printThis);
}

title.addEventListener("click", function () {
    let theStuff = title.firstChild.textContent;
    simpleStuff(theStuff);
})

// Function to handle change status on object in array
// Takes paraneter completed (bool)
function changeStatus(todoText, completed) {

    // Find index, look in objects and value on "name"
    let correctIndex = todoArray.map(t => t.name).indexOf(todoText);


    // Change status on the object at correct index
    todoArray[correctIndex].status = completed;

}

// To use "Enter" in input field
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("addTodo").click();
    }
})


// Listen to button click
button.addEventListener("click", function () {

    //Fetch value from input
    const text = input.value;

    //Check if input is empty
    if (text.length == 0) {
        info.innerText = "Input must not be empty";
        return;
    }
    else {
        info.innerText = "";
    }

    // Add todo to todoArray
    const todoObject = { name: text, status: false };
    todoArray.push(todoObject);

    // Add todo to our simple todoArray
    simpleTodoArray.push(text);

    // Create li element to ul
    const item = document.createElement("li");
    list.appendChild(item);

    // Create a p-element in our new li and add text
    const itemLabel = document.createElement("span");
    itemLabel.innerText = text;
    item.appendChild(itemLabel);

    // Create span element that has a trashcan
    const trashcan = document.createElement("span");
    // Trashcan icon
    trashcan.innerHTML = "&#x1f5d1;";

    // X icon as trashcan
    //trashcan.innerHTML = "&#128942;";
    trashcan.setAttribute("CLASS", "trashcan");
    item.appendChild(trashcan);


    // Add listener to the span
    itemLabel.addEventListener("click", function () {

        // Toggle completed/uncompleted ToDo's
        if (item.getAttribute("class") == "completed") {

            item.setAttribute("class", "");

            // Change status on object in array to false
            let clickedText = item.firstChild.firstChild.textContent;
            changeStatus(clickedText, false);
            completedCount--
        }
        else {
            item.setAttribute("class", "completed");

            // Change status on object in array to true
            let clickedText = item.firstChild.firstChild.textContent;
            changeStatus(clickedText, true);
            completedCount++
        }

        completedInfo.innerText = `${completedCount} completed`;
    })

    // Add listener to the trashcan
    trashcan.addEventListener("click", function () {

        // set compled correct
        if (item.getAttribute("class") == "completed") {
            completedCount--
            completedInfo.innerText = `${completedCount} completed`;
        }

        // Set todoArray correct
        let removeText = item.firstChild.firstChild.textContent;
        let indexToRemove = simpleTodoArray.indexOf(removeText)
        simpleTodoArray.splice(indexToRemove, 1);

        // remove li element
        item.remove();

    })


    //Empty input field
    input.value = "";

});
