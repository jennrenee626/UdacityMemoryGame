/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const moveCount = document.querySelector('.moves');
let starList = document.querySelector('.stars');


//shuffle deck on page init

let moves = 0;
let openCards = [];
let matchedCards = [];
let timerOn = false;
let time = 0;
let timerCount;



//listens for click event on entire deck
deck.addEventListener('click', function(e) {
    //display card symbol and add card to openCard array
        if (e.target.classList.contains('card') && openCards.length < 2 && !openCards.includes(e.target)) {
            toggleCards(e);
            addToggledCards(e);
            startTimer(e);
        }
        // check for match
            if (openCards.length == 2 && e.target.classList.contains('open') && e.target.classList.contains('show')) {
        //match check, add move, stars remove
                if (openCards[0].innerHTML === openCards[1].innerHTML ) {
                    cardMatch(e);
                    addMove(e);
                    moveCountStarRemove(e);
                    modalWin(e);
                    stopTimer(e);
                }
        //no match, add move, and star remove
                else {
                    cardNoMatch(e);
                    addMove(e);
                    moveCountStarRemove(e);
                }
        }});

// reset button click in score-panel AND in modal for play again option
const reset = document.querySelector('.restart');
reset.addEventListener('click', function(e) {
    //resetCards(e);
    resetMoves(e);
    //resetStars(e);
    //shuffle(array); 
    //timeReset(e);
    console.log('restart clicked');
});

//checks if card, when clicked toggles open/show classes
function toggleCards(e) {
    //if  (e.target.classList.contains('card') && openCards.length < 2) {
        e.target.classList.toggle('open');
        e.target.classList.toggle('show');
}

//adds cards to openCards array
function addToggledCards(e) {
    //if (e.target.classList.contains('card') && openCards.length < 2) {
        openCards.push(e.target);
        //openCards.push(e.target.innerHTML);
}

//check if cards match
function cardMatch(e) {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        matchedCards.push(openCards[0]);
        matchedCards.push(openCards[1]); //moves matched cards to new matchedCards array 
            openCards = []; //empties openCards array - create delay - bug
        console.log('match');
}

//if cards don't match, toggle to default
function cardNoMatch(e) {
     setTimeout(() => {
        openCards[0].classList.toggle('open'); //toggles first item in array back to default
        openCards[0].classList.toggle('show');
        openCards[1].classList.toggle('open');
        openCards[1].classList.toggle('show');
            openCards = [];
        }, 500); 
        console.log('not match');
}

function addMove(e) {
    moves++;
    moveCount.innerText = moves;        
    console.log('two clicks=one move');
}

function resetMoves(e) {
    moves = 0;
    moveCount.innerText = moves;
    //if moves == 1 - change html text to say move vs moves 
    console.log('reset move count');
}

// const cardIsMatched = document.querySelectorAll('.card'); // not working
// function resetCards(e) {
//     //card.classList.remove('match');
//     cardIsMatched.style.cssText = '.deck';
//     openCards=[];
//     matchedCards=[];
// }

function moveCountStarRemove (e) {
    if (moves < 15){
        console.log("moves less than 15");
    } else if (moves === 16) {
        removeStar(e);
    } else if (moves === 32) {
        removeStar(e);
}}

function removeStar(e){
    starList.removeChild(starList.children[0]);
}

//add star/reset stars
// let li = document.getElementsByTagName('li');
// let liCount = document.getElementsByTagName("li").length;

// function resetStars(e) { //not working
//     while (liCount.length <3) {
//         let addLi = document.createElement('li');
//         li.innerHTML = '<i class="fa fa-star"></i>';
//         starList.appendChild(addLi);
//         }
//     };
   
//timer section
function timeCount(e) {
    timerCount = setInterval(() => {
        time++;
        timeDisplay(e);
    }, 1000);
}

function startTimer(e) {
    if (!timerOn) {
        timerOn = true;
        timeCount(e);
}}

function timeDisplay (e) {
    const timer = document.querySelector('.timer');
    const minutes = Math.floor(time/60);
    const seconds = (time%60);
    
    timer.innerHTML = time;
        if (seconds < 10) {
            timer.innerHTML = `${minutes}:0${seconds}`;
        }  else {
            timer.innerHTML = `${minutes}:${seconds}`;
        }
    
    //document.getElementById(".timer").innerHTML = minutes + ":" + seconds;
}
    
function stopTimer(e) {
    if (matchedCards.length == 16) {
        clearInterval(timerCount);
}}

// function timeReset(e) {

// };


function modalWin(e) {
    if (matchedCards.length == 16) {
        toggleModal(e);
        //display.style.display = "block";
}}

function toggleModal(e){
    const modal = document.querySelector('.modal');
    modal.classList.toggle('displayToggle');
}

function modalClose(e) { //not working
    modalCloseButton.onclick = function() {
    alert('close clicked');
    //modal.style.display = "none";
    //or
    //const modalCloseClick = document.querySelector('.modalCloseButton');
    //modalCloseClick.addEventListener('click', toggleModal(e));
}}

function modalReplay(e) { //not working
    modalReplayButton.onclick = function() {
    alert('replay clicked');
        //modal.style.display = "none";
    //or
    //const modalReplay = document.querySelector('modalReplayButton');
    //modalReplay.addEventListener('click', function (e) {
        //toggleModal(e);
        //reset
        //console.log('replay picked');
}}


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