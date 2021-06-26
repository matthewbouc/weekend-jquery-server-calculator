$(document).ready(readyNow);

let calculatorObject = {
    inputOne: '',
    operationInput: '',
    inputTwo: '',
};


function readyNow(){
    console.log('in JQ');
    $('.operationButton').on('click', getOperationButton);
    $('#equalSign').on('click', equalButtonPushed);
    $('#clearButton').on('click', pushClearButton);
    getCalculationHistory();
}

function getOperationButton(){
    let operation = $(this).attr('id');
    calculatorObject.operationInput = operation;
    console.log(`operator selected:`, operation)
    console.log(calculatorObject)
}



function equalButtonPushed(){
    getNumberInputs();
    console.log(calculatorObject)
    if(calculatorObject.inputOne == '' || calculatorObject.operationInput == '' || calculatorObject.inputTwo == ''){
        alert('Number inputs and operand required')
    } else {
        console.log('sending to server...')
        postCalculationToServer();
    }
}


// Get input 1 // get input 2

function getNumberInputs(){
    let firstInput = $('#firstInput').val();
    let secondInput = $('#secondInput').val();
    calculatorObject.inputOne = firstInput;
    calculatorObject.inputTwo = secondInput;
}


function pushClearButton(){
    $('.numberInputs').val('');
    $('#answer').empty();
}



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

//POST request

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
