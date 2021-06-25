const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});


let equationHistory = [];


app.get('/equationHistory', function(req,res){
    console.log('sending history array');
    res.send(equationHistory);
})

app.post('/equalButton', function(req, res){
    console.log('receiving equation,', req.body);
    let equation = req.body.calculatorObject;
    console.log('new equation', equation);
    getResponseToPost(equation);
    //equationHistory.push(equation); // Do this as a function instead?!
    res.sendStatus(201);
})


// function that handles and creates a new object to resend to the client

function getResponseToPost(equation){
    let stringEval = convertPost(equation);
    equation.answer = stringEval;
    console.log(stringEval)
    console.log (equation);
    equationHistory.push(equation);
    console.log(equationHistory);
}


function convertPost(equationObject){
    let equationString = ''
    for (property in equationObject){
        equationString += equationObject[property]
    }
    console.log(equationString)
    return eval(equationString);
}