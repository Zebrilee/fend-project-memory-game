/*
 * Create a list that holds all of your cards
 */

 // declaration of all the variables we need
const cards = [
    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"
],
deck = document.querySelector('#deck');

let matchingCards = [],
pairNumberReached = 0,
moves = 0;


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
})(); // we run the function, one other solution would have been to write createHtmlGrid(); on next line instead


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
    deck.addEventListener('click', event => {
       const clickedCard = event.target;
       if (isClickValid){
           turnedOverCard(clickedCard);
           cardToCompare(clickedCard);
           if (matchingCards.length === 2){
               // here we need to check if card are matching
               matchCard(clickedCard);
               addCountMove();
           }
        }
        
        });
}
addCardEventListener();



// add class to card that are turned over
turnedOverCard = (card) => {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// Add turned over card in an array to compare them
cardToCompare = (clickedCard) => {
    matchingCards.push(clickedCard);
}

isClickValid = (clickTarget) => {
    return (
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget)
    );
}


// check if two cards match function
matchCard = () => {
    const pairOfCard = 8;
    
    if (matchingCards[0].firstChild.className === 
        matchingCards[1].firstChild.className) {
        matchingCards[0].classList.toggle('match');
        matchingCards[1].classList.toggle('match');
        matchingCards = [];
        pairNumberReached++;
        if (pairNumberReached === pairOfCard) {
            //gameOver();
            console.log('the end');
        }
    } else{
        setTimeout(() => {
        turnedOverCard(matchingCards[0]);
        turnedOverCard(matchingCards[1]);
        matchingCards = [];
        }, 1000);
        
    };
}

// gameOver = () => {
//     console.log('the end');
// }

addCountMove = () => {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
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
