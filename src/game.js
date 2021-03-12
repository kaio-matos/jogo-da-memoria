let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: [
        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react"
    ],
    cards: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];
        if (card.flipped || this.lockMode) {
            return false
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },


    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    createCardsFromTechs: function () {
        //Array "cards" VAZIO
        this.cards = [];

        //Colocando Techs dentro do Array "cards"
        for (let tech of this.techs) {
            this.cards.push(this.createPairFromTech(tech));
        }
        //Deixando o array em apenas UM só array
        //          flatMap pega dentro do array "cards" o array da função "createPairFromTech" e deixa todos eles no mesmo nível de array
        this.cards = this.cards.flatMap(pair => pair);

        //Embaralhando as cartas
        this.shuffleCards();
    },

    createPairFromTech: function (tech) {
        //Gerando pares de Cards com IDs diferentes.
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    createIdWithTech: function (tech) {
        //Gerando os IDs aleatórios
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            //Pegando index aleatórios
            randomIndex = Math.floor(Math.random() * currentIndex)
            //Evitando que pegue index iguais
            currentIndex--;

            //Trocando os valores
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },
}

