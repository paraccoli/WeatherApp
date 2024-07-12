from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='../frontend')
CORS(app)

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather"
FORECAST_API_URL = "http://api.openweathermap.org/data/2.5/forecast"

JAPAN_CITIES = {
    "東京": {"lat": 35.6895, "lon": 139.6917},
    "大阪": {"lat": 34.6937, "lon": 135.5023},
    "名古屋": {"lat": 35.1815, "lon": 136.9066},
    "札幌": {"lat": 43.0618, "lon": 141.3545},
    "福岡": {"lat": 33.5902, "lon": 130.4017},
}

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/weather')
def get_weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    lang = request.args.get('lang', 'en')
    
    params = {
        'lat': lat,
        'lon': lon,
        'appid': WEATHER_API_KEY,
        'units': 'metric',
        'lang': lang
    }
    
    response = requests.get(WEATHER_API_URL, params=params)
    data = response.json()
    
    if response.status_code == 200:
        weather = {
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
            'city': data['name']
        }
        return jsonify(weather)
    else:
        return jsonify({'error': 'Failed to fetch weather data'}), 400

@app.route('/japan-weather')
def get_japan_weather():
    lang = request.args.get('lang', 'en')
    weather_data = {}
    for city, coords in JAPAN_CITIES.items():
        params = {
            'lat': coords['lat'],
            'lon': coords['lon'],
            'appid': WEATHER_API_KEY,
            'units': 'metric',
            'lang': lang
        }
        response = requests.get(WEATHER_API_URL, params=params)
        data = response.json()
        if response.status_code == 200:
            weather_data[city] = {
                'temperature': data['main']['temp'],
                'description': data['weather'][0]['description'],
                'icon': data['weather'][0]['icon']
            }
        else:
            weather_data[city] = {'error': 'Failed to fetch weather data'}
    return jsonify(weather_data)

@app.route('/search')
def search_weather():
    city = request.args.get('city')
    lang = request.args.get('lang', 'en')
    
    params = {
        'q': city,
        'appid': WEATHER_API_KEY,
        'units': 'metric',
        'lang': lang
    }
    
    response = requests.get(WEATHER_API_URL, params=params)
    data = response.json()
    
    if response.status_code == 200:
        weather = {
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
            'city': data['name']
        }
        return jsonify(weather)
    else:
        return jsonify({'error': 'City not found'}), 404

@app.route('/forecast')
def get_forecast():
    city = request.args.get('city')
    lang = request.args.get('lang', 'en')
    
    params = {
        'q': city,
        'appid': WEATHER_API_KEY,
        'units': 'metric',
        'lang': lang
    }
    
    response = requests.get(FORECAST_API_URL, params=params)
    data = response.json()
    
    if response.status_code == 200:
        forecast = [
            {
                'date': item['dt_txt'],
                'temperature': item['main']['temp'],
                'description': item['weather'][0]['description'],
                'icon': item['weather'][0]['icon']
            } for item in data['list']
        ]
        return jsonify(forecast)
    else:
        return jsonify({'error': 'Failed to fetch forecast data'}), 400

if __name__ == '__main__':
    app.run(debug=True)