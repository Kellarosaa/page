let playerHand = [];
let dealerHand = [];
let deck = [];
let gameStatus = document.getElementById('game-status');

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCard(hand) {
    hand.push(deck.pop());
}

function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;
    for (let card of hand) {
        if (['J', 'Q', 'K'].includes(card.value)) {
            value += 10;
        } else if (card.value === 'A') {
            aces++;
            value += 11;
        } else {
            value += parseInt(card.value);
        }
    }
    while (value > 21 && aces) {
        value -= 10;
        aces--;
    }
    return value;
}

function updateGameStatus() {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);
    gameStatus.innerText = `Player: ${playerValue} | Dealer: ${dealerValue}`;
    displayCards();
}

function displayCards() {
    const playerHandDiv = document.getElementById('player-hand');
    const dealerHandDiv = document.getElementById('dealer-hand');
    playerHandDiv.innerHTML = '';
    dealerHandDiv.innerHTML = '';

    playerHand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerText = `${card.value} of ${card.suit}`;
        playerHandDiv.appendChild(cardDiv);
    });

    dealerHand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerText = `${card.value} of ${card.suit}`;
        dealerHandDiv.appendChild(cardDiv);
    });
}

function resetGame() {
    playerHand = [];
    dealerHand = [];
    deck = [];
    createDeck();
    shuffleDeck();
    dealCard(playerHand);
    dealCard(dealerHand);
    updateGameStatus();
}

document.getElementById('hit-button').addEventListener('click', () => {
    dealCard(playerHand);
    updateGameStatus();
});

document.getElementById('stand-button').addEventListener('click', () => {
    while (calculateHandValue(dealerHand) < 17) {
        dealCard(dealerHand);
    }
    updateGameStatus();
});

document.getElementById('reset-button').addEventListener('click', resetGame);

resetGame();
