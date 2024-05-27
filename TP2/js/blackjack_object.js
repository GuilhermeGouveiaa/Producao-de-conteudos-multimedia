// Constante com o número máximo de pontos para blackJack

var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["S", "D", "C", "H"];

// Classe BlackJack - Construtor
class BlackJack {

    constructor() {
        // Array com as cartas do dealer
        this.dealer_cards = [];
        // Array com as cartas do player
        this.player_cards = [];
        // Variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        // Objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        // Métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {

            let deck = [];

            for (let i in values) {
                for (let j in suits) {
                    deck.push([values[i], suits[j]].join(' of '));
                }
            }

            return deck;
        };

        this.shuffle = function (deck) {

            for (let i = 0; i < 1000; i++)
            {
                let index1 = Math.floor((Math.random() * deck.length));
                let index2 = Math.floor((Math.random() * deck.length));
                let temp = deck[index1];
    
                deck[index1] = deck[index2];
                deck[index2] = temp;
            }


            
            return deck;
        };

        // Baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
    }


    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    get_player_cards() {
        return this.player_cards.slice();
    }

    setDealerTurn (val) {
        this.dealerTurn = val;
    }

    // MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {

        let cardsValue = 0;
             
        for (let i = 0; i < cards.length; i++) {

            let value = cards[i].slice(0, 2);
            let absValue = value.toString().trim();

            if (absValue == 'J' || absValue == 'Q' || absValue == 'K')
                cardsValue += 10;

            else if (absValue == 'A') {
                if ((cardsValue + 11) <= 21)
                    cardsValue += 11;
                else
                    cardsValue += 1;
            }
            else
                cardsValue += parseInt(absValue);
        }


        return cardsValue;
    }

    dealer_move() {
        this.dealer_cards.push(this.deck[0]);
        this.deck.shift();
        return this.get_game_state();
    }

    player_move() {
        this.player_cards.push(this.deck[0]);
        this.deck.shift();
        return this.get_game_state();
    }

    get_game_state() { 

        let playerPoints = this.get_cards_value(this.player_cards);
        let dealerPoints = this.get_cards_value(this.dealer_cards);

        if (playerPoints == 21) {
            this.state.gameEnded = true;
            this.state.dealerWon = false;
        }
        else if (playerPoints > 21) {
            this.state.gameEnded = true;
            this.state.dealerWon = true;
            this.state.playerBusted = true;
        }
        else if (dealerPoints > 21) {
            this.state.gameEnded = true;
            this.state.dealerWon = false;
        }
        else if (dealerPoints == 21 && this.dealerTurn == true) {
            this.state.gameEnded = true;
            this.state.dealerWon = true;
        }
        else if (dealerPoints > playerPoints && dealerPoints>=17 && this.dealerTurn == true) {
            this.state.gameEnded = true;
            this.state.dealerWon = true;
        }

        return this.state;
    }

}

