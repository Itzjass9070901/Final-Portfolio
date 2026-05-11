// Step 1: 
const form= document.getElementById('validateForm');
const successMessage = document.getElementById('successMessage');

// Step 2: Define regex patterns for validation
const regexPatterns = {
    // Name: only letters and spaces
    name: /^[A-Za-z\s]+$/,
   
    // Username: 4-16 characters, letters, numbers, underscore
    username: /^[A-Za-z0-9_]{4,16}$/,
   
    // Email: standard email format
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
   
    // Phone: XXX-XXX-XXXX format
    phone: /^\d{3}-\d{3}-\d{4}$/,
   
    // Password: min 8 characters, 1 uppercase, 1 lowercase, 1 number
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
   
    // URL: must start with only https://
     url: /^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
   
    // Zipcode: 5 digits
    zipcode: /^\d{5}$/,
   
    // Date: MM-DD-YYYY format
    date: /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-\d{4}$/,
   
    // Credit Card: 16 digits, optional spaces or dashes
    creditcard: /^(\d{4}[-\s]?){3}\d{4}$|^\d{16}$/
};

// Step 3: Create a validation function for individual fields
function validateField(field, regex){
    // GEt the value and trim whitespace
    const value=field.value.trim();
    console.log(value);

    // Get the error element for this field
    const errorElement= document.getElementById(`${field.id}Error`);
    console.log(errorElement);

    // test if the input matches the regex pattern

    const isValid= regex.test(value);

    if(!isValid && value !== ''){
        // if not valid and not empty, show error
        field.classList.add('invalid');
        errorElement.style.display="block";
        return false;
    } else {
        // if valid or empty , hide error
        field.classList.remove('invalid');
        errorElement.style.display="none";
        return value !== '' ? true :false; // return true only if valid and not empty
    }       
}
// Step 4: Set up Input Event Listeners
for (const fieldName in regexPatterns)
{
    // Get the input element that corresponds to this regex pattern

    const inputField= document.getElementById(fieldName);
    // Make sure the element exist before adding event Listeners

    if(inputField){
        // Add REal-time validation as user types
    
        inputField.addEventListener('input', function(){
            validateField(this, regexPatterns[fieldName]);

        })
    }
}
//Step 5; to create form submit handler

function handleSubmit(event){
    // prevent form submitting normally
    event.preventDefault();
    // track if all field are valid
    let allValid = true;
    //loop through each field and validate
    for(const fieldName in regexPatterns)
    {
        const field = document.getElementById(fieldName);
        if(field)
        {
            // check if this field is valid ( and not empty)
            const isFieldValid= validateField(field,regexPatterns[fieldName]);

            // if any field is invalid or empty, form is not valid
            if(!isFieldValid){
                allValid=false;
            }
        }
    }
    // if all fields are valid, show success message
    if(allValid){
        successMessage.style.display="block";
        // optionally reset the form
        // form.reset()
    } else
    {
        successMessage.style.display="none";
    }
}

// Step 6 Add submit event Listener to the form
form.addEventListener('submit', handleSubmit);