/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, dice2, playingGame, points = 10, lastDice, lastDice2;

init();
document.querySelector('.btn-points').addEventListener('click', changePoints);
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(playingGame){
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result

        var diceDom = document.querySelector('.dice');
        var diceDom2 = document.querySelector('.dice2');

        diceDom.style.display = 'Block';
        diceDom.src='dice-' + dice + '.png';
        diceDom2.style.display = 'Block';
        diceDom2.src='dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number was not a 1
        if (dice === 6 && lastDice ===6 || dice2 === 6 && lastDice2 ===6 ){
            console.log('aehoo' + dice + lastDice);
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1 && dice2 !==1){
            //add score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
        nextPlayer();
        }
       lastDice = dice; 
       lastDice2 = dice2;
       
    }    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(playingGame){
        //add CURRENT score to Global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if plate won the game;
        if (scores[activePlayer] >= points){ 
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            playingGame = false;
        } else {

        //next Player
        nextPlayer();
        }

    }
});

function nextPlayer(){

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('player-0-panel').classList.remove('active');
    //document.querySelector('player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

};

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
document.querySelector('#points').value = points;

scores = [0,0];
roundScore = 0 ;
activePlayer =  0;
playingGame = true;

document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}

function changePoints(){
    validation = parseInt(document.getElementById('points').value);
    Number.isInteger(validation) === true ? points = validation : alert(" Please insert Numbers Only");
    console.log('hue ' + points);
    init();
}

// document.querySelector('#current-' + activePlayer).textContent = dice;
// //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

