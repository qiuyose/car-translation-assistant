// 初始化语言
let currentLang = 'en';

// 切换语言功能
document.getElementById('languageSelect').addEventListener('change', (e) => {
    currentLang = e.target.value;
    fetch(`/get_translations/${currentLang}`)
        .then(response => response.json())
        .then(translations => {
            // 更新所有带data-translate属性的元素
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                el.textContent = translations[key];
            });
        });
});
// 品牌选择逻辑
document.querySelectorAll('.brand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const brand = e.target.dataset.brand;
        window.location.href = `/dialog?brand=${brand}`;
    });
    document.querySelectorAll('.brand-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const brand = e.target.dataset.brand;
            // 获取当前选择的语言
            const lang = document.getElementById('languageSelect').value;
            window.location.href = `/dialog?brand=${brand}&lang=${lang}`;
        });
    });
});