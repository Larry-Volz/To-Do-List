// PLAN:
//connect to elements in the dom:
const toDoForm = document.querySelector('#toDoForm');
const toDoList = document.querySelector('ul#toDoList');
let toDoCounter = 0;


//****REMOVE THIS */
localStorage.clear();

//prime the localStorage
let toDosArray = [];

//**** DO TERNARY THAT MAKES SURE localStorage is empty first */
//________________________________________________________________________________________
localStorage.setItem('toDosArray', JSON.stringify(toDosArray))
const returnedData = JSON.parse(localStorage.getItem('toDosArray'))
//console.log(returnedData);

// function findObjectByKey(array, key, value) {
//     for (var i = 0; i < array.length; i++) {
//         if (array[i][key] === value) {
//             return array[i];
//         }
//     }
//     return "NOT FOUND";
// }


function makeToDoItem(userInput) {
    //create the li element
    newLi = document.createElement('li');
    newLi.classList.add("listItem");
    newLi.innerText = '\u00A0'+ userInput.value; //Unicode for space

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

    //add each element to the list in the dom
    toDoList.append(newLi);
    newLi.prepend(btn2);
    newLi.prepend(btn1);
    //console.log(newLi);
}


    // ADD A NEW TO DO (by submitting a form)

    // First prevent page refresh
    toDoForm.addEventListener('submit', function(e){
    e.preventDefault();

    //Get user input
    userInput = document.querySelector('#newToDo');

    if (userInput.value.length > 0){  //to prevent creating an empty "toDo"
    
    //make toDo list item and put in dom
    makeToDoItem(userInput);

    //save the new li/toDo to array & localStorage
    toDosArray.push({item:userInput.value, class:""});
    localStorage.setItem('toDosArray', JSON.stringify(toDosArray));

 
    //clear input for next entry
    userInput.value = '';
    }
})


// listen for events on ul#toDoList for changes
toDoList.addEventListener('click', function(e){
    console.log(e.target);

    //find that toDo item in array
    finderText = e.target.parentElement.innerText;
    finderText = finderText.slice(3);  //removed button text AND A SPACE from string

    //IF CHECKMARK BUTTON IS CLICKED
    if (e.target.className === "complete") {

        //Mark a todo as completed (cross out the text of the todo)
        e.target.parentElement.classList.toggle('completedItem');

        // find this item's index
        foundIndex = toDosArray.findIndex(x => x.item === finderText);

        //update class in this item's array object
        if (e.target.parentElement.classList.contains("completedItem")) {
            console.log("classList contains completedItem test PASSED - class should be blank");

            toDosArray[foundIndex]['class'] = "completedItem";
            console.log("class is: ", toDosArray[foundIndex]['class']);
            
         } else { 

        toDosArray[foundIndex]['class'] ="";



        }
        

        // toDosArray = toDosArray.slice(foundIndex,1);
        // console.log(`New toDosArray =`,toDosArray);

        //update the array in localStorage

        //OR IF DELET BUTTON IS PRESSED
     } else if (e.target.className === "delete") {

        // Remove a todo
        e.target.parentElement.remove();

        //delete from array
        //filter: evaluated as true are KEPT
        toDosArray = toDosArray.filter(x => x.item !==finderText);

        // show changes
        console.log(`New toDosArray =`,toDosArray);
        console.trace('elseif class = delete');

        // modify local storage
        // modify page
        
    
    }
    
    



})


