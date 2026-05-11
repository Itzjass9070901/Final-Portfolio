// function calculate age

function calculateAge(){

    const birthdateInput = document.getElementById('birthdate').value;
    console.log(birthdateInput)

    //check if date is entered
    if (!birthdateInput) {
        document.getElementById('result').innerHTML = 'Please enter your birthdate';
        return;
    }

    //create date objects for birthdate and current date
     const birthDate = new Date(birthdateInput + 'T12:00:00');
    // const birthDate = new Date(birthdateInput);
    const today = new Date()

//calculate years
let years = today.getFullYear() - birthDate.getFullYear();
console.log(years)

// calculate months
let months = today.getMonth() - birthDate.getMonth();
console.log(months + 1)

let days = today.getDate() - birthDate.getDate();
console.log(days)
// mom i can't type good i surry
 if (days < 0) {
    months--;

    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
 }

 if (months < 0) {
    years--;
    months += 12;
    console.log(months)
 }

 const options = {
    weekday: 'long',
    years: 'numeric',
    month: 'long',
    day: 'numeric'
 };
 const formattedBirthdate = birthDate.toLocaleDateString('en-US', options);
 document.getElementById('result').innerHTML = `
        <strong>Your Birthdate:</strong> ${formattedBirthdate}
    <div class="age-breakdown">
        <div class="age-box">
            <div class="age-number">${years}</div>
            <div>Years</div>
        </div>
        <div class="age-box">
            <div class="age-numbers">${months}</div>
            <div>Months</div>
        </div>
        <div class="age-box">
            <div class="age-number">${days}</div>
            <div>Days</div> 
        </div>
    </div>
 
 `
}