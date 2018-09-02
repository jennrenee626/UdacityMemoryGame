/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');

//shuffle deck on page init

let openCards = [];
let matchedCards = [];

//listens for click event on entire deck
deck.addEventListener('click', function(e) {
    //start timer
    //display card symbol and add card to openCard array
        if (e.target.classList.contains('card') && openCards.length < 2 && !openCards.includes(e.target)) {
            toggleCards(e);
            addToggledCards(e);
        }
        // check for match
            if (openCards.length === 2 && e.target.classList.contains('open') && e.target.classList.contains('show')) {
        //match - lock card in open/show
                if (openCards[0].innerHTML === openCards[1].innerHTML ) {
                    cardMatch(e);
                    addMove(e);
                    //add move and display on score-panel
                }
        //all matches found?                    
                    // // if (matchedCards.length === 16) {
                    // //     alert("All Match");
                    // }
                    //     //popup modal - display final moves, time, stars                      
                    // }
                    //     if (playAgain===true) {
                    //         resizeTo(e);
                    // }
        //no match - remove cards from openCard array, toggle cards to default
                else {
                    cardNoMatch(e);
                    addMove(e);
                    //add move and display on score-panel
                }
        }});

// reset button click in score-panel AND in modal for play again option
const reset = document.querySelector('.restart');
reset.addEventListener('click', function(e) {
    console.log('restart clicked');
});

// function reset (e) {
//     moves = 0;
//     stars = 3
//     time = reset
// }

function addMove (e) {
    if (openCards ===2) {
        //moves ++;
        console.log('two clicks=one move');
    }};


//checks if card, when clicked toggles open/show classes
function toggleCards (e) {
    //if  (e.target.classList.contains('card') && openCards.length < 2) {
        e.target.classList.toggle('open');
        e.target.classList.toggle('show');
};

//adds cards to openCards array
function addToggledCards (e) {
    //if (e.target.classList.contains('card') && openCards.length < 2) {
        openCards.push(e.target);
        //openCards.push(e.target.innerHTML);
};

//check if cards match
function cardMatch (e) {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        matchedCards.push(openCards[0]);
        matchedCards.push(openCards[1]); //moves matched cards to new matchedCards array 
            openCards = []; //empties openCards array
        console.log('match'); //prints "match"
};

function cardNoMatch (e) {
     setTimeout(() => {
        openCards[0].classList.toggle('open');
        openCards[0].classList.toggle('show');
        openCards[1].classList.toggle('open');
        openCards[1].classList.toggle('show');
            openCards = [];
        }, 1000); 
        console.log('not match');
};

// //counts moves (two clicks = one move)
// // let moves = 0;

// // function countMoves (e) {
// //         if (openCards === 2) {
// //         moves ++;
// //     }};

//     let moves = 0; // counter 
//     const addMove = document.querySelector('.moves'); // element
//     addMove.countMoves = function(b) {
//     moves ++; // increment it
//     moves.innerHTML = moves;
// }
    
//     when two cards are in the array - add a move
//    document.getElementsByClassName('moves').innerText/firstChild/innerHTML = moves; 


// stars
// if moves <=10 3 star 
//     moves >=20 2 star
//     moves >=30 1 star




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */