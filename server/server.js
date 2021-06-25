const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

