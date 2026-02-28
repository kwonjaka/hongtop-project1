const generateBtn = document.getElementById('generate-btn');
const allSetsContainer = document.getElementById('all-sets-container');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Theme Management
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
    localStorage.setItem('theme', theme);
});

// Recommended Menu Database
const menuData = {
    'Korean Food': ['Kimchi Jjigae', 'Bulgogi', 'Bibimbap', 'Samgyeopsal', 'Doenjang Jjigae', 'Naengmyeon', 'Tteokbokki', 'Galbijjim', 'Jeyuk Bokkeum', 'Sundubu Jjigae'],
    'Japanese Food': ['Sushi', 'Ramen', 'Tonkatsu', 'Udon', 'Gyudon', 'Tendon', 'Soba', 'Nabe', 'Takoyaki', 'Okonomiyaki'],
    'Chinese Food': ['Jajangmyeon', 'Jjamppong', 'Tangsuyuk', 'Malatang', 'Guobaorou', 'Fried Rice', 'Menbosha', 'Lamb Skewers', 'Yusansul', 'Mapo Tofu'],
    'Western Food': ['Steak', 'Pasta', 'Pizza', 'Hamburger', 'Risotto', 'Gambas', 'Salad', 'Lasagna', 'Sandwich', 'Omelet'],
    'Others': ['Fried Chicken', 'Pho', 'Pad Thai', 'Indian Curry', 'Taco', 'Bun Cha', 'Tom Yum Goong', 'Kebab', 'Mala Xiang Guo', 'Vietnamese Spring Rolls']
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
        case 'Korean Food': return '#f9e45b'; // Yellow
        case 'Japanese Food': return '#82c9e4'; // Blue
        case 'Chinese Food': return '#f18d8d'; // Red
        case 'Western Food': return '#a9a9a9'; // Grey
        case 'Others': return '#90d790'; // Green
        default: return '#eee';
    }
}

function createMenuElement(menuInfo, index) {
    const setDiv = document.createElement('div');
    setDiv.className = 'lotto-set'; 
    
    const label = document.createElement('span');
    label.className = 'set-label';
    label.textContent = `Recommendation ${index + 1}`;
    setDiv.appendChild(label);
    
    const menuDiv = document.createElement('div');
    menuDiv.className = 'set-numbers'; 
    
    const categoryTag = document.createElement('div');
    categoryTag.className = 'number-circle';
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
    
    // Select 10 menus without duplicates
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
    generateBtn.textContent = 'AI Analyzing Menus...';
    generateBtn.disabled = true;
    
    // Short delay for visual effect
    setTimeout(() => {
        generate10Menus();
        generateBtn.textContent = 'Generate 10 AI Recommended Menus';
        generateBtn.disabled = false;
        allSetsContainer.scrollTop = 0;
    }, 600);
});

// Initial generation
document.addEventListener('DOMContentLoaded', generate10Menus);