/*
 * Create a list that holds all of your cards
 */
// It would be better to fetch data froma json or a folder of img 
const cards = [
    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"
];

const openShowCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// let's shuffle the cards before creating the grid!
shuffle(cards);

// create the grid and add it to the page

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

/* we want the card to change color and show icon when its clicked so it means to:
*   - loop on all li which class is card
*   - add an eventListener on the click
*   - modify class of li to add open show
*   TODO: find a way to better refactor this
*/


addcardListener = () => {
    document.querySelectorAll(".card").forEach((clickedCard) => {
        clickedCard.addEventListener("click", () => {
            clickedCard.className = "card open show";
            openShowCards.push(clickedCard); //we store the clickedcard in the openShowCards array
            
            if (openShowCards.length > 1) {
                openShowCards.forEach(element => {
                    console.log(element.firstChild);
                    //here we need to compare if the two cards match
                });
              
            }
        })

    }, false);
    
}
addcardListener();



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
