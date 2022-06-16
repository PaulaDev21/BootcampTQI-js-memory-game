//============================= GAME LOGIC ===============================

// const QUESTIONS_FILE = './assets/data/questions.txt';

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


let nPairs, flipped, flippedCard1, flippedCard2;
function resetPlay() {
    nPairs = 0;
    flipped = false;
}

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

//===========================INTERFACE CONSTRUCTION============================


function buildQuestionCardTop(index) {
    let cardTop = prepareTopCard();
    cardTop.setAttribute('id', 'question-card-top-' + index);
    // cardTop.setAttribute('class', 'flip');
    return cardTop;
}

function buildAnswerCardTop(index) {
    let cardTop = prepareTopCard();
    cardTop.setAttribute('id', 'answer-card-top-' + index);
    return cardTop;
}

function prepareTopCard() {
    let cardTop = document.createElement('img');
    cardTop.setAttribute('src', CARD_TOP_IMAGE);
    cardTop.setAttribute('class', 'card-top');
    cardTop.setAttribute('alt', 'Click the card to see the content.');
    return cardTop;
}

function buildQuestionCardFace(pairId) {
    let cardFace = prepareCardFace();
    cardFace.setAttribute('id', 'question-' + pairId);
    cardFace.innerHTML = MOCK_QUESTIONS[Math.floor(pairId)].question;
    return cardFace;
}

function buildAnswerCardFace(pairId) {
    let cardFace = prepareCardFace();
    cardFace.setAttribute('id', 'answer-' + pairId);
    cardFace.innerHTML = MOCK_QUESTIONS[Math.floor(pairId)].answer;
    return cardFace;
}

function prepareCardFace() {
    let cardFace = document.createElement('div');
    cardFace.setAttribute('class', 'card-face');
    cardFace.setAttribute('alt', 'Search for the card which matches this.');
    return cardFace;
}


function buildCardWrapper(pairId, topBuilder, faceBuilder) {

    let cardFace = faceBuilder(pairId);

    let faceWrapper = document.createElement('div');
    faceWrapper.setAttribute('class', 'card-face-wrapper');
    faceWrapper.appendChild(cardFace);

    let cardTop = topBuilder(pairId);

    let cardWrapper = document.createElement('div');
    cardWrapper.setAttribute('class', 'card-wrapper');

    cardWrapper.appendChild(cardTop);
    cardWrapper.appendChild(faceWrapper);

    return cardWrapper;
}

function createCards(questions) {

    let cardWrappers = [];

    for (let i = 0; i < questions.length; i++) {

        cardWrappers.push(buildCardWrapper(i, buildQuestionCardTop, buildQuestionCardFace));
        cardWrappers.push(buildCardWrapper(i, buildAnswerCardTop, buildAnswerCardFace));
    }
    return cardWrappers;
}

function resetBoard() {

    resetPlay();

    let cardWrappers = cards;
    let boardElement = memoryBoard;
    //let sInd = shuffleCards(cardWrappers.length);
    let sInd = (i => [...Array(i).keys()])(cardWrappers.length);

    let randomCard, cardIndex;

    for (let i = 0; i < cardWrappers.length; i++) {
        cardIndex = sInd[i];
        randomCard = cardWrappers[cardIndex];
        boardElement.appendChild(randomCard);
    }
    return boardElement;
}

// ================GAME MOTION====================

function flipCard() {
    console.log('entered flipCard', flipped);
    if (!flipped) {
        this.classList.toggle('flip');
    }
}

// ===========================INITIALIZING INTERFACE=====================================

let MOCK_QUESTIONS = [
    {
        question: "What for does JavaScript use DOM?",
        answer: "To handle the elements in an HTML page.",
    },

    {
        question: "Where can we use the 'length' attribute?",
        answer: "It's an attribute for arrays and strings.",
    },

    {
        question: "Which variable type does always have global scope?",
        answer: "Variables that are declared as 'var'",
    },

    {
        question: "What do you need so you can use 'await' inside a function?",
        answer: "The function should be declared as 'async'",
    },
    {
        question: "What does DOM mean?",
        answer: "It's an acronym for Document Object Model",
    },
    {
        question: "What are the conditional commands?",
        answer: "They are if-else, switch and the ternary operator",
    },
    {
        question: "What's an arrow function?",
        answer: "It's a function defined without a name, using the structure '() => {}'.",
    },

    {
        question: "How do we create a class in JavaScript?",
        answer: "By using the reserved word 'class' before its name. The class code goes between {}.",
    },

    {
        question: "How to create a subclass in JavaScript?",
        answer: "By using the reserved word 'inherits' before the parent class name.",
    },
    {
        question: "What's the structure for handling errors?",
        answer: "It's try {} catch(error){} finally{}",
    },

];

const CARD_TOP_IMAGE = "./assets/img/card-top3.jpg";
const cards = createCards(MOCK_QUESTIONS);
const memoryBoard = document.getElementById('memory-board');
// memoryBoard.addEventListener('change', play)

// console.log(cards[1], cards[0])
// console.log(arePairs(cards[2].firstChild, cards[3].firstChild));

cards.forEach(card => {
    card.addEventListener('click', flipCard);
    card.addEventListener('click', play);
});

document.getElementById('memory-wrapper').setAttribute('onload', resetBoard());
document.getElementById('reset-btn').addEventListener('click', resetBoard);


