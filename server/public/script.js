$(document).ready(readyNow);

let calculatorObject = {
    inputOne: '0',
    operationInput: '0',
    inputTwo: '0',
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


// Get input 2

// Get = button

// get C button

// Create an object that all manth inputs get sent to

//GET request - need this to happen on page load and on equal button

//POST request