let timeLeft = 30;
let score = 0;
let countries = []; // Array to store country names
let timerId;

document.getElementById('submitBtn').addEventListener('click', function() {
    const countryInput = document.getElementById('countryInput').value.trim();
    if (countryInput && !countries.includes(countryInput)) {
        countries.push(countryInput);
        score++;
        document.getElementById('scoreCount').innerText = score;
        document.getElementById('countryInput').value = '';
    }
});

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            saveRecord();
            alert('Time is up! Your score: ' + score);
        }
    }, 1000);
}

function saveRecord() {
    const record = `Score: ${score}, Countries Named: ${countries.join(', ')}`;
    if (navigator.userAgent.indexOf("Windows") !== -1) {
        const blob = new Blob([record], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'record.txt';
        link.click();
    } else {
        localStorage.setItem('countryGameRecord', record);
    }
}

window.onload = startTimer;
