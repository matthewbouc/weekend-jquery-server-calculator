// Known bugs - dividing by 0.000s sends null to server (only solution might be server side)

$(document).ready(readyNow);

//object is used to accept inputs, then POST to server
let calculatorObject = {
    inputOne: '',
    operationInput: '',
    inputTwo: '',
};

// variable used to hold the calculator input
let inputDisplay = ''


/**
 * Runs on document load.  Initiates multiple .on('click') functions.
 * Retrieves any previous calculation history from the server.
 */
function readyNow(){ // runs on document load
    //console.log('in JQ');
    $('#onlyInput').prop('disabled', true); // blocks user from typing info into input.
    $('.operationButton').on('click', getOperationButton); // on operand button click
    $('#equalSign').on('click', equalButtonPushed); // on = button click
    $('#clearButton').on('click', clickClearButton); // on C button click
    $('.numberButton').on('click', appendButtonClicks); // on number button click
    $('#clearHistory').on('click', deleteCalculationHistory); // on clear history button click
    $('#calculationHistory').on('click','.previousCalc', rerunCalculation); // on previous calculation click
    $('#backspace').on('click', backspaceButton);
    getCalculationHistory(); // retrieves stored server data on page load.
}


/**
 * When numbers or . is clicked, add to display and inputDisplay variable.
 */
function appendButtonClicks(){
    let buttonClick = $(this).attr('id');
    //console.log(buttonClick);
    inputDisplay += buttonClick;
    //console.log(inputDisplay);
    $('#onlyInput').val(inputDisplay);
}

/**
 * Removes last clicked button from displayInput and DOM.
 * Checks if removed value is an operand, if so resets calculatorObject.operationInput.
 */
function backspaceButton(){
    //console.log('backspace pushed')
    console.log(inputDisplay)
    const removedValue = inputDisplay.slice(-1);
    inputDisplay = inputDisplay.slice(0,-1);
    //console.log(removedValue);
    const possibleOperands = '+*-/'
    if (possibleOperands.indexOf(removedValue) >= 0) {
        calculatorObject.operationInput = '';
    }
    $('#onlyInput').val(inputDisplay);
}


/**
 * clears calculatorObject properties to prevent duplicate entries
 */
function clearCalculatorObject(){
    calculatorObject = {
        inputOne: '',
        operationInput: '',
        inputTwo: '',
    }
}


/**
 * Clears DOM number inputs and answer display on C click. Clears inputDisplay
 */
function clickClearButton(){ // GOOD
    $('.numberInputs').val('');
    $('#answer').empty();
    inputDisplay = ''
    clearCalculatorObject();
}


/**
 * sends DELETE request to server to delete History array. Updates DOM.
 */
function deleteCalculationHistory(){
    $.ajax({
        method: 'DELETE',
        url: '/equationHistory'
    })
    .then(function(response){
        console.log(`successful delete`, response);
        getCalculationHistory();
        updateInputDisplay('');
    })
    .catch(function(error){
        console.log(`Error`, error);
    })
}


/**
 * On = click, Runs getNumberInputs(). If inputs are empty, triggers alert. Initiates POST to server.
 */
function equalButtonPushed(){
    retrieveNumberInputs();
    console.log(calculatorObject)
    if(!calculatorObject.inputOne || !calculatorObject.operationInput || !calculatorObject.inputTwo || calculatorObject.inputOne == 'E' 
        || calculatorObject.inputOne == 'null' || calculatorObject.inputTwo == 0 && calculatorObject.operationInput == '/'){
        //alert('Number inputs and operand required')
        updateInputDisplay('E');
        calculatorObject.inputOne = 'E'
    } else {
        //console.log('sending to server...')
        postCalculationToServer();
        clearCalculatorObject();
    }
}


/**
 * Runs GET request to server at /equationHistory.  Processes data response.
 */
function getCalculationHistory(){
    $.ajax({
        method: 'GET',
        url: '/equationHistory',
    })
    .then(function (response){
        console.log('Received Inventory List', response);
        // RUN DISPLAY HISTORY HERE(response);
        processGetArray(response);
    })
    .catch(function(error){
        console.log('Error', error);
    })
}


let operatorHolder;

/**
 * Runs on click of an operation button.  Assigns to calculatorObject.
 * Allows user to string together calculations without clicking equal.
 */
function getOperationButton(){
    if (calculatorObject.operationInput){
        //alert(`Operand already selected.  Clear or submit calculation`)
        operatorHolder = $(this).attr('id');
        equalButtonPushed()
        // inputDisplay += operatorHolder;
        // $('#onlyInput').val(inputDisplay);
    } else {
        let operation = $(this).attr('id');
        inputDisplay += operation;
        $('#onlyInput').val(inputDisplay);
        calculatorObject.operationInput = operation;
        //console.log(`operator selected:`, operation)
        //console.log(calculatorObject)
    }
}


/**
 * POST request to server containing finalized calculatorObject.
 * On successful POST, initiates getCalculationHistory()
 */
function postCalculationToServer(){
    $.ajax({
        method: 'POST',
        url: '/equalButton',
        data: {calculatorObject}
    })
    .then(function(response){
        console.log('equation sent', response)
        // RUN THE GET RESPONSE HERE
        getCalculationHistory();
    })
    .catch(function(error){
        console.log('Error', error)
    })
}


/**
 * Empties previous DOM answer and history. Appends new answer and updated history.
 * @param {array} responseArray 
 */
function processGetArray(responseArray){
    $('#calculationHistory').empty()
    if (responseArray.length > 0){
        updateInputDisplay(responseArray[responseArray.length-1].answer);
        for (object of responseArray){
            $('#calculationHistory').append(
                `<li class="previousCalc" id="${object.answer}">${object.inputOne} ${object.operationInput} ${object.inputTwo} = ${object.answer}</li>`
            )
        }
    } else {
        $('#calculationHistory').append(`No Calculation History`)
    }
}


/**
 * Allows user to click on a DOM history calculation and 'rerun' it.
 * Sets the answer to the input display.
 */
function rerunCalculation(){
    const returnAnswer = $(this).attr('id');
    updateInputDisplay(returnAnswer);
    clearCalculatorObject();
}


/**
 * Takes the value of the input and creates an Object that is ready for POST.
 */
 function retrieveNumberInputs(){
    const stringInput = $('#onlyInput').val();
    console.log(`stringInput`, stringInput);
    const operandUsed = calculatorObject.operationInput;
    if (stringInput[0] == '-'){
        const newString= stringInput.slice(1);
        const inputArray = newString.split(operandUsed);
        calculatorObject.inputOne = '-' + inputArray[0];
        calculatorObject.inputTwo = inputArray[1];
    } else {
        const inputArray = stringInput.split(operandUsed);
        calculatorObject.inputOne = inputArray[0];
        calculatorObject.inputTwo = inputArray[1];
        console.log(inputArray);
    }
}


/**
 * Takes in a parameter which will become the new input display.
 * @param {String} displayString 
 */
function updateInputDisplay(displayString){
    inputDisplay = String(displayString); // change global variable
    if (operatorHolder){ // Allows user to string together operations without clicking equal
        inputDisplay += operatorHolder;
        calculatorObject.operationInput = operatorHolder;
    }
    $('#onlyInput').val(inputDisplay); // change DOM
    operatorHolder = '';
}