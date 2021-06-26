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
    $('.operationButton').on('click', getOperationButton); // on +, -, *, / button click
    $('#equalSign').on('click', equalButtonPushed); // on = button click
    $('#clearButton').on('click', clickClearButton); // on C button click
    $('.numberButton').on('click', appendButtonClicks);
    $('#clearHistory').on('click', deleteCalculationHistory);
    $('#calculationHistory').on('click','.previousCalc', rerunCalculation)
    getCalculationHistory(); // retrieve any stored server history
}


/**
 * When numbers or . is clicked, add to display and inputDisplay variable.
 */
function appendButtonClicks(){
    let buttonClick = $(this).attr('id');
    console.log(buttonClick);
    inputDisplay += buttonClick;
    console.log(inputDisplay);
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
    if(calculatorObject.inputOne == '' || calculatorObject.operationInput == '' || calculatorObject.inputTwo == ''){
        alert('Number inputs and operand required')
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


/**
 * Runs on click of an operation button.  Assigns to calculatorObject.
 */
function getOperationButton(){
    if (calculatorObject.operationInput){
        alert(`Operand already selected.  Clear or submit calculation`)
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
        updateInputDisplay(responseArray[responseArray.length-1].answer);////
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
    const inputArray = stringInput.split(operandUsed);
    calculatorObject.inputOne = inputArray[0];
    calculatorObject.inputTwo = inputArray[1];
    console.log(inputArray);
}


/**
 * Takes in a parameter which will become the new input display.
 * @param {String} displayString 
 */
function updateInputDisplay(displayString){
    inputDisplay = displayString
    $('#onlyInput').val(inputDisplay)
}