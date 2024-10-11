let score = 0;
let cards = [];
const cardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');
const cardsDisplay = document.getElementById('cards');

document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stand').addEventListener('click', stand);
document.getElementById('reset').addEventListener('click', reset);

function hit() {
    const card = drawCard();
    cards.push(card);
    score += cardValues[card];
    updateDisplay();
    checkBust();
}

function stand() {
    messageDisplay.textContent = "You chose to stand. Final score: " + score;
}

function reset() {
    score = 0;
    cards = [];
    updateDisplay();
    messageDisplay.textContent = "";
}

function drawCard() {
    const cardKeys = Object.keys(cardValues);
    return cardKeys[Math.floor(Math.random() * cardKeys.length)];
}

function updateDisplay() {
    scoreDisplay.textContent = "Score: " + score;
    cardsDisplay.textContent = "Cards: " + cards.join(', ');
}

function checkBust() {
    if (score > 21) {
        messageDisplay.textContent = "Bust! You exceeded 21.";
        disableButtons();
    }
}

function disableButtons() {
    document.getElementById('hit').disabled = true;
    document.getElementById('stand').disabled = true;
}
