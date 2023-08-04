const symbols = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🥝'];
let cards = [];
let openedCards = [];
let matchedCards = [];

function generateCards() {
  let combinedSymbols = symbols.concat(symbols); // Duplicate symbols to make pairs
  combinedSymbols.sort(() => 0.5 - Math.random()); // Shuffle the symbols array
  cards = combinedSymbols.map((symbol, index) => ({
    id: index,
    symbol: symbol,
    isFlipped: false,
    isMatched: false
  }));
}

function renderCards() {
  const board = document.querySelector('.board');
  board.innerHTML = '';
  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    if (card.isFlipped || card.isMatched) {
      cardDiv.textContent = card.symbol;
    }
    cardDiv.addEventListener('click', () => flipCard(card));
    board.appendChild(cardDiv);
  });
}

function flipCard(card) {
  if (openedCards.length < 2 && !card.isFlipped && !card.isMatched) {
    card.isFlipped = true;
    openedCards.push(card);
    renderCards();
    if (openedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = openedCards;
  if (card1.symbol === card2.symbol) {
    card1.isMatched = true;
    card2.isMatched = true;
    matchedCards.push(card1, card2);
  } else {
    card1.isFlipped = false;
    card2.isFlipped = false;
  }
  openedCards = [];
  renderCards();
  if (matchedCards.length === cards.length) {
    alert('¡Felicidades! Has ganado el juego.');
  }
}

function resetGame() {
  openedCards = [];
  matchedCards = [];
  generateCards();
  renderCards();
}

// Inicialización del juego
generateCards();
renderCards();
