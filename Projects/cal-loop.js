//create js to perform aritmetic opperation on any two entered values.
const prompt = require("prompt-sync")();
let a = 90,
  b = 96; // two opperands a,b
let operator = " "; // operator such as +, -,*,
let c = 0;

let choices = ""; //variavle choices will aceept y or n
choices = prompt("Do you want to use the calculator, enter y or n");

while (choices === "y") {
  // accept operator from the user
  operator = prompt("Enter any aritmetic operator +, -, *, /");
  if (operator === "+") {
    c = a + b; //additon
    console.log("the result", c);
  } else if (operator === "-") {
    c = a - b;
    console.log("the result", c);
  } else if (operator === "*") {
    c = a * b;
    console.log("the result", c);
  } else if (operator === "/") {
    c = a / b;
    console.log("the result", c);
  } else {
    console.log("Invalid Operator");
  }

  choices = prompt("Do you want to use the calculator, enter y or n");
  if (choices === "n") {
    break; 
  }
} // end of the line
