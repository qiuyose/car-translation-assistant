# 汽车品牌语音翻译助手

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0%2B-lightgrey)](https://flask.palletsprojects.com/)
[![Web Speech API](https://img.shields.io/badge/Web%20Speech-API-green)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

多语言智能语音助手，支持汽车品牌专属指令交互

## ✨ 功能特性

- **多语言界面**
  - 支持英语/俄语实时切换
  - 动态翻译系统
- **品牌专属交互**
  - BYD/ZEEKR双品牌支持
  - 品牌专属语音反馈
- **智能语音识别**
  - 浏览器原生语音识别
  - 指令模糊匹配
- **动态音频系统**
  - MP3音频即时播放
  - 品牌独立音频库
- **科技感UI**
  - 全息投影风格界面
  - 动态光效反馈

## 🛠️ 技术栈

| 模块          | 技术实现                     |
|---------------|----------------------------|
| **前端**      | HTML5 + CSS3 + JavaScript   |
| **后端**      | Python Flask               |
| **语音识别**  | Web Speech API             |
| **音频处理**  | HTML5 Audio                |
| **UI框架**    | Orbitron 科技字体          |

## 🚀 快速开始

### 环境要求
- Python 3.8+
- Chrome/Firefox 最新版

### 安装步骤
1. 克隆仓库
```bash
git clone https://github.com/yourusername/car-translation-assistant.git
cd car-translation-assistant

2.安装依赖
pip install flask flask-cors
3.创建资源目录
mkdir -p static/{audio/byd,audio/zeekr,config,translations}
4.配置示列
{
  "en": {
    "open_the_window": "open_window.mp3",
    "turn_on_music": "play_music.mp3"
  },
  "ru": {
    "открой_окно": "open_window.mp3"
  }
}
5.启动应用
flask run --port 5000

🖥️ 使用指南
访问 http://localhost:5000

语言选择

右上角选择 English/Russian

品牌选择

点击 BYD 或 ZEEKR 按钮

语音交互

点击麦克风图标说指令（如 "open the window"）

系统将播放品牌对应中文指令音频

操作演示

⚙️ 配置扩展
添加新指令
在 commands.json 添加新条目

json
"en": {
  "new_command": "new_audio.mp3"
}
将音频文件放入对应品牌目录

/static/audio/byd/new_audio.mp3
支持新品牌
创建品牌目录

mkdir static/audio/new_brand
在前端添加品牌按钮

html
<button class="brand-btn" data-brand="new_brand">NEW BRAND</button>
