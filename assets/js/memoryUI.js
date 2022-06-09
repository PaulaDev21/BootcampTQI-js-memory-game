//import {shuffleCards, questions} from './memoryLogic.js';

const CARD_TOP_IMAGE = "./assets/img/card-top.jpg";

const QUESTIONS = questions();

function buildCardTop(index) {
    let cardTop = document.createElement('img');
    cardTop.setAttribute('src', CARD_TOP_IMAGE);
    cardTop.setAttribute('class', 'card-top');
    cardTop.setAttribute('id', 'card_' + index);
    return cardTop;
}

function buildCardFace(index, text) {
    let cardFace = document.createElement('div');
    cardFace.setAttribute('class', 'card-face');
    cardFace.setAttribute('id', 'cardFace_' + index);
    cardFace.innerHTML = text
    return cardFace;
}

function buildCardWrapper(cardTop, cardFace) {
    let cardWrapper = document.createElement('div');
    cardWrapper.setAttribute('class', 'card-wrapper');
    cardWrapper.appendChild(cardTop);
    cardWrapper.appendChild(cardFace);
    return cardWrapper;
}

function createCards(questions) {
    const board = document.getElementById('memory-board')

    let cardWrappers = [];
    // let cardFaces = [];
    let question = true;
    let cardTop, cardFace;

    for (let i = 0; i < questions.length; i++) {
        cardTop = buildCardTop(i);
        cardFace = buildCardFace(i);

        if (question) {
            cardFace.innerHTML = questions[i].question;
        }
        else {
            cardFace.innerHTML = questions[i].answer;
        }
        cardWrappers.push(buildCardWrapper(cardTop, cardFace));
        question = !question;

    }
    return cardWrappers;
}

function createBoard(cardWrappers, boardElement) {
    let sInd = shuffleCards(cardWrappers.length);

    let randomCard, cardIndex;

    for (let i = 0; i < cardWrappers.length; i++) {
        cardIndex = sInd[i]
        randomCard = cardWrappers[cardIndex];
        boardElement.appendChild(randomCard);
    }
    return boardElement;
}


console.log(createCards(QUESTIONS), document.getElementById('memory-board'))