let game = null;


function buttons_initialization() {
    document.getElementById("card").disabled = false;
    document.getElementById("stand").disabled = false;
}

function finalize_buttons() {
    document.getElementById("card").disabled = true;
    document.getElementById("stand").disabled = true;
}

//FUNÇÕES QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
function new_game() {

    game = new BlackJack();

    document.getElementById("winnerText").innerHTML = '';
    document.getElementById("loserText").innerHTML = '';

    document.getElementById("playerCards").innerHTML = '';
    document.getElementById("dealerCards").innerHTML = '';

    buttons_initialization();

    dealer_new_card();
    player_new_card();
    dealer_new_card();
    player_new_card();
    
}

function update_dealer(state){

    var dealerHand = game.get_dealer_cards();
    var dealerTotalPoints = game.get_cards_value(dealerHand);
    
    let dealerHandDuplicated = dealerHand.slice();
    let secondCardPoints = dealerHandDuplicated.splice(0, 1);
    let dealerPoints = game.get_cards_value(secondCardPoints);
    
    //numero        
    let number1 = dealerHand[0].substring(0, 2);
    number1 = number1.trim();
    //naipe
    let nype1 = dealerHand[0].substring(5);
    nype1 = nype1.trim();

    let imgdealer1 = document.createElement('img');
    imgdealer1.src = 'img/'+number1+nype1+'.png';
    imgdealer1.setAttribute('id', 'cardimg')


    if (game.state.gameEnded == false) {
        let carddown = document.createElement('img');
        carddown.src = 'img/red_back.png';
        carddown.setAttribute('id', 'cardimg')

        document.getElementById("dealerCards").innerHTML ="";
        
        document.getElementById("dealerCards").appendChild(imgdealer1);
        document.getElementById("dealerCards").appendChild(carddown);
        document.getElementById("dealerPoints").innerHTML = `${dealerPoints}`;
        

    }

    else {

        document.getElementById("dealerCards").innerHTML ="";

        for (let i=0; i<dealerHand.length; i++){       
            let number = dealerHand[i].substring(0, 2);
            number = number.trim();
            let nype = dealerHand[i].substring(5);
            nype = nype.trim();

            let imgdealer = document.createElement('img');
            imgdealer.src = 'img/'+number+nype+'.png';
            imgdealer.setAttribute('id', 'cardimg')
            
            document.getElementById("dealerCards").appendChild(imgdealer);

        }

        
        document.getElementById("dealerPoints").innerHTML = `${dealerPoints}`;
    }     
        
    if (game.get_game_state().gameEnded) {
        if (game.get_game_state().dealerWon) {
            document.getElementById("dealerPoints").innerHTML = `${dealerTotalPoints}`;
            document.getElementById("winnerText").innerHTML = `Dealer won!`;
            document.getElementById("loserText").innerHTML = `Player lost! Try again!`;
        }
        else {
            document.getElementById("dealerPoints").innerHTML = `${dealerTotalPoints}`;
            document.getElementById("winnerText").innerHTML = `Player won!`;
            if (dealerPoints < 21) {
                document.getElementById("loserText").innerHTML = `Dealer lost!`;   
            }
            else if (dealerPoints > 21) {
                document.getElementById("loserText").innerHTML = `Dealer busted!`;
            }
        }
    
        finalize_buttons();
    }
}

function update_player(state){
    
    var playerHand = game.get_player_cards();
    var playerPoints = game.get_cards_value(playerHand);

    document.getElementById("playerCards").innerHTML = "";
    


    for (let i=0; i<playerHand.length; i++){       
        //numero        
        let number = playerHand[i].substring(0,2);
        number = number.trim();
        //naipe
        let nype = playerHand[i].substring(5);
        nype = nype.trim();
        var imgplayer = document.createElement('img');
        imgplayer.src = 'img/'+number+nype+'.png';
        imgplayer.setAttribute('id', 'cardimg')

        document.getElementById("playerCards").appendChild(imgplayer);
    }

    if (!game.get_game_state().gameEnded) {

        
        document.getElementById("playerPoints").innerHTML = `${playerPoints}`;
    }
    
    if (game.get_game_state().gameEnded) {

        document.getElementById("playerCards").appendChild(imgplayer);
        document.getElementById("playerPoints").innerHTML = `${playerPoints}`;
        
        if (!game.get_game_state().dealerWon) {
            document.getElementById("winnerText").innerHTML = `Player wins!`;
            document.getElementById("loserText").innerHTML = `Dealer lost!`;
        }
        else {
            if (playerPoints < 21) {
                document.getElementById("winnerText").innerHTML = `Dealer won!`;
                document.getElementById("loserText").innerHTML = `Player lost! Try again!`;   
            }
            else if (playerPoints > 21) {
                document.getElementById("winnerText").innerHTML = `Dealer won!`;
                document.getElementById("loserText").innerHTML = `Player busted! Try again!`;
            }
        }


        finalize_buttons();
    }
}

function dealer_new_card() { 
    game.dealer_move();
    update_dealer(game.get_game_state);
    return game.get_game_state();
}

function player_new_card() { 
    game.player_move();
    update_player(game.get_game_state);
    if (game.state.gameEnded) {
        this.update_dealer(game.state);
    }
    return game.get_game_state();
}

function dealer_finish() {
    game.setDealerTurn(true);
    game.get_game_state()

    while (game.state.gameEnded == false) {
        this.update_dealer(game.state);
        this.dealer_new_card();
        game.get_game_state();
    }

    update_dealer(game.state)
    update_player(game.state)

    return game.get_game_state();
}