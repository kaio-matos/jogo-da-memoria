const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card"
const ICON = "icon"
const FLIP = "flip"
let counter = 0;
onload = function () {

    if ((JSON.parse(localStorage.getItem("data"))) === null) {
        let allScores = []
        return allScores;
    } else {
        let allScores = (JSON.parse(localStorage.getItem("data"))).allScores;
        printData();
        return allScores;
    }

}
let allScores = onload();

startGame();


//Inicia o Game
function startGame() {
    initializeCards(game.createCardsFromTechs());
}

//Coloca o esqueleto dos cards dentro do BOARD
function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";

    game.cards.forEach(card => {

        let cardElement = document.createElement("div");
        cardElement.id = card.id;

        //Adiciona a classe "card" para o CSS dar estilo
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        //Para cada tech se cria um CARD front e back
        createCardContent(card, cardElement);

        //Adicionando o FLIP
        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);

    })
}

//Coloca o CONTEÚDO da frente e de trás dentro dos CARDS
function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

//Cria uma FACE para os cards
function createCardFace(face, card, element) {
    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);

    //Analisa QUAL a face que foi pedida
    if (face === FRONT) {
        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/img/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace)
}


//Função que adiciona o efeito do CSS de virar a carta
function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add(FLIP);

        if (game.secondCard) {
            countMoves();
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = "flex";
                    saveMoves();

                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove(FLIP);
                    secondCardView.classList.remove(FLIP);

                    game.unflipCards();
                }, 1000);
            }
        }
    }
}


function restart() {
    game.clearCards();
    resetMoves();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = "none";
}


function countMoves() {
    counter++;
    let movesSpan = document.getElementById("moves");
    movesSpan.innerHTML = counter;
}

function resetMoves() {
    counter = 0;
    let movesSpan = document.getElementById("moves");
    movesSpan.innerHTML = counter;
}
//Salvar todos --> push allScores --> filter(maior) --> 

function saveMoves() {
    let data = {
        lastCount: counter,
        allScores: pushScores(),
        bestScore: pushBest(),
    }
    window.localStorage.setItem("data", JSON.stringify(data));
    printData()
}

function pushScores() {
    allScores.push(counter)
    return allScores;
}

function pushBest() {
    let scores = allScores;

    let bestScore = Math.min(...scores);
    return bestScore
}

function resetData() {
    localStorage.clear();
    let bestScoreSpan = document.getElementById("bestScore");
    bestScoreSpan.innerHTML = 0;
}

function printData() {
    let bestScoreSpan = document.getElementById("bestScore");
    bestScoreSpan.innerHTML = (JSON.parse(localStorage.getItem("data"))).bestScore;


}