// PLAN:
//connect to elements in the dom:
const toDoForm = document.querySelector('#toDoForm');
const toDoList = document.querySelector('ul#toDoList');
let restoreData = "";
let toDosArray; //for global scope
// let toDoCounter = 0;


//RETRIEVE FROM localStorage
const storedData = JSON.parse(localStorage.getItem('toDosArray'))

if (!storedData) {                  //NOTE: Cool use of instructors || as a short-circuit evaluation
    //starting from fresh
    toDosArray=[]
    statusOutput();

} else {
    //re-loading data from local Storage
    toDosArray = storedData;
    statusOutput();

    for (let i = 0; i < toDosArray.length; i++) {
        restoreData = toDosArray[i]['item']; 
        classData = toDosArray[i]['class']; 
        restoreToDoItem(restoreData, classData); 
    }
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
    updateLocalStorage();

 
    //clear input for next entry
    userInput.value = '';
    statusOutput();
    }
})


// listen for events on ul#toDoList for changes
toDoList.addEventListener('click', function(e){
    //console.log(e.target);

    //find that toDo item in array
    finderText = e.target.parentElement.innerText;
    finderText = finderText.slice(3);  //removed button text AND A SPACE from string
                                        //for future version use a <span> instead
    //IF CHECKMARK BUTTON IS CLICKED
    if (e.target.className === "complete") {

        //Mark a todo as completed (cross out the text of the todo)
        e.target.parentElement.classList.toggle('completedItem');

        // find this item's index
        foundIndex = toDosArray.findIndex(x => x.item === finderText);
        //console.log("index of modified item = ", foundIndex);

        //UPDATE CLASS in this item's array object
        //console.log("classList = ", e.target.classList);
        if (e.target.parentElement.classList.contains("completedItem")) {

            toDosArray[foundIndex]['class'] = "completedItem";
            updateLocalStorage();
            statusOutput();
            
         } else { 

            toDosArray[foundIndex]['class'] ="";
            updateLocalStorage();
            statusOutput();

        }
        

        //OR IF DELETE BUTTON IS PRESSED
     } else if (e.target.className === "delete") {

        // Remove a todo
        e.target.parentElement.remove();

        //delete from array
        //filter: evaluated as true are KEPT
        toDosArray = toDosArray.filter(x => x.item !==finderText);
        
        //update the array in localStorage
        updateLocalStorage();
        statusOutput();

        // show changes

    }
    
    



})



//**************************************************************************** */
//*                                    FUNCTIONS                               */
//**************************************************************************** */


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

function restoreToDoItem(restoreData, classData) {
    //create the li element
    newLi = document.createElement('li');
    newLi.classList.add("listItem");

    if (classData) { newLi.classList.add(classData) }
    
    newLi.innerText = '\u00A0'+ restoreData; //Unicode for space

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


function updateLocalStorage() {
    localStorage.removeItem(toDosArray);
    localStorage.setItem('toDosArray', JSON.stringify(toDosArray));
}

function statusOutput() {
    console.log("#############################################################################")
    console.log("TO DO'S ARRAY");
    console.table(toDosArray);

    console.log("\n\n")
    console.log("-----------------------------------------------------------------------------")
    
    let lsReadable = JSON.parse(localStorage.getItem('toDosArray'));
    console.log("LOCAL STORAGE");
    console.table(lsReadable);
    console.log("#############################################################################")

}

