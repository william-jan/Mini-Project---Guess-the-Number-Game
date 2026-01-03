const guessInput = document.querySelector('#guessInput');
const guessButton = document.querySelector('#guessButton');
const result = document.querySelector('#result');
const attempts = document.querySelector('#attempts');
const resetButton = document.querySelector('#reset');
const answer = document.querySelector('#answer');


// Base Variables and Display
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsCount = 7;


// Result Messages
const resultMessages = {
    correct: 'Hell Yeah! You guessed it right!',
    high: 'Too High!',
    low: 'Too Low!',
    lost: 'You Lost, Try Again!'
}

// For Audio
const clickSound = new Audio('sounds/beep-313342.mp3');
const correctSound = new Audio('sounds/correct-156911.mp3');
const wrongSound = new Audio('sounds/error-mistake-sound-effect-incorrect-answer-437420.mp3');
const resetSound = new Audio('sounds/board-start-38127.mp3');
const bgSound = new Audio('sounds/George Winston - Variations on the Canon by Johann Pachelbel (Mastered).mp3')
const muteBtn = document.querySelector('#muteBtn');

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

let musicStarted = false;

function trystartMusic() {
    if (!musicStarted) {
        bgSound.play();
        musicStarted = true;
    }
}

document.addEventListener('click', trystartMusic, {once: true});
document.addEventListener('keydown', trystartMusic, {once: true});

// Mute Button
let isMuted = false;

muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    bgSound.muted = isMuted;
    muteBtn.textContent = isMuted ? '🔇 Mute (M)' : '🔊 Mute (M)';
})

// Hotkeys for Mute Button
document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'm') {
        muteBtn.click();
    }
    
})

// Input Text to Number Only
guessInput.addEventListener('input', () => {
    guessInput.value = guessInput.value.replace(/[^0-9]/g, '');

    if (guessInput.value === '') return;

    const numberInput = Number(guessInput.value);

    if (numberInput > 100) {
        guessInput.value = '100';
    }

    if (numberInput < 1) {
        guessInput.value = '1';
    }
});

// Guess Button Event Click
guessButton.addEventListener('click', () => {
    playSound(clickSound);
    
    if (!guessInput.value) {
        alert('Please enter a number between 1 and 100.');
        return;
    }

    let guess = Number(guessInput.value);

    if (guess === secretNumber) {
        playSound(correctSound);
        result.textContent = resultMessages.correct;
        answer.classList.add('show');
        answer.textContent = secretNumber;
        guessInput.disabled = true;
        guessButton.disabled = true;
        guessButton.style.cursor = 'not-allowed';
    } else if (guess < secretNumber) {
        attemptsCount--;
        attempts.textContent = `Attempts Left: ${attemptsCount}`;
        result.textContent = resultMessages.low;
    } else if (guess > secretNumber) {
        attemptsCount--;
        attempts.textContent = `Attempts Left: ${attemptsCount}`;
        result.textContent = resultMessages.high;
    }

    if (attemptsCount === 0) {
        playSound(wrongSound);
        result.textContent = resultMessages.lost;
        answer.classList.add('show');
        answer.textContent = secretNumber;
        guessInput.disabled = true;
        guessInput.style.cursor = 'not-allowed';
        guessButton.disabled = true;
        guessButton.style.cursor = 'not-allowed';
    }

})

// Hotkeys for Guess Button
guessInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        guessButton.click();
    }
})

// Reset Button
resetButton.addEventListener('click', () => {
    playSound(resetSound);
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attemptsCount = 7;
    attempts.textContent = `Attempts Left: ${attemptsCount}`;
    result.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessInput.style.cursor = 'pointer';
    guessButton.disabled = false;
    guessButton.style.cursor = 'pointer';
    answer.classList.remove('show');
    answer.textContent = '';

    guessInput.focus();
})

// Hotkeys for Reset Button
document.addEventListener('keydown', e => {
    if (e.altKey && e.key === 'Enter') {
        e.preventDefault();
        resetButton.click();
    }
})


guessInput.focus();