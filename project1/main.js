const generateBtn = document.getElementById('generate-btn');
const allSetsContainer = document.getElementById('all-sets-container');
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

// 가상의 "당첨 확률 높은 번호" (역대 최다 출현 번호 상위 20개 예시)
const hotNumbers = [1, 34, 18, 27, 43, 12, 17, 10, 33, 5, 20, 31, 14, 39, 45, 24, 2, 37, 7, 21];

function generateAILottoNumbers() {
    const numbers = new Set();
    
    // 확률을 높이기 위해 hotNumbers에서 3~4개를 우선 선택
    const hotCount = Math.floor(Math.random() * 2) + 3; // 3개 또는 4개
    const shuffledHot = [...hotNumbers].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < hotCount; i++) {
        numbers.add(shuffledHot[i]);
    }
    
    // 나머지는 일반 랜덤 번호로 채움
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    
    return Array.from(numbers).sort((a, b) => a - b);
}

function getNumberColor(number) {
    if (number <= 10) return '#f9e45b'; // yellow
    if (number <= 20) return '#82c9e4'; // blue
    if (number <= 30) return '#f18d8d'; // red
    if (number <= 40) return '#a9a9a9'; // gray
    return '#90d790'; // green
}

function createLottoSetElement(numbers, index) {
    const setDiv = document.createElement('div');
    setDiv.className = 'lotto-set';
    
    const label = document.createElement('span');
    label.className = 'set-label';
    label.textContent = `${index + 1}회`;
    setDiv.appendChild(label);
    
    numbers.forEach(num => {
        const circle = document.createElement('div');
        circle.className = 'number-circle';
        circle.textContent = num;
        circle.style.backgroundColor = getNumberColor(num);
        setDiv.appendChild(circle);
    });
    
    return setDiv;
}

function generate10Sets() {
    allSetsContainer.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const numbers = generateAILottoNumbers();
        const setElement = createLottoSetElement(numbers, i);
        allSetsContainer.appendChild(setElement);
    }
}

generateBtn.addEventListener('click', () => {
    // 버튼 애니메이션 효과
    generateBtn.textContent = '분석 중...';
    generateBtn.disabled = true;
    
    setTimeout(() => {
        generate10Sets();
        generateBtn.textContent = 'AI 분석 번호 추첨';
        generateBtn.disabled = false;
    }, 500);
});

// 초기 화면에 10개 세트 생성
generate10Sets();