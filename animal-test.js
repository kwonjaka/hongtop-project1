const URL = "https://teachablemachine.withgoogle.com/models/PMwBKtq8Z/";

let model, webcam, labelContainer, maxPredictions;
const startBtn = document.getElementById('start-btn');
const loadingOverlay = document.getElementById('loading-overlay');
const resultContainer = document.getElementById('result-container');
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

async function init() {
    startBtn.style.display = 'none';
    loadingOverlay.classList.remove('hidden');

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true; 
        webcam = new tmImage.Webcam(280, 280, flip); 
        await webcam.setup(); 
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            const labelWrapper = document.createElement("div");
            labelWrapper.className = "prediction-wrapper";
            
            const labelName = document.createElement("span");
            labelName.className = "label-name";
            
            const barContainer = document.createElement("div");
            barContainer.className = "bar-container";
            
            const bar = document.createElement("div");
            bar.className = "bar";
            
            const percentage = document.createElement("span");
            percentage.className = "percentage";
            
            barContainer.appendChild(bar);
            labelWrapper.appendChild(labelName);
            labelWrapper.appendChild(barContainer);
            labelWrapper.appendChild(percentage);
            labelContainer.appendChild(labelWrapper);
        }
        
        loadingOverlay.classList.add('hidden');
        resultContainer.classList.remove('hidden');
    } catch (e) {
        console.error(e);
        alert("웹캠을 시작할 수 없거나 모델 로딩에 실패했습니다.");
        startBtn.style.display = 'block';
        loadingOverlay.classList.add('hidden');
    }
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classTitle = prediction[i].className;
        const prob = prediction[i].probability.toFixed(2);
        
        const wrapper = labelContainer.childNodes[i];
        wrapper.querySelector('.label-name').textContent = classTitle;
        wrapper.querySelector('.bar').style.width = (prob * 100) + "%";
        wrapper.querySelector('.percentage').textContent = Math.round(prob * 100) + "%";
        
        // 특정 동물상 강조 컬러 (예시)
        if (classTitle.includes("강아지")) {
            wrapper.querySelector('.bar').style.backgroundColor = "#ffc107";
        } else if (classTitle.includes("고양이")) {
            wrapper.querySelector('.bar').style.backgroundColor = "#9c27b0";
        }
    }
}