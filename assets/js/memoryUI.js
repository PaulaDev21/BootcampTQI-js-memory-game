//============================= GAME LOGIC ===============================

function buildQuestionCardTop(index) {
    let cardTop = prepareTopCard();
    cardTop.setAttribute('id', 'question-card-top-' + index);
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

    console.log(pairId)

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

function buildBoard(questions) {

    let cardWrappers = [];

    console.log('entrei build lboard')
    for (let i = 0; i < questions.length; i++) {

        memoryBoard.appendChild(buildCardWrapper(i, buildQuestionCardTop, buildQuestionCardFace));
        memoryBoard.appendChild(buildCardWrapper(i, buildAnswerCardTop, buildAnswerCardFace));
    }
    console.log(memoryBoard);
    return cardWrappers;
}
