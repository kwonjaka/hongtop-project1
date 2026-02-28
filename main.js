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

// 추천 메뉴 데이터베이스
const menuData = {
    한식: ['김치찌개', '불고기', '비빔밥', '삼겹살', '된장찌개', '냉면', '떡볶이', '갈비찜', '제육볶음', '순두부찌개'],
    일식: ['초밥', '라멘', '돈카츠', '우동', '규동', '텐동', '소바', '나베', '타코야끼', '오코노미야끼'],
    중식: ['짜장면', '짬뽕', '탕수육', '마라탕', '꿔바로우', '볶음밥', '멘보샤', '양꼬치', '유산슬', '마파두부'],
    양식: ['스테이크', '파스타', '피자', '햄버거', '리조또', '감바스', '샐러드', '라자냐', '샌드위치', '오믈렛'],
    기타: ['치킨', '쌀국수', '팟타이', '인도커리', '타코', '분짜', '똠양꿍', '케밥', '마라상궈', '월남쌈']
};

const categories = Object.keys(menuData);

function getRandomMenu() {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const menus = menuData[category];
    const menuName = menus[Math.floor(Math.random() * menus.length)];
    return { category, menuName };
}

function getCategoryColor(category) {
    switch (category) {
        case '한식': return '#f9e45b'; // 노랑
        case '일식': return '#82c9e4'; // 파랑
        case '중식': return '#f18d8d'; // 빨강
        case '양식': return '#a9a9a9'; // 회색
        case '기타': return '#90d790'; // 초록
        default: return '#eee';
    }
}

function createMenuElement(menuInfo, index) {
    const setDiv = document.createElement('div');
    setDiv.className = 'lotto-set'; // 기존 클래스명 유지하여 스타일 재활용
    
    const label = document.createElement('span');
    label.className = 'set-label';
    label.textContent = `추천 ${index + 1}`;
    setDiv.appendChild(label);
    
    const menuDiv = document.createElement('div');
    menuDiv.className = 'set-numbers'; // 기존 클래스명 유지
    
    const categoryTag = document.createElement('div');
    categoryTag.className = 'number-circle'; // 기존 클래스명 유지
    categoryTag.style.width = 'auto';
    categoryTag.style.padding = '0 15px';
    categoryTag.style.borderRadius = '20px';
    categoryTag.style.fontSize = '0.85em';
    categoryTag.textContent = menuInfo.category;
    categoryTag.style.backgroundColor = getCategoryColor(menuInfo.category);
    
    const nameSpan = document.createElement('span');
    nameSpan.style.marginLeft = '15px';
    nameSpan.style.fontWeight = 'bold';
    nameSpan.style.fontSize = '1.1em';
    nameSpan.textContent = menuInfo.menuName;
    
    menuDiv.appendChild(categoryTag);
    menuDiv.appendChild(nameSpan);
    
    setDiv.appendChild(menuDiv);
    return setDiv;
}

function generate10Menus() {
    allSetsContainer.innerHTML = '';
    const selectedMenus = [];
    
    // 중복 제거하며 10개 선택
    while (selectedMenus.length < 10) {
        const menu = getRandomMenu();
        if (!selectedMenus.some(m => m.menuName === menu.menuName)) {
            selectedMenus.push(menu);
        }
    }
    
    selectedMenus.forEach((menu, i) => {
        const menuElement = createMenuElement(menu, i);
        allSetsContainer.appendChild(menuElement);
    });
}

generateBtn.addEventListener('click', () => {
    generateBtn.textContent = 'AI 메뉴 분석 중...';
    generateBtn.disabled = true;
    
    // 시각적 효과를 위해 짧은 지연 시간 후 생성
    setTimeout(() => {
        generate10Menus();
        generateBtn.textContent = 'AI 추천 메뉴 10개 생성';
        generateBtn.disabled = false;
        // 스크롤을 맨 위로 이동
        allSetsContainer.scrollTop = 0;
    }, 600);
});

// 초기 실행 시 10개 메뉴 즉시 표시
document.addEventListener('DOMContentLoaded', generate10Menus);