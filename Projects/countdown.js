//create function name as calculateDays

function calculateDays(){
    //get the birthday date from input

    let birthdayInput = document.getElementById('birthdayInput').value
    let birthdayDate = new Date(birthdayInput + 'T12:00:00')

    // get todays date
    let today = new Date();

    // set the birthday to this year
    birthdayDate.setFullYear(today.getFullYear());

    // if birthday has pass this year , add 1 year
    if(today > birthdayDate){
        birthdayDate.setFullYear(today.getFullYear() + 1);
        // console.log(birthdayDate.setFullYear(today.getFullYear() + 1))
        // console.log(birthdayDate)
    }

    // Calculate the difference in days
    let diffTime = birthdayDate - today
    console.log(diffTime)

    //convert timestamps into days
    let diffDays = Math.ceil(diffTime /(1000 * 60 * 60 * 24))
console.log(" Days left for Birthday" + diffDays)

 // display results
 let resultDiv = document.getElementById('result')
 resultDiv.innerHTML = `Your birthday is in ${diffDays} days`

}