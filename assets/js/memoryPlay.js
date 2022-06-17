const CARD_TOP_IMAGE = "./assets/img/card-top3.jpg";
const memoryBoard = document.getElementById('memory-board');

let nPairs,
    flipped,
    flippedCard1,
    flippedCard2,
    lockBoard,
    cards;

function initGame() {
    cards = buildBoard(MOCK_QUESTIONS);

    cards.forEach(card => {
        card.addEventListener('click', flipCard);
        console.log(card)
    });
}

cards = initGame();
