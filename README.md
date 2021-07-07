# SERVER SIDE CALCULATOR

Weekend Challenge.

## Description

The goal of this project was to create a calculator on the client side that performed and stored calculations on a node/express server.  This project required using jQuery to handle button clicks and references to the DOM.  Inputs were accepted from the DOM then POSTed to the express server as an object.  The object was dismantled to its components so that the server .js file could evaluate the equation (w/o using eval()).  The equation and answer were then stored in an array, which could be obtained by the client through a GET request.  The GET request processes the information and appends it the DOM.

Calculator functionality - 
- Calculation format is (Number)(Operator)(Number)
- C will clear the input
- Backspace arrow removes the last clicked button input
- Clear History deletes all stored calculations on the server
- Clicking previous calculations will append the answer to the current calculator input
- An operator can be pushed instead of the equals button to string multiple calculations

The user will get an 'E' for error when trying to:
- Divide by zero
- Enter two operators without a valid number in between them
- Enter incorrectly formatted numbers

Your project description goes here. What problem did you solve? How did you solve it?

Image of [Calculator](https://github.com/matthewbouc/weekend-jquery-server-calculator/blob/master/images/Calculator.png).


## Installation:

 - Fork and clone repo
 
 While in repo folder terminal
 - 'npm install'
 - 'npm start'

 - Go to:  http://localhost:5000


## Built With:

jQuery
Node/Express