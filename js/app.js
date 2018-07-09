/*
 * Create a list that holds all of your cards
 */

 // declaration of all the variables we need
const cards = [
    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"
],
deck = document.querySelector('#deck'),
toggledCardArray = [];


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

// Toggle function 
toggledCard = (clickedCard) => {
    clickedCard.classList.toggle('open');
    clickedCard.classList.toggle('show');
}

// Add toggled card to an array function
addToggledCards = (clickedCard) => {
    toggledCardArray.push(clickedCard);
}

// check if two cards match function
matchCard = () => {
    if(toggledCardArray[0].firstChild.className === toggledCardArray[1].firstChild.className){
        console.log('yataaaa');
    }else{
        console.log('no match');
    };
}

// card event listener function 
addCardEventListener = () => {
    deck.addEventListener('click', event => {
       const clickedCard = event.target;
       if (clickedCard.classList.contains('card') && toggledCardArray.length < 2){
           toggledCard(clickedCard);
           addToggledCards(clickedCard);
           if (toggledCardArray.length === 2){
               // here we need to check if card are matching
               matchCard();
           }
        }
        
        });
}
addCardEventListener();





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
