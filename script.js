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

// Handle what happens while the player is typing
function onInput() {
    // Get the current word
    const currentWord = words[wordIndex];
    // Get the current value
    const typedValue = typedValueElement.value;

    if(typedValue === currentWord && wordIndex === words.length - 1){
        // Case: end of the sentence
        // Display success
        const elapsedTime = new Date().getTime() - startTime;
        const message = `Congratulations! You have finsihed in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message;
        // Remove higlight from the last word
        quoteElement.childNodes[wordIndex].className = "";
        // Reset the textbox value to empty string because the game is finished
        this.value = '';
        // Remove the textbox
        typedValueElement.className = "hide";
        // Remove the input listener
        this.removeEventListener('input', onInput);
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord){
        // Case: end of word
        // Clear the typedValueElement for the new word
        typedValueElement.value = '';
        // Move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        // Highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)){
        // Case: currently correct
        // Highlight the next word
        typedValueElement.className = '';
    } else {
        // Case: error
        typedValueElement.className = 'error';
    }
}

// This event listener will be triggered when the player click on start. It will show a quote, reset all the element on the UI and the words array
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
    const spanWords = words.map((word)=>{return `<span>${word} </span>`}) /* Span tag is used to markup a part of a text, or a part of a document
    .map methods return a new array populated with the results of calling a provided function on every element in the calling array. */
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join(''); /* The join method returns a string created by concatenating all of the elements in an array 
    separated by commas (default) or a specified separator string. */
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    //Clear any prior message
    messageElement.innerText = '';
    // Show the textbox
    typedValueElement.className = "show";

    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // Set focus
    typedValueElement.focus();
    // Set the event handler

    // Start the timer
    startTime = new Date().getTime();

    // Start the input listener
    typedValueElement.addEventListener('input', onInput);
})

// Theme changer
const themeButton = document.getElementById('theme-button');
themeButton.addEventListener('click', () => {
    let theme = document.body.className;
    if(theme === 'light-theme'){
        document.body.className = 'dark-theme';
        themeButton.innerHTML = `<span class='material-icons-outlined colored'>light_mode</span>`;
    } else {
        document.body.className = 'light-theme';
        themeButton.innerHTML = `<span class="material-icons-outlined colored">dark_mode</span>`;
    }
})