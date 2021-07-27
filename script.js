const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const whatsappBtn = document.getElementById("whatsapp");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];
// Show loading
function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}
//hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// Show new quotes
function showQuote() {
  loading();

  //  Pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if author field is blank and replace it with unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //   Check if the quote length is less than 30
  if (quote.text.length > 30) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-text");
  }
  // Hide loader
  quoteText.textContent = quote.text;
  complete();
}

//  Get quotes from API
async function getQuotes() {
  loading();

  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    showQuote();
  } catch (error) {
    // Error
    console.log("Whoops no quote", error);
  }
}
// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
function whatsappThis() {
  const whatsappUrl = `https://api.whatsapp.com/send?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(whatsappUrl, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", showQuote);
twitterBtn.addEventListener("click", tweetQuote);
whatsappBtn.addEventListener("click", whatsappThis);
// On load
getQuotes();

// Other API
//https://type.fit/api/quotes
