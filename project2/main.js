const analyzeBtn = document.getElementById('analyze-btn');
const loadingSection = document.getElementById('loading-section');
const resultSection = document.getElementById('result-section');
const loadingText = document.getElementById('loading-text');

// 가상의 분석 결과 데이터 (Mock Data)
const mockStocks = [
    {
        market: 'KOSPI',
        marketClass: 'kospi',
        name: '현대자동차',
        code: '005380',
        price: '254,000원',
        change: '▲ 4,500 (+1.80%)',
        changeClass: 'up',
        reason: '북미 실적 호조 지속 및 주주환원 정책 확대. 자사주 소각 등 밸류업 프로그램 수혜 기대.',
        techWeekly: '20주선 지지 후 반등, MACD 시그널 교차 임박',
        techVolume: '최근 3주간 기관 누적 순매수 150만주 유입',
        techRsi: '62 (단기 상승 모멘텀 유지)',
        fwdPer: '4.8x',
        pbr: '0.6x',
        roe: '13.2%',
        valueDesc: '글로벌 경쟁사 대비 압도적인 저평가 상태. 배당수익률 5% 이상 기대.',
        news: [
            { sentiment: 'positive', label: '호재', text: '인도 법인 IPO 추진 기대감 (AI분석: 긍정적)' },
            { sentiment: 'positive', label: '호재', text: '북미 판매량 역대 최고치 경신 (AI분석: 매우 긍정적)' },
            { sentiment: 'neutral', label: '중립', text: '환율 변동성 확대 우려 (AI분석: 제한적 영향)' }
        ]
    },
    {
        market: 'KOSDAQ',
        marketClass: 'kosdaq',
        name: '알테오젠',
        code: '196170',
        price: '185,000원',
        change: '▲ 12,000 (+6.94%)',
        changeClass: 'up',
        reason: '독점적 SC제형 변환 기술(ALT-B4) 가치 부각. 글로벌 빅파마와의 추가 기술수출(L/O) 기대감.',
        techWeekly: '역사적 신고가 경신 후 안착 시도, 5주선 타고 상승 중',
        techVolume: '외국인 대량 매수세 유입, 거래대금 코스닥 상위권 지속',
        techRsi: '71 (강한 매수세 지속)',
        fwdPer: 'N/A',
        pbr: '15.2x',
        roe: '-5.1%',
        valueDesc: '바이오 섹터 특성상 현재 실적보다 파이프라인 미래 가치 프리미엄 반영 중.',
        news: [
            { sentiment: 'positive', label: '호재', text: '글로벌 제약사와 독점 계약 변경 (AI분석: 강력 매수 신호)' },
            { sentiment: 'positive', label: '호재', text: 'MSCI 지수 편입에 따른 자금 유입 기대 (AI분석: 수급 긍정적)' },
            { sentiment: 'negative', label: '악재', text: '단기 급등에 따른 차익실현 매물 출회 (AI분석: 주의)' }
        ]
    }
];

function updateUIWithStock(stock) {
    document.querySelector('.market-badge').textContent = stock.market;
    document.querySelector('.market-badge').className = `market-badge ${stock.marketClass}`;
    document.getElementById('stock-name').textContent = stock.name;
    document.getElementById('stock-code').textContent = stock.code;
    
    document.getElementById('current-price').textContent = stock.price;
    const priceChangeEl = document.getElementById('price-change');
    priceChangeEl.textContent = stock.change;
    priceChangeEl.className = `price-change ${stock.changeClass}`;

    document.getElementById('recommendation-reason').textContent = stock.reason;

    // 기술적 분석 데이터
    document.getElementById('weekly-trend').textContent = stock.techWeekly;
    document.getElementById('volume-analysis').textContent = stock.techVolume;
    document.getElementById('rsi').textContent = stock.techRsi;
    
    // 가치 분석 데이터
    document.getElementById('forward-per').textContent = stock.fwdPer;
    document.getElementById('pbr').textContent = stock.pbr;
    document.getElementById('roe').textContent = stock.roe;
    document.getElementById('value-desc').textContent = stock.valueDesc;

    // 뉴스 분석 데이터
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';
    stock.news.forEach(newsItem => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="news-sentiment ${newsItem.sentiment}">${newsItem.label}</span> ${newsItem.text}`;
        newsList.appendChild(li);
    });
}

const loadingTexts = [
    "시장 데이터 수집 중...",
    "기술적 차트 패턴 분석 중...",
    "선행 PER 및 가치 지표 계산 중...",
    "최근 뉴스 및 모멘텀 분석 중...",
    "최적의 종목 도출 중..."
];

analyzeBtn.addEventListener('click', () => {
    // 결과 숨기고 로딩 표시
    resultSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');
    
    // 버튼 비활성화
    analyzeBtn.disabled = true;
    analyzeBtn.style.opacity = '0.7';

    // 로딩 텍스트 애니메이션
    let textIndex = 0;
    const textInterval = setInterval(() => {
        textIndex = (textIndex + 1) % loadingTexts.length;
        loadingText.textContent = loadingTexts[textIndex];
    }, 600);

    // AI 분석 시간을 가정하여 3.5초 대기 (실제로는 여기서 백엔드 API 호출)
    setTimeout(() => {
        clearInterval(textInterval);
        
        // 가상의 종목 중 랜덤으로 1개 선택하여 표시
        const randomStock = mockStocks[Math.floor(Math.random() * mockStocks.length)];
        updateUIWithStock(randomStock);

        // 로딩 숨기고 결과 표시
        loadingSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        
        // 버튼 활성화
        analyzeBtn.disabled = false;
        analyzeBtn.style.opacity = '1';
        analyzeBtn.innerHTML = `<span>다른 종목 분석하기</span> <i class="fas fa-redo"></i>`;
    }, 3500);
});