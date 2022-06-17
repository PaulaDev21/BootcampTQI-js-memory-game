function initGame() {
    cardWrappers = buildBoard(MOCK_QUESTIONS);
    console.log(cardWrappers.length)
    resetBoard(cardWrappers);
    return cardWrappers;
}

cards = initGame();
