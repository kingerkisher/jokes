// Get jokes from API
let jokes = [];

const jokeText = document.querySelector('.joke-text');
const authorText = document.querySelector('.fst-italic span');
const newJokeBtn = document.getElementById('new-joke');
const shareBtn = document.getElementById('share-joke');

fetch('jokes.json')
    .then(res => res.json())
    .then(data => {
        jokes = data;
        showNewJoke();
    })
    .catch(error => {
        jokeText.textContent = "Failed to load jokes.";
        console.error("Error loading jokes:", error);
    });

function showNewJoke() {
    if (jokes.length === 0) return;
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    jokeText.innerHTML = `<i class="bi bi-quote fs-2"></i> ${randomJoke.joke}`;
    authorText.textContent = randomJoke.author || "Unknown";
    updateTwitterShare(randomJoke);
}

function updateTwitterShare(jokeObj) {
    const tweetText = `${jokeObj.joke} — ${jokeObj.author}`;
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    shareBtn.setAttribute('onclick', `window.open('${tweetURL}', '_blank')`);
}

newJokeBtn.addEventListener('click', showNewJoke);
