 // declaration of all the variables we need
const cards = [
    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"
],
deck  = document.querySelector('#deck'),
stars = document.querySelectorAll('.stars li'),
clock = document.querySelector('.clock');

let matchingCards = [],
    pairNumberReached = 0,
    moves = 0,
    clockDelay,
    time = 0,
    timeLapse,
    timerOff = true;

    let seconds = 0,
    minutes = 0,
    hours = 0;

// let's shuffle the cards before creating the grid!
shuffle(cards);

// create HTML grid function
(createHtmlGrid = () => {
    const ul = document.getElementById('deck');
    // we loop on the array in order to create as much li>span as there are cards
    cards.forEach(function (element) {

        const li = document.createElement('li');
        li.className = "card";
        const span = document.createElement('span');

        span.className = "fa " + element;
        li.append(span);
        ul.append(li);
    });
})();


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
}



// card event listener function 
addCardEventListener = () => {
    const deck = document.querySelector('#deck');

    deck.addEventListener('click', event => {
        const clickedCard = event.target;


        if (timerOff) {
            timerOff = false;
            startTimer();
        }

        displayCardSymbol(clickedCard);
        matchingCards.push(clickedCard); // array was empty first
        if (matchingCards.length === 2) {
            // here we need to check if card are matching
            matchCard(clickedCard);
            addCountMove();
            starRating();
        }
   
    });
}
addCardEventListener();



// add class to card that are turned over
displayCardSymbol = (card) => {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// check if two cards match function
matchCard = () => {
    const pairOfCard = 4;
    
    
    if (matchingCards[0].firstChild.className === 
        matchingCards[1].firstChild.className) {
        matchingCards[0].classList.toggle('match');
        matchingCards[1].classList.toggle('match');
        matchingCards = [];
        pairNumberReached++;
        if (pairNumberReached === pairOfCard) {
            gameOver();
            console.log('the end');

            
        }
    } else{
        setTimeout(() => {
        displayCardSymbol(matchingCards[0]);
        displayCardSymbol(matchingCards[1]);
        matchingCards = [];
        }, 1000);
        
    };
}

// count the number of moves function
addCountMove = () => {
    moves++;
    const movesNumber = document.querySelector('.moves');
    movesNumber.innerHTML = moves;
}

// timer function 
startTimer = () => {
    const timer = document.querySelector('.clock');

    clockDelay = setInterval(function () {
        if (seconds < 10) {
            timer.innerHTML = `${minutes}:0${seconds}`;
        } else {
            timer.innerHTML = `${minutes}:${seconds}`;
        }
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes == 60) {
            hours++;
            minutes = 0;
        }

    }, 1000);
}

setStars = () => {

    let starRating = 3;
    if (moves <= 8) {
        starRating = 3;
    } else if (moves > 8 && moves <= 15) {
        starRating = 2;
    } else {
        starRating = 1;
    }
}

starRating = () =>{
    if (moves === 6 || moves === 8) {
        setStars();
    }
}

stopTimer = () => {
    clearInterval(clockDelay);
    timeLapse = timer.innerHTML;
}

gameOver = () => {
    console.log('the end');
    const modal = document.querySelector('.overlay');
    modal.classList.add('show-popup');
    //stopTimer();
    messageScore();
}

// create Modal 
createHtmlModal = () => {
    const container = document.querySelector('.container');
    const modal = document.createElement('div');
    modal.className = "overlay";
    
    const popup = document.createElement('div');
    popup.className = "popup";
    modal.append(popup);

    const h2 = document.createElement('h2');
    h2.innerHTML = "Congratulations !!! You rocks!";
    popup.append(h2);

    const h3 = document.createElement('h3');
    h3.innerHTML = "Stats of the game";
    popup.append(h3);

    const resultStats = document.createElement('div');
    resultStats.className = "result-score";
    popup.append(resultStats);

    const movesNumber = document.createElement('p');
    movesNumber.className = 'movesNumber';
    resultStats.append(movesNumber);

    const timeDuration = document.createElement('p');
    timeDuration.className = ' timeDuration';
    resultStats.append(timeDuration);

    const starRating = document.createElement('p');
    starRating.className = 'starRating';
    resultStats.append(starRating);

    const button = document.createElement('button');
    button.innerHTML = 'New game'
    button.className = 'new-game';
    popup.append(button);

    container.append(modal);
    
};
createHtmlModal();


messageScore = () => {
    
    //showing move, rating, time on modal
    document.querySelector(".movesNumber").innerHTML = 'Moves : ' + moves;
    document.querySelector(".starRating").innerHTML = 'Stars : ' + starRating;
    document.querySelector(".timeDuration").innerHTML = 'Time :  ' + timeDuration;
}

resetMoves = () => {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}


resetGame = () => {
    //resetClockAndTime();
    resetMoves();
    resetStars();
    // resetCards();
    shuffle(cards);
}
document.querySelector('.restart').addEventListener('click', resetGame);

closeModal = () =>{
    resetGame();
    modal = document.querySelector('.overlay');
    modal.classList.remove("show-popup");
}

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
