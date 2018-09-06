let deck = document.querySelector('.deck');
let moveCount = document.querySelector('.moves');
let starList = document.querySelector('.stars');
let timer = document.querySelector('.timer');

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

//************** reset button  **************

// reset button click
const reset = document.querySelector('.restart');
reset.addEventListener('click', function (e) {
    resetAll(e);
})

//reset all
function resetAll(e) {
    resetCards(e);
    resetMoves(e);
    resetStars(e);
    timerReset(e);
    timerReset(e);
    shuffleCards(e);
}

//************** cards **************

//checks if card, when clicked toggles open/show classes
function toggleCards(e) {
        e.target.classList.toggle('open');
        e.target.classList.toggle('show');
}

//adds cards to openCards array
function addToggledCards(e) {
        openCards.push(e.target);
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

//reset cards
function resetCards(e) {
    let card = document.querySelectorAll('.card');
    for (i = 0; i < card.length; i++) {
        card[i].classList.remove("open");
        card[i].classList.remove("show");
        card[i].classList.remove("match");
    }

    openCards=[];
    matchedCards=[];

}

//create array of cards, pass arrayCards to shuffle(array) function, for loop through each object(card) in array, append in list in new order
function shuffleCards(e) {
    
    const arrayCards = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(arrayCards);

    for (let eachCard of shuffledCards) {
        deck.appendChild(eachCard);
    }
}
   
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

//************** moves **************

function addMove(e) {
    moves++;
    moveCount.innerText = moves;      
    console.log('two clicks=one move');
}

function resetMoves(e) {
    moves = 0;
    moveCount.innerText = moves; 
    console.log('reset move count');
}

//************** stars **************

function moveCountStarRemove (e) {
    if (moves < 15){
        console.log("moves less than 15");
    } else if (moves === 16) {
        starList.removeChild(starList.children[0]);
    } else if (moves === 32) {
        starList.removeChild(starList.children[0]);
}}

function resetStars(e) {
    starList.innerHTML = `<li><i class="fa fa-star"></i></li> 
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>`;
}

//************** timer **************

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
    const minutes = Math.floor(time/60);
    const seconds = (time%60);
    
        if (seconds < 10) {
            timer.innerHTML = `${minutes}:0${seconds}`;
        }  else {
            timer.innerHTML = `${minutes}:${seconds}`;
        } //source - Matthew Cranford for minutes/seconds display
}
    
function stopTimer(e) {
    if (matchedCards.length == 16) {
        clearInterval(timerCount);
}}

function timerReset(e) {
    clearInterval(timerCount); 
    timerOn = false;
    time = 0;
    timer.innerHTML = `00:00`;

    deck.addEventListener('click', function(e) {
    startTimer(e);
    }
)}

//************** modal **************

function modalWin(e) {
    if (matchedCards.length == 16) {
        toggleModal(e);
        modalStats(e);
}}

function toggleModal(e){
    const modal = document.querySelector('.modal');
    modal.classList.toggle('displayToggle');
}

const modalCloseButton = document.querySelector('.modalCloseButton');
    modalCloseButton.addEventListener('click', function(e) {
        toggleModal(e);
    })
    
const modalReplayButton = document.querySelector(".modalReplayButton");
    modalReplayButton.addEventListener('click', function(e) {
        toggleModal(e);
        resetAll(e);
    })

function modalStats(e) {
    //moves
    const totalMoves = document.querySelector('.totalMoves');
    totalMoves.innerHTML = moves;
    
    //time
    const totalTime = document.querySelector('.totalTime');
    const panelTime = document.querySelector('.timer').innerHTML;
    totalTime.innerHTML = panelTime;

    //stars
    const totalRating = document.querySelector('.stars').innerHTML;
    const starsRating = document.querySelector('.totalRating');
    starsRating.innerHTML = totalRating;
}

//************** project instructions **************

//  Create a list that holds all of your cards

//  Display the cards on the page
//  - shuffle the list of cards using the provided "shuffle" method below
//  - loop through each card and create its HTML
//  - add each card's HTML to the page

//  set up the event listener for a card. If a card is clicked:
//  - display the card's symbol (put this functionality in another function that you call from this one)
//  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
//  - if the list already has another card, check to see if the two cards match
//  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
//  + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
//  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
//  + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)