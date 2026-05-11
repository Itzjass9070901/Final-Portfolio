document.getElementById('startButton').addEventListener('click', function() {
    const testParagraph = document.getElementById('testParagraph').innerText;
    const typingArea = document.getElementById('typingArea');
    const resultDisplay = document.getElementById('result');

    //Enable and clear the typing area
    typingArea.disabled = false;
    typingArea.value = '';
    resultDisplay.innerText = '';
    typingArea.focus();

    let startTime = null;

    // function to calculate typing speed
    function calculateSpeed() {
        if (!startTime) {
            startTime = new Date().getTime();
        }
        const currentTime = new Date().getTime();
        const totalTime = (currentTime - startTime) / 1000;
        const textEntered = typingArea.value.trim();
        const wordCount = textEntered.split(/\s+/).length;
        const speed = Math.round((wordCount / totalTime)* 60);
        return speed;
    }
    typingArea.addEventListener('input', function() {
        const speed = calculateSpeed();
        const textEntered = typingArea.value;

        if(textEntered === testParagraph) {
            typingArea.disabled = true;
            const finalSpeed = calculateSpeed();
            resultDisplay.innerText = `Congratulations! You've completed the text. Your typing speed ${finalSpeed} wod per`
        } else {
            resultDisplay.innerText = `Your current typing speed is ${speed} words per minute. Keep typing...`;
        }
    });
});