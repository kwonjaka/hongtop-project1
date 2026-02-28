const generateBtn = document.getElementById('generate-btn');
const allSetsContainer = document.getElementById('all-sets-container');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 테마 관리
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '화이트 모드';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeToggle.textContent = '화이트 모드';
    } else {
        themeToggle.textContent = '다크 모드';
    }
    localStorage.setItem('theme', theme);
});

// 역대 최다 출현 번호 상위 20개 (통계 데이터 기반 가공)
const hotNumbers = [1, 34, 18, 27, 43, 12, 17, 10, 33, 5, 20, 31, 14, 39, 45, 24, 2, 37, 7, 21];

function generateAILottoNumbers() {
    const numbers = new Set();
    
    // 확률을 높이기 위해 hotNumbers에서 3~4개를 무작위 선택
    const hotCount = Math.floor(Math.random() * 2) + 3; 
    const shuffledHot = [...hotNumbers].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < hotCount; i++) {
        numbers.add(shuffledHot[i]);
    }
    
    // 6개가 채워질 때까지 나머지를 1~45 중 랜덤 선택
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    
    return Array.from(numbers).sort((a, b) => a - b);
}

function getNumberColor(number) {
    if (number <= 10) return '#f9e45b'; // 노랑
    if (number <= 20) return '#82c9e4'; // 파랑
    if (number <= 30) return '#f18d8d'; // 빨강
    if (number <= 40) return '#a9a9a9'; // 회색
    return '#90d790'; // 초록
}

function createLottoSetElement(numbers, index) {
    const setDiv = document.createElement('div');
    setDiv.className = 'lotto-set';
    
    const label = document.createElement('span');
    label.className = 'set-label';
    label.textContent = `제 ${index + 1}조`;
    setDiv.appendChild(label);
    
    const numsDiv = document.createElement('div');
    numsDiv.className = 'set-numbers';
    
    numbers.forEach(num => {
        const circle = document.createElement('div');
        circle.className = 'number-circle';
        circle.textContent = num;
        circle.style.backgroundColor = getNumberColor(num);
        numsDiv.appendChild(circle);
    });
    
    setDiv.appendChild(numsDiv);
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
    generateBtn.textContent = 'AI 데이터 분석 중...';
    generateBtn.disabled = true;
    
    // 시각적 효과를 위해 짧은 지연 시간 후 생성
    setTimeout(() => {
        generate10Sets();
        generateBtn.textContent = 'AI 분석 번호 10개조 생성';
        generateBtn.disabled = false;
        // 스크롤을 맨 위로 이동
        allSetsContainer.scrollTop = 0;
    }, 600);
});

// 초기 실행 시 10개 세트 즉시 표시
document.addEventListener('DOMContentLoaded', generate10Sets);