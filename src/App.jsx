import { useState, useEffect } from "react";
import axios from "axios";
import CitySelector from "./components/CitySelector";
import WeatherDisplay from "./components/WeatherDisplay";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState("Москва");

  const fetchWeather = async (coords, name) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}
				&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min
				&timezone=auto&forecast_days=5`
      );
      setWeatherData(response.data);
      setLocationName(name);
      setError(null);
    } catch (err) {
      setError("Ошибка загрузки данных: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const moscowCoords = { lat: 55.7558, lon: 37.6173 };
    fetchWeather(moscowCoords, "Москва");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <main className="max-w-3xl mx-auto">
        <CitySelector onSelect={(coords, name) => fetchWeather(coords, name)} />
        <div className="relative h-4 mb-4 transition-all">
          {loading && (
            <p className="absolute inset-0 text-center animate-pulse">
              Загрузка...
            </p>
          )}
        </div>
        {error && <p className="text-center text-red-500">{error}</p>}
        {weatherData && (
          <WeatherDisplay
            weatherData={weatherData}
            locationName={locationName}
          />
        )}
      </main>
      <footer className="max-w-3xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Данные о погоде предоставлены Open-Meteo</p>
      </footer>
    </div>
  );
}
