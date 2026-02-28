
const generateBtn = document.getElementById('generate-btn');
const numberCircles = document.querySelectorAll('.number-circle');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Theme logic
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'White Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeToggle.textContent = 'White Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
    localStorage.setItem('theme', theme);
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    numberCircles.forEach((circle, index) => {
        circle.textContent = numbers[index];
        const number = numbers[index];
        let color;
        if (number <= 10) {
            color = '#f9e45b'; // yellow
        } else if (number <= 20) {
            color = '#82c9e4'; // blue
        } else if (number <= 30) {
            color = '#f18d8d'; // red
        } else if (number <= 40) {
            color = '#a9a9a9'; // gray
        } else {
            color = '#90d790'; // green
        }
        circle.style.backgroundColor = color;
    });
}

generateBtn.addEventListener('click', () => {
    const newNumbers = generateLottoNumbers();
    displayNumbers(newNumbers);
});
