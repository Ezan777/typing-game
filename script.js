const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
    'London, that great cesspool into which all the loungers and idlers of the Empire are irresistibly drained.',
];
// Variables needed to store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// Variable to save the starting time
let startTime = Date.now;
//Save the page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', ()=>{
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length); // Math.random returns a number in interval [0,1) we perform * max to scale that number
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' '); // The method split divide a string into an array of substring. The string is divided by a pattern in this case ' '
    // Reset the word index for tracking
    wordIndex = 0;

    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map((word)=>{return '<span>${word} </span>'}) /* Span tag is used to markup a part of a text, or a part of a document
    .map methods return a new array populated with the results of calling a provided function on every element in the calling array. */
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join(''); /* The join method returns a string created by concatenating all of the elements in an array 
    separated by commas (default) or a specified separator string. */
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    //Clear any prior message
    messageElement.innerText = '';

    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // Set focus
    typedValueElement.focus();
    // Set the event handler

    // Start the timer
    startTime = new Date().getTime;
})
