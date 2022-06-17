function flipCard() {
    console.log('entered flipCard, flipped = ', flipped);
    if (this === flippedCard1) {
        return;
    }

    this.classList.add('flip');
    if (!flipped) {
        flipped = true;
        flippedCard1 = this;
    }
    else {
        flippedCard2 = this;
        if (arePairs(flippedCard1, flippedCard2)) {
            disableCards(flippedCard1, flippedCard2);
            if (gameOver(cards)) {
                resetBoard();
            }
        }
        else {
            unflipCards(flippedCard1, flippedCard2)
        }
        resetPlay();
    }
}

function arePairs(cardWrapper1, cardWrapper2) {
    if (cardWrapper1.firstChild.id.slice(0, 6) !== cardWrapper2.firstChild.id.slice(0, 6)) {
        let realId1 = cardWrapper1.id.slice(cardWrapper1.id.search('top'));
        let realId2 = cardWrapper2.id.slice(cardWrapper2.id.search('top'));
        if (realId1 == realId2) {
            return true;
        }
    }
    return false;
}

function resetBoard(cards) {

    console.log('reset board ,cards', cards.length)
    resetPlay();

    //let randomIndexes = shuffleCards(cardWrappers.length);
    let randomIndexes = (i => [...Array(i).keys()])(cards.length);

    let indexesIterator = randomIndexes[Symbol.iterator]();
    cards.forEach(card => {
        card.style.order = indexesIterator.next();
        card.addEventListener('click', flipCard);
        console.log(card.style.order);
    });
    return cards;
}



function gameOver(cards) {
    console.log(cards)
    nPairs++;
    if (nPairs === Math.floor(cards.length / 2)) {
        return true;
    }
    return false;
}

function unflipCards(card1, card2) {
    lockBoard = true;

    setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
    }, 1500);
}

function disableCards(card1, card2) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
}

function resetPlay() {
    [flipped, lockBoard] = [false, false];
    [flippedCard1, flippedCard2] = [null, null];
}

function shuffleCards(nCards) {
    const SHUFFLE_ROUNDS = 100;
    let generateIndexes = i => [...Array(i).keys()];
    let indexes = generateIndexes(nCards);
    let aux;

    for (let round = 0; round < SHUFFLE_ROUNDS; round++) {
        for (let i = 0; i < nCards; i++) {
            indexToChange = Math.floor(Math.random() * nCards);

            aux = indexes[i];
            indexes[i] = indexes[indexToChange];
            indexes[indexToChange] = aux;
        }
    }
    return indexes;
}
