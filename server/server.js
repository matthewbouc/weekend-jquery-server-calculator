// setup basic server requirements
const express = require('express');
const bodyparser = require('body-parser');


const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//server to listen at specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

//server-side 'database'.  Holds previous calculations
let equationHistory = [];

//GET request from client will receive equationHistory from server.
app.get('/equationHistory', function(req,res){
    console.log('sending history array');
    res.send(equationHistory);
})
//POST request from client will process equation, store it, then send the data back to client.
app.post('/equalButton', function(req, res){
    console.log('receiving equation,', req.body);
    let equation = req.body.calculatorObject;
    console.log('new equation', equation);
    getResponseToPost(equation);
    //equationHistory.push(equation); // Do this as a function instead?!
    res.sendStatus(201);
})
//DELETE request from client will empty the equationHistory array.
app.delete('/equationHistory', function(req,res){
    console.log('deleting history array');
    equationHistory = [];
    res.sendStatus(201);
})



/**
 * Accepts the inputs and operand Object, breaks it apart, and performs the calculation
 * @param {Object} equationObject 
 * @returns equation answer
 */
function convertPost(equationObject){
    const firstProperty = Number(equationObject.inputOne);
    const secondProperty = equationObject.operationInput;
    const thirdProperty = Number(equationObject.inputTwo);
    switch (secondProperty) {
        case '+':
            return firstProperty + thirdProperty;
            break;
        case '-':
            return firstProperty - thirdProperty;
            break;
        case '*':
            return firstProperty * thirdProperty;
            break;
        case '/':
            return firstProperty / thirdProperty;
            break;
        default:
            break;
    }
}

/**
 * Accepts the Object from client, runs convertPost(), adds new Object with answer to equationHistory
 * @param {Object} equation 
 */
function getResponseToPost(equation){
    let stringEval = convertPost(equation);
    equation.answer = stringEval;
    //console.log(stringEval)
    //console.log (equation);
    equationHistory.push(equation);
    //console.log(equationHistory);
}
