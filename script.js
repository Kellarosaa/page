let countries = ["Canada", "USA"];
let timer;
let timeLimit = 60; // 60 seconds
let score = 0;

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    score = 0;
    document.getElementById('countryInput').value = '';
    timer = setTimeout(endGame, timeLimit * 1000);
    alert("Game started! You have " + timeLimit + " seconds.");
}

function endGame() {
    alert("Time's up! Your score: " + score);
    saveRecord(score);
}

document.getElementById('countryInput').addEventListener('input', function() {
    let input = this.value.trim();
    if (countries.includes(input) && input !== "") {
        score++;
        countries = countries.filter(country => country !== input);
        this.value = '';
    }
});

function saveRecord(score) {
    // Logic to save score to record.txt or local storage
    if (navigator.userAgent.indexOf("Windows") !== -1) {
        // Save to record.txt (server-side implementation required)
    } else {
        localStorage.setItem('countryGameScore', score);
    }
}
