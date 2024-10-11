let money = 100;
let playerCards = [];
let dealerCards = [];
let gameActive = true;

document.getElementById('money-amount').innerText = money;

function hit() {
    if (gameActive) {
        const card = drawCard();
        playerCards.push(card);
        updateDisplay();
        checkForBust();
    }
}

function stand() {
    gameActive = false;
    dealerPlay();
}

function drawCard() {
    return Math.floor(Math.random() * 11) + 1; // Cards worth 1-11
}

function updateDisplay() {
    document.getElementById('player-cards').innerText = `Player: ${playerCards.join(', ')}`;
    document.getElementById('dealer-cards').innerText = `Dealer: ${dealerCards.join(', ')}`;
}

function checkForBust() {
    const total = playerCards.reduce((acc, card) => acc + card, 0);
    if (total > 21) {
        document.getElementById('result-message').innerText = "You busted! Dealer wins.";
        gameActive = false;
    }
}

function dealerPlay() {
    while (getTotal(dealerCards) < 17) {
        dealerCards.push(drawCard());
    }
    determineWinner();
}

function getTotal(cards) {
    return cards.reduce((acc, card) => acc + card, 0);
}

function determineWinner() {
    const playerTotal = getTotal(playerCards);
    const dealerTotal = getTotal(dealerCards);
    if (dealerTotal > 21 || playerTotal > dealerTotal) {
        document.getElementById('result-message').innerText = "You win!";
        money += 10; // Example win amount
    } else {
        document.getElementById('result-message').innerText = "Dealer wins!";
        money -= 10; // Example loss amount
    }
    document.getElementById('money-amount').innerText = money;
}

document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);
