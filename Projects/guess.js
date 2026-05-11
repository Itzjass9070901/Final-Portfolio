// GEnerate a random number between 1 and 100
let randomNumber = Math.floor(Math.random()* 100) +1;
//variable attempts will keep track of attemps
let attempts=0;

// function to check the user guess
function checkGuess(){
    const guessInput = document.getElementById('guess');
    const feedback = document.getElementById('feedback');
    const userGuess= Number(guessInput.value);
    if(!userGuess || userGuess <1 || userGuess >100)
    {
        feedback.innerHTML= 'Please enter a valid number 1 and 100';
        return;
    }
    attempts++;

 if(userGuess === randomNumber)
 {
    feedback.innerHTML = ` Congratulations ! You guessed the number in ${attempts} attempts `;
    feedback.style.color='red';
 } else if (userGuess > randomNumber){
    feedback.innerHTML = "Too High ! Try Again ";
    feedback.style.color='red';
 } else {
    feedback.innerHTML = "Too Low ! Try Again ";
    feedback.style.color='red';
 }

}


// reset game
function resetGame(){
    randomNumber=Math.floor(Math.random() * 100) +1;
    attempts=0;
    document.getElementById('guess').value= "";
    document.getElementById('feedback').innerHTML= ""; 
}