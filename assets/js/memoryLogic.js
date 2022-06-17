




function play() {
    console.log('entered play', flipped);
    if (flipped) {
        flippedCard2 = this;
        if (arePairs(flippedCard1, flippedCard2)) {
            flippedCard1.classList.toggle('inactive');
            flippedCard2.classList.toggle('inactive');
            nPairs++;
        }
        else {
            setTimeout(() => {
                flippedCard1.click();
                flippedCard2.click();
            }, 1500);
        }
    }

    else {
        flippedCard1 = this;
    }
    flipped = !flipped;
}

function arePairs(card1, card2) {
    if (card1.firstChild.id.slice(0, 6) !== card2.firstChild.id.slice(0, 6)) {
        let realId1 = card1.id.slice(card1.id.search('top'));
        let realId2 = card2.id.slice(card2.id.search('top'));
        if (realId1 == realId2) {
            return true;
        }
    }
    return false;
}

function resetBoard() {

    resetPlay();

    //let sInd = shuffleCards(cardWrappers.length);
    let randomIndexes = (i => [...Array(i).keys()])(cards.length);

    cards.forEach(card => {
        card.style.order = randomIndexes.values.next();
        console.log(card.style.order);
    });
}

// ================GAME MOTION====================

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
            if (gameOver()) {
                resetBoard();
            }
        }
        else {
            unflipCards(flippedCard1, flippedCard2)
        }
        resetPlay();
    }
}

function gameOver() {
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
