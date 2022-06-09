

const QUESTIONS_FILE = './assets/data/questions.txt';

export let questions = () => {return [
    {
        question: "Para que JavaScript usa o DOM?", 
        answer: "Para manipular os elementos de uma página html.",
    }, 

    {
        question: "Onde é encontrado o atributo 'length'?", 
        answer: "'length' é um atributo de arrays e strings.",
    }, 

    {
        question: "Quais tipo de variável sempre tem escopo global?", 
        answer: "Variáveis declaradas como var",
    }, 

    {
        question: "O que é preciso para se usar o 'await' em uma função", 
        answer: "Que a função seja declarada 'async'",
    }, 

    {
        question: "O que significa DOM?", 
        answer: "Object Document Model",
    }, 
]};

export function shuffleCards(nCards){
    const SHUFFLE_ROUNDS = 100;
    let generateIndexes = i => [...Array(i).keys()];
    let indexes = generateIndexes(nCards);
    let aux;

    for (let round = 0; round < SHUFFLE_ROUNDS; round++){
        for (let i = 0; i < nCards; i++){
            indexToChange = Math.floor(Math.random()*nCards);
    
            aux = indexes[i];
            indexes[i] = indexes[indexToChange];
            indexes[indexToChange] = aux;
        }
    }
    
    return indexes;
}



