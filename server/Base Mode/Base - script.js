$(document).ready(readyNow);

//object is used to accept inputs, then POST to server
let calculatorObject = {
    inputOne: '',
    operationInput: '',
    inputTwo: '',
};

/**
 * Runs on document load.  Initiates multiple .on('click') functions.
 * Retrieves any previous calculation history from the server.
 */
function readyNow(){ // runs on document load
    //console.log('in JQ');
    $('.operationButton').on('click', getOperationButton); // on +, -, *, / button click
    $('#equalSign').on('click', equalButtonPushed); // on = button click
    $('#clearButton').on('click', clickClearButton); // on C button click
    getCalculationHistory(); // retrieve any stored server history
}


/**
 * Clears DOM number inputs and answer display on C click
 */
function clickClearButton(){
    $('.numberInputs').val('');
    $('#answer').empty();
}


/**
 * On = click, Runs getNumberInputs(). If inputs are empty, triggers alert. Initiates POST to server.
 */
function equalButtonPushed(){
    getNumberInputs();
    console.log(calculatorObject)
    if(calculatorObject.inputOne == '' || calculatorObject.operationInput == '' || calculatorObject.inputTwo == ''){
        alert('Number inputs and operand required')
    } else {
        //console.log('sending to server...')
        postCalculationToServer();
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
 * Retrieves values from number inputs and assigns them to calculatorObject.
 */
function getNumberInputs(){
    let firstInput = $('#firstInput').val();
    let secondInput = $('#secondInput').val();
    calculatorObject.inputOne = firstInput;
    calculatorObject.inputTwo = secondInput;
}


/**
 * Runs on click of an operation button.  Assigns to calculatorObject.
 */
function getOperationButton(){
    let operation = $(this).attr('id');
    calculatorObject.operationInput = operation;
    //console.log(`operator selected:`, operation)
    //console.log(calculatorObject)
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
    $('#answer').empty();
    $('#calculationHistory').empty()
    if (responseArray.length > 0){
        $('#answer').append(responseArray[responseArray.length-1].answer);
        for (object of responseArray){
            $('#calculationHistory').append(
                `<li>${object.inputOne} ${object.operationInput} ${object.inputTwo} = ${object.answer} </li>`
            )
        }
    } else {
        $('#calculationHistory').append(`No Calculation History`)
    }
}