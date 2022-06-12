//============================= GAME LOGIC ===============================

// const QUESTIONS_FILE = './assets/data/questions.txt';

let MOCK_QUESTIONS = [
    {
        question: "What for JavaScript use DOM?",
        answer: "To handle the elements in an HTML page.",
    },

    {
        question: "Where we can use the 'length' attribute?",
        answer: "It's an attribute for arrays and strings.",
    },

    {
        question: "Which variable type has always global scope?",
        answer: "Variables that are declared as 'var'",
    },

    {
        question: "What do you need to use 'await' inside a function?",
        answer: "The function should be declared as 'async'",
    },
    {
        question: "What does DOM mean?",
        answer: "It's an acronym for Object Document Model",
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
        answer: "By using the reserved word class, then a name, then defining it's attributes and methods inside {}.",
    },

    {
        question: "How to create a subclass in JavaScript?",
        answer: "By using the reserved word 'inherits' then the parent class name.",
    },
    {
        question: "What's the structure for handling errors?",
        answer: "It's try {} catch(error){} finally{}",
    },

];

const CARD_TOP_IMAGE = "./assets/img/card-top.jpg";
const cards = createCards(MOCK_QUESTIONS);
const memoryBoard = document.getElementById('memory-board')

document.getElementsByTagName('body')[0].setAttribute('onload', resetBoard(cards, memoryBoard));

document.getElementById('reset-btn').setAttribute('active', resetBoard(cards, memoryBoard));

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

//===========================INTERFACE CONSTRUCTION============================


function buildCardTop(index) {
    let cardTop = document.createElement('img');
    cardTop.setAttribute('src', CARD_TOP_IMAGE);
    cardTop.setAttribute('class', 'card-top');
    cardTop.setAttribute('id', 'card_' + index);
    return cardTop;
}

function buildCardFace(index, stringType) {
    let cardFace = document.createElement('div');
    cardFace.setAttribute('class', 'card-face');
    cardFace.setAttribute('id', 'face_' + index);
    cardFace.innerHTML = MOCK_QUESTIONS[Math.floor(index/2)][stringType];
    return cardFace;
}

function buildCardWrapper(index, attributeName) {
    let cardTop = buildCardTop(index);
    let cardFace = buildCardFace(index, attributeName);
    let cardWrapper = document.createElement('div');

    cardWrapper.setAttribute('class', 'card-wrapper');
    cardWrapper.appendChild(cardTop);
    cardWrapper.appendChild(cardFace);

    return cardWrapper;
}

function createCards(questions) {

    let cardWrappers = [];

    for (let i = 0; i < questions.length * 2; i += 2) {
        
        cardWrappers.push(buildCardWrapper(i, 'question'));
        cardWrappers.push(buildCardWrapper(i+1, 'answer'));
    }
    return cardWrappers;
}

function resetBoard(cardWrappers, boardElement) {
    let sInd = shuffleCards(cardWrappers.length);

    let randomCard, cardIndex;

    for (let i = 0; i < cardWrappers.length; i++) {
        cardIndex = sInd[i]
        randomCard = cardWrappers[cardIndex];
        boardElement.appendChild(randomCard);
    }
    return boardElement;
}


