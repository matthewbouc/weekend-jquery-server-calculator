$(document).ready(readyNow);

let calculatorObject = {
    inputOne: '',
    operationInput: '',
    inputTwo: '',
};


function readyNow(){
    console.log('in JQ')
    $('.operationButton').on('click', getOperationButton)
}

function getOperationButton(){
    let operation = $(this).attr('id');
    calculatorObject.operationInput = operation;
    console.log(`operator selected:`, operation)
    console.log(calculatorObject)
}




// Get input 1

function getNumberInputs(){
    let firstInput = $('#firstInput').val();
    let secondInput = $('#secondInput').val();
    calculatorObject.inputOne = firstInput;
    calculatorObject.inputTwo = secondInput;
}

// Get input 2

// Get = button

// get C button

// Create an object that all manth inputs get sent to

//GET request - need this to happen on page load and on equal button

//POST request