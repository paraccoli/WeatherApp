# 天気予報アプリケーション / Weather Forecast Application

[English version below / 英語版は下部にあります]

## 日本語

ご覧いただきありがとうございます。このアプリケーションは、日本の主要都市の天気予報を表示し、世界中の都市の天気情報を検索することができます。

### 実装環境

- Python 3.12.4
- Flask 2.0.1
- Requests 2.26.0

### ファイル構成
```
weather_app/
│
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── translations.js
│
├── main.py
├── README.md
└── .gitignore
```
### 導入方法

1. このリポジトリをクローンします。
```
git clone https://github.com/xM1guel/weather-app.git
cd weather-app
```
2. 必要なパッケージをインストールします。
```
pip install -r backend/requirements.txt
```
3. [OpenWeatherMap](https://home.openweathermap.org/)からAPIキーを取得します。
- APIキーを追加します: `WEATHER_API_KEY=your_api_key_here`

### 起動方法

1. 以下のコマンドを実行します:
```
python main.py
```
2. exeファイル版を使用する場合、`Release`ページから`weather-app.exe`をダウンロードして起動してください。

<img src="https://emojix.s3.ap-northeast-1.amazonaws.com/g3/svg/26a0.svg" width="20" hight="20"> **exeファイルは.envファイルと同じ階層ディレクトリに配置してください。** <img src="https://emojix.s3.ap-northeast-1.amazonaws.com/g3/svg/26a0.svg" width="20" hight="20">

## English

Thank you for your interest in this application. This Weather Forecast Application displays weather forecasts for major Japanese cities and allows users to search for weather information in cities worldwide.

### ENV

- Python 3.12.4
- Flask 2.0.1
- Requests 2.26.0

### File Structure
```
weather_app/
│
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── translations.js
│
├── main.py
├── README.md
└── .gitignore
```

### Installation Guide

1. Clone this repository
```
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```
2. Install the required packages
```
pip install -r backend/requirements.txt
```
3. Set up your [OpenWeatherMap API key](https://home.openweathermap.org/)
- Create a `.env` and add your API key: `WEATHER_API_KEY=your_api_key_here`

### Starting Method

1. Run the following command
```
python main.py
```
2. if you want to use the exe file version, download `weather-app.exe` from the `Release` page and launch it.

<img src="https://emojix.s3.ap-northeast-1.amazonaws.com/g3/svg/26a0.svg" width="20" hight="20"> **Please place the exe file in the same hierarchical directory as the .env file. Please place the exe file in the same hierarchical directory as the .env file. ** <img src="https://emojix.s3.ap-northeast-1.amazonaws.com/g3/svg/26a0.svg" width="20" hight="20">

## **作成者 Developer**

- 作成者: xM1guel
- GitHub: https://github.com/xM1guel
- Zenn: https://zenn.dev/miguel