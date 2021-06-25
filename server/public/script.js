$(document).ready(readyNow);

let calculatorObject = {
    inputOne: '',
    operationInput: '',
    inputTwo: '',
};


function readyNow(){
    console.log('in JQ');
    $('.operationButton').on('click', getOperationButton);
    $('#equalSign').on('click', equalButtonPushed)
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
        // RUN THE POST SEQUENCE HERE
    }
}


// Get input 1 // get input 2

function getNumberInputs(){
    let firstInput = $('#firstInput').val();
    let secondInput = $('#secondInput').val();
    calculatorObject.inputOne = firstInput;
    calculatorObject.inputTwo = secondInput;
}


// Get = button

// get C button

// Create an object that all manth inputs get sent to

//GET request - need this to happen on page load and on equal button

//POST request