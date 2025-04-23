from flask import Flask, render_template, jsonify, request
import os
import json

app = Flask(__name__)

# 加载翻译文件
def load_translations(lang):
    with open(f'translations/{lang}.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_translations/<lang>')
def get_translations(lang):
    translations = load_translations(lang)
    return jsonify(translations)

@app.route('/dialog')
def dialog():
    brand = request.args.get('brand', 'byd')
    lang = request.args.get('lang', 'en')  # 默认为英文
    return render_template('dialog.html', brand=brand, lang=lang)
# 新增配置路由
# 确保存在此路由
@app.route('/get_commands')
def get_commands():
    try:
        with open('static/config/commands.json', 'r', encoding='utf-8') as f:
            return jsonify(json.load(f))
    except FileNotFoundError:
        return jsonify({"error": "commands.json not found"}), 404

if __name__ == '__main__':
    host = '141.158.10.2'
    port = 5000
    app.run(host=host, port=port, debug=True)