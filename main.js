
const generateBtn = document.getElementById('generate-btn');
const numberCircles = document.querySelectorAll('.number-circle');

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers);
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
