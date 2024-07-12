# 天気予報アプリ

このアプリケーションは、ユーザーの位置情報に基づいて天気予報を表示します。

## セットアップ

1. このリポジトリをクローンします。
2. バックエンドのセットアップ:
   - `cd backend`
   - `pip install -r requirements.txt`
   - `.env` ファイルを作成し、`WEATHER_API_KEY=your_api_key_here` を追加します。
3. フロントエンドのセットアップ:
   - 特別なセットアップは必要ありません。

## 起動方法

1. バックエンドの起動:
   - `cd backend`
   - `python app.py`
2. フロントエンドの起動:
   - `cd frontend`
   - `python -m http.server 8000`（または他の適切なローカルサーバー）
3. ブラウザで `http://localhost:8000` にアクセスします。

注意: 実際の運用環境では、適切なウェブサーバーを使用してください。