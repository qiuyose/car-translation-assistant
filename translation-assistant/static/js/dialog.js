// ============== dialog.js 完整修复版 ==============
document.addEventListener('DOMContentLoaded', () => {
    // 基础配置
    const langMetadata = document.getElementById('langMetadata');
    const currentLang = langMetadata ? langMetadata.dataset.lang : 'en';
    const brand = document.getElementById('brand').dataset.brand;
    const voiceButton = document.getElementById('voiceButton');
    
    // 初始化语音识别
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = currentLang === 'ru' ? 'ru-RU' : 'en-US';
    recognition.interimResults = false;

    // 核心数据加载
    Promise.all([
        fetch(`/get_translations/${currentLang}`).then(r => r.json()),
        fetch('/get_commands').then(r => r.json()) // [!code focus]
    ]).then(([translations, commands]) => {
        console.log("配置加载完成:", { translations, commands });

        // 设置界面翻译
        voiceButton.querySelector('.btn-label').textContent = translations['click_to_speak'];

        // 初始化命令映射
        const commandMap = commands[currentLang] || {};
        console.log("有效命令表:", commandMap);

// 绑定按钮事件（必须放在此处） // [!code focus]
voiceButton.addEventListener('click', () => {
    console.log("启动语音识别");
    recognition.start();

        
        // 语音识别处理
        recognition.onresult = (event) => {
            const rawCommand = event.results[0][0].transcript
            .toLowerCase()    // 全小写
            .replace(/\s+/g, '_') // 空格转下划线 [!code focus]
            .replace(/[^a-z_]/g, ""); // 移除特殊字符 [!code focus]
        
        console.log("标准化指令:", rawCommand);
            
            const audioFile = commandMap[rawCommand];
            if (audioFile) {
                const audioPath = `/static/audio/${brand}/${audioFile}`;
                console.log("播放路径:", audioPath);
                new Audio(audioPath).play()
                    .catch(e => console.error("播放失败:", e));
            } else {
                console.warn("未匹配指令:", rawCommand);
            }
        };

        
        });

    }).catch(error => {
        console.error("初始化失败:", error);
        alert("系统初始化失败，请查看控制台");
    });

    // 错误处理
    recognition.onerror = (event) => {
        console.error("识别错误:", event.error);
        if (event.error === 'audio-capture') {
            alert("无法访问麦克风，请检查权限设置！");
        }
    };
});


// 添加事件监听调试
recognition.onstart = () => {
    console.log("[状态] 开始接收语音输入");
    document.querySelector(".command-display").textContent = "LISTENING...";
};

recognition.onresult = (event) => {
    console.log("[状态] 收到识别结果", event.results);
};

recognition.onerror = (event) => {
    console.error("[错误] 识别错误:", event.error);
};

recognition.onend = () => {
    console.log("[状态] 识别结束");
};


