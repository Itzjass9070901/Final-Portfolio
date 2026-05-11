// DOM Elements
const orderSection = document.getElementById('orderSection');
const trackerSection = document.getElementById('trackerSection');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const newOrderBtn = document.getElementById('newOrderBtn');
const pickedUpBtn = document.getElementById('pickedUpBtn');
const progressFill = document.getElementById('progressFill');
const estimatedTime = document.getElementById('estimatedTime');
const currentStatus = document.getElementById('currentStatus');
const orderNumber = document.getElementById('orderNumber');
const updateList = document.getElementById('updateList');
const notification = document.getElementById('notification');

// Step elements (progress indicators)
const steps = [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3'),
    document.getElementById('step4'),
    document.getElementById('step5')
];

// Timer variables
let countdownTimer;
let preparationTimer;

// Set delivery time randomly between 15-20 minutes
let minutesLeft = Math.floor(Math.random() * 6) + 15;
let secondsLeft = 0;
let currentStep = 0;

// Pizza preparation steps
const processSteps = [
    { name: "Order Received", duration: 60, progress: 0 },
    { name: "Preparing", duration: 120, progress: 20 },
    { name: "In the Oven", duration: 180, progress: 40 },
    { name: "Quality Check", duration: 60, progress: 60 },
    { name: "Ready for Pickup", duration: 0, progress: 100 }
];

placeOrderBtn.addEventListener('click', startDeliveryProcess);
newOrderBtn.addEventListener('click', resetProcess);
pickedUpBtn.addEventListener('click', markAsPickedUp);

function generateOrderNumber() {
    return Math.floor(10000 + Math.random() * 90000);
}
orderNumber.textContent = "#" + generateOrderNumber();

function startDeliveryProcess() {
    // Hide order section and show tracker
    orderSection.style.display = 'none';
    trackerSection.style.display = 'block';

    // Show notification
    showNotification("Your order has been placed!");

    // Add first update
    addUpdate("Order Received", "Your order has been received and is being processed.");

    // Start countdown timer
    startCountdown();

    // Start preparation steps
    startPreparation();

    // Scroll to tracker section
    trackerSection.scrollIntoView({ behavior: 'smooth' });
}

function startCountdown() {
    updateTimerDisplay();

    countdownTimer = setInterval(() => {
        if (secondsLeft === 0) {
            if (minutesLeft === 0) {
                clearInterval(countdownTimer);
                estimatedTime.textContent = "00:00";
                return;
            }
            minutesLeft--;
            secondsLeft = 59;
        } else {
            secondsLeft--;
        }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    estimatedTime.textContent = `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
}

function startPreparation() {
    updateStepProgress(0); // Start with the first step

    function processNextStep() {
        if (currentStep >= processSteps.length - 1) {
            minutesLeft = 0;
            secondsLeft = 0;
            updateTimerDisplay();
            showNotification("Your pizza is ready for pickup!");
            pickedUpBtn.style.display = 'inline-block';
            return;
        }

        currentStep++;
        updateStepProgress(currentStep);

        if (currentStep < processSteps.length - 1) {
            let currentDuration = processSteps[currentStep].duration;
            preparationTimer = setTimeout(processNextStep, currentDuration * 1000);
        } else {
            pickedUpBtn.style.display = 'inline-block';
        }
    }

    preparationTimer = setTimeout(processNextStep, processSteps[0].duration * 1000);
}

function updateStepProgress(stepIndex) {
    progressFill.style.width = `${processSteps[stepIndex].progress}%`;
    currentStatus.textContent = processSteps[stepIndex].name;

    for (let i = 0; i <= stepIndex; i++) {
        steps[i].classList.add('active');
        if (i < stepIndex) steps[i].classList.add('completed');
    }

    addUpdate(processSteps[stepIndex].name, getStatusMessage(stepIndex));
}

function getStatusMessage(stepIndex) {
    const messages = [
        "We've received your order and it's been sent to the kitchen.",
        "Our chefs are preparing your pizza with fresh ingredients.",
        "Your pizza is now baking in our brick oven at 700ºF.",
        "We're checking that your pizza meets our quality standards.",
        "Your pizza is ready! Please come to the counter to pick up your order."
    ];
    return messages[stepIndex];
}

function addUpdate(title, message) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updateItem = document.createElement('div');
    updateItem.className = 'update-item';

    updateItem.innerHTML = `
        <div class="update-time">${timeStr}</div>
        <div class="update-text">
            <strong>${title}</strong><br>
            ${message}
        </div>
    `;

    updateList.prepend(updateItem);
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function resetProcess() {
    clearInterval(countdownTimer);
    clearTimeout(preparationTimer);

    minutesLeft = 15;
    secondsLeft = 0;
    currentStep = 0;

    progressFill.style.width = '0%';
    currentStatus.textContent = 'Order Received';

    steps.forEach(step => {
        step.classList.remove('active', 'completed');
    });
    steps[0].classList.add('active');

    updateList.innerHTML = "";
    pickedUpBtn.style.display = 'none';

    orderNumber.textContent = "#" + generateOrderNumber();

    trackerSection.style.display = 'none';
    orderSection.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function markAsPickedUp() {
    addUpdate("Picked Up", "Pizza has been picked up by the customer. Enjoy your meal!");
    
    clearInterval(countdownTimer);
    clearTimeout(preparationTimer);

    currentStatus.textContent = "Picked Up";
    estimatedTime.textContent = "00:00";
    progressFill.style.width = "100%";
    progressFill.style.backgroundColor = "var(--accent-color)";

    showNotification("Thank you! Enjoy your pizza!");

    pickedUpBtn.disabled = true;
    pickedUpBtn.textContent = "Picked Up ✔";
}
