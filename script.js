// Array of quotes as fallback
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
    },
    {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins"
    },
    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb"
    },
    {
        text: "Your limitation—it's only your imagination.",
        author: "Unknown"
    },
    {
        text: "Push yourself, because no one else is going to do it for you.",
        author: "Unknown"
    },
    {
        text: "Great things never come from comfort zones.",
        author: "Unknown"
    },
    {
        text: "Dream it. Wish it. Do it.",
        author: "Unknown"
    },
    {
        text: "Success doesn't just find you. You have to go out and get it.",
        author: "Unknown"
    },
    {
        text: "The harder you work for something, the greater you'll feel when you achieve it.",
        author: "Unknown"
    },
    {
        text: "Dream bigger. Do bigger.",
        author: "Unknown"
    },
    {
        text: "Don't stop when you're tired. Stop when you're done.",
        author: "James Bond"
    },
    {
        text: "Wake up with determination. Go to bed with satisfaction.",
        author: "George Lorimer"
    },
    {
        text: "Do something today that your future self will thank you for.",
        author: "Sean Croxton"
    }
];

let currentQuote = {};
let isLoading = false;

// DOM elements
const quoteBox = document.getElementById('quote-box');
const textElement = document.getElementById('text');
const authorElement = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetQuoteBtn = document.getElementById('tweet-quote');

// Color schemes for background animation
const colors = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a8edea', '#fed6e3'],
    ['#ffecd2', '#fcb69f'],
    ['#ff8a80', '#ea4c89']
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayRandomQuote();
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    newQuoteBtn.addEventListener('click', function() {
        if (!isLoading) {
            displayRandomQuote();
        }
    });

    // Allow Enter key to get new quote
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !isLoading) {
            displayRandomQuote();
        }
    });
}

// Display a random quote
function displayRandomQuote() {
    if (isLoading) return;
    
    setLoadingState(true);
    
    // Try to fetch from API first, fallback to local quotes
    fetchQuoteFromAPI()
        .then(quote => {
            if (quote) {
                displayQuote(quote);
            } else {
                // Fallback to local quotes
                const randomIndex = Math.floor(Math.random() * quotes.length);
                displayQuote(quotes[randomIndex]);
            }
        })
        .catch(() => {
            // Fallback to local quotes
            const randomIndex = Math.floor(Math.random() * quotes.length);
            displayQuote(quotes[randomIndex]);
        })
        .finally(() => {
            setLoadingState(false);
        });
}

// Fetch quote from API
async function fetchQuoteFromAPI() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        if (response.ok) {
            const data = await response.json();
            return {
                text: data.content,
                author: data.author
            };
        }
    } catch (error) {
        console.log('API fetch failed, using local quotes');
    }
    return null;
}

// Display the quote with animation
function displayQuote(quote) {
    currentQuote = quote;
    
    // Add fade out animation
    textElement.style.opacity = '0';
    authorElement.style.opacity = '0';
    
    setTimeout(() => {
        textElement.textContent = quote.text;
        authorElement.textContent = quote.author;
        
        // Update tweet link
        updateTweetLink();
        
        // Change background color
        changeBackgroundColor();
        
        // Add fade in animation
        textElement.style.opacity = '1';
        authorElement.style.opacity = '1';
    }, 200);
}

// Update the tweet link
function updateTweetLink() {
    const tweetText = `"${currentQuote.text}" - ${currentQuote.author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    tweetQuoteBtn.href = tweetUrl;
}

// Change background color with animation
function changeBackgroundColor() {
    const randomColorScheme = colors[Math.floor(Math.random() * colors.length)];
    const gradient = `linear-gradient(135deg, ${randomColorScheme[0]} 0%, ${randomColorScheme[1]} 100%)`;
    
    document.body.style.background = gradient;
}

// Set loading state
function setLoadingState(loading) {
    isLoading = loading;
    
    if (loading) {
        quoteBox.classList.add('loading');
        newQuoteBtn.disabled = true;
        newQuoteBtn.textContent = 'Loading...';
    } else {
        quoteBox.classList.remove('loading');
        newQuoteBtn.disabled = false;
        newQuoteBtn.textContent = 'New Quote';
    }
}

// Add smooth transitions
textElement.style.transition = 'opacity 0.3s ease';
authorElement.style.transition = 'opacity 0.3s ease';
document.body.style.transition = 'background 0.5s ease';
