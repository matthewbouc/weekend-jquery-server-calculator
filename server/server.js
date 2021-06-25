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


app.get('/equationHistory'), function(req,res){
    console.log('sending history array');
    res.send(equationHistory);
}

app.post('/equalbutton'), function(req, res){
    console.log('receiving equation,', req.body);
    let equation = req.body.calculatorObject;
    console.log('new equation', equation);
    equationHistory.push(equation);
    res.sendStatus(201);
}