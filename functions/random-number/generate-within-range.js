//This is a simple demostration of how to generate random integer between two numbers.

//Here is an example of how to get random integer between 11 and 79
const randomNum = Math.floor(Math.random() * (79 - 11 + 1)) + 11;
console.log(randomNum);

//Here Math.random() generates a random number between 0 and 1. It's range is 0 ≤ number < 1
//Using this logic we first generate a number between 0 to {the biggest number(79) - the smallest number(11) + 1}(69)
//Math.floor() is used to round down the number to the nearest integer.
//so, now we have a number between 0 to 68.
//by adding 11 we get a number between 11 to 79.