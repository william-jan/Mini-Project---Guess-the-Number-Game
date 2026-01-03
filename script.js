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
    correct: 'Hell Yeah!You guessed it right!',
    high: 'Too High!',
    low: 'Too Low!',
    lost: 'You Lost, Try Again!'
}

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
    if (!guessInput.value) {
        alert('Please enter a number between 1 and 100.');
        return;
    }

    let guess = Number(guessInput.value);

    if (guess === secretNumber) {
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
        result.textContent = resultMessages.lost;
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