import { useState, useEffect } from "react";
import axios from "axios";
import CitySelector from "./components/CitySelector";
import WeatherDisplay from "./components/WeatherDisplay";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (coords) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}
				&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min
				&timezone=auto&forecast_days=5`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("Ошибка загрузки данных: " + err.message);
    } finally {
      setLoading(false);
    }
  };

	useEffect(() => {
    const moscowCoords = { lat: 55.7558, lon: 37.6173 };
    fetchWeather(moscowCoords);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {<CitySelector onSelect={fetchWeather} />}
        {loading && <p className="text-center">Загрузка...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {weatherData && <WeatherDisplay weatherData={weatherData} />}
      </div>
    </div>
  );
}
