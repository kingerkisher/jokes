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
    updateSocialShare(randomJoke);

}

function updateSocialShare(jokeObj) {
    const joke = `${jokeObj.joke} — ${jokeObj.author}`;

    // Twitter
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(joke)}`;
    shareBtn.setAttribute('onclick', `window.open('${tweetURL}', '_blank')`);

    // WhatsApp
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(joke)}`;
    document.getElementById('share-whatsapp').setAttribute('onclick', `window.open('${whatsappURL}', '_blank')`);

    // Facebook
    const fbURL = `https://www.facebook.com/sharer/sharer.php?u=&quote=${encodeURIComponent(joke)}`;
    document.getElementById('share-facebook').setAttribute('onclick', `window.open('${fbURL}', '_blank')`);
}


newJokeBtn.addEventListener('click', showNewJoke);
