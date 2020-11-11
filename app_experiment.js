// PLAN:
//connect to elements in the dom:
const toDoForm = document.querySelector('#toDoForm');
const toDoList = document.querySelector('ul#toDoList');
let toDoCounter = 0;


//****REMOVE THIS */
localStorage.clear();

//prime the localStorage
let toDosArray = [];
localStorage.setItem('toDosArray', JSON.stringify(toDosArray))
const returnedData = JSON.parse(localStorage.getItem('toDosArray'))
//console.log(returnedData);


function makeToDoItem(userInput) {

    //create the delete button
    btn1 = document.createElement('BUTTON');
    btn1.classList.add("delete");
    btn1.innerText='\u2717'; //unicode for cross
    //console.log(btn1);

    //create the check-as-completed button
    btn2 = document.createElement('BUTTON');
    btn2.classList.add("complete");
    btn2.innerText='\u2713'; //unicode for checkmark
    //console.log(btn2);

    //create the li element
    newLi = document.createElement('li');
    newLi.innerText = '\u00A0'+ userInput.value;
    newLi.innerHTML += '<br>';
    newLi.classList.add("listItem");

    //add each element to the list in the dom
    toDoList.append(btn1);
    toDoList.append(btn2);
    toDoList.append(newLi);
    //console.log(newLi);
}


    // ADD A NEW TO DO (by submitting a form)

    // First prevent page refresh
    toDoForm.addEventListener('submit', function(e){
    e.preventDefault();

    //Get user input
    userInput = document.querySelector('#newToDo');
    
    //make list item and put in dom
    makeToDoItem(userInput);

    //save the new li/toDo to array & localStorage
    toDosArray.push({"item":userInput.value, "class":""});
    localStorage.setItem('toDosArray', JSON.stringify(toDosArray));

 
    //clear input for next entry
    userInput.value = '';
})


// listen for events on ul#toDoList for changes
toDoList.addEventListener('click', function(e){
    console.log(e.target);

    //if checkmark button is clicked
    if (e.target.className === "complete") {

        //Mark a todo as completed (cross out the text of the todo)
        e.target.parentElement.classList.toggle('completedItem');
        //find & update that toDo item in array
        finderText = e.target.innerText;
        console.log(`${finderText} was completed`);

        //update the array in localStorage

     } else if (e.target.className === "delete") {

        // Remove a todo
        e.target.parentElement.remove();

        // modify local storage
        // modify page
        
    
    }
    
    



})


