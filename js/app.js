/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');

let openCards = [];
let matchedCards = [];

//listens for click event on entire deck  (bug - still adding double clicks)
deck.addEventListener('click', function(e) {
    if (e.target.classList.contains('card') && openCards.length < 2 && !openCards.includes(e.target)) {
        toggleCards(e);
        addToggledCards(e);
        cardMatch(e);
    }});
    

//checks if card, when clicked toggles open/show classes
function toggleCards (e) {
    //if  (e.target.classList.contains('card') && openCards.length < 2) {
        e.target.classList.toggle('open');
        e.target.classList.toggle('show');
    };
function toggleCardsMatch (e) {
        e.target.classList.toggle('match');
}

//adds cards to openCards array
function addToggledCards (e) {
    //if (e.target.classList.contains('card') && openCards.length < 2) {
        //openCards.push(e.target);
        openCards.push(e.target.innerHTML);
    };

//check if cards match -- not working properly -- only working on second card
function cardMatch (e) {
    if (openCards.length === 2 && openCards[0] === openCards[1]) {
        e.target.classList.toggle('match'); //changes card to match class
        console.log('match'); //prints "match"
        matchedCards.push(e.target.innerHTML); //moves matched cards to new matchedCards array - bug - adding double clicks
        openCards = []; //empties openCards array
    } else if (openCards.length === 2 && openCards[0] != openCards[1]) {   
        setTimeout(() => { //set timeout - only working on one card
            toggleCards(e); //toggles only one card
            openCards = [];
        }, 1000); 
        console.log('not match');
    }};

    if (matchedCards.length === 16) { //not working
        alert("All Match");
    };



//if cardMatch === true
    //lock in array
    

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
//}
    
    //when two cards are in the array - add a move
   // document.getElementsByClassName('moves').innerText/firstChild/innerHTML = moves; 




//stars
//if moves <=10 3 star 
    //moves >=20 2 star
    //moves >=30 1 star



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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