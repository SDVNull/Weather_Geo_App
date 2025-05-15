import { useState, useEffect } from "react";
import axios from "axios";
import WeatherIcon from "./components/WeatherIcon";

const CitySelector = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`,
          {
            headers: { "Accept-Language": "ru" },
          }
        );
        setCities(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Ошибка поиска:", error);
          setCities([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchCities, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <div className="relative mb-8">
      <h1 className="text-3xl font-bold text-blue-500">Прогноз погоды</h1>
      <input
        type="text"
        className="w-full p-3 rounded-lg border border-gray-300"
        placeholder="Введите город..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {(isLoading || cities.length > 0) && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-b-lg mt-1">
          {isLoading ? (
            <div className="p-3 text-gray-500">Поиск...</div>
          ) : (
            cities.map((city) => (
              <div
                key={`${city.lat}-${city.lon}`}
                className="p-3 hover:bg-gray-100 cursor-pointer border-t"
                onClick={() => {
                  onSelect({ lat: city.lat, lon: city.lon });
                  setQuery(city.display_name);
                  setCities([]);
                }}
              >
                {city.display_name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const WeatherDisplay = ({ weatherData }) => {
  const [activeTab, setActiveTab] = useState("current");

  if (!weatherData) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "current" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("current")}
        >
          Сейчас
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "forecast" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("forecast")}
        >
          5 дней
        </button>
      </div>

      {activeTab === "current" ? (
        <div>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">
              {weatherData.current.temperature_2m}°C
            </h2>
            <WeatherIcon code={weatherData.current.weather_code} />
            <p className="text-gray-600">
              Ветер: {weatherData.current.wind_speed_10m} м/с
            </p>
            <p className="text-gray-600">
              Влажность: {weatherData.current.relative_humidity_2m}%
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {weatherData.daily.time.map((date, index) => (
            <div key={date} className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-medium mb-2">
                {new Date(date).toLocaleDateString("ru-RU", {
                  weekday: "short",
                })}
              </p>
              <WeatherIcon code={weatherData.daily.weather_code[index]} />
              <div className="mt-2">
                <span className="text-red-500">
                  {weatherData.daily.temperature_2m_max[index]}°
                </span>
                <span className="mx-2">/</span>
                <span className="text-blue-500">
                  {weatherData.daily.temperature_2m_min[index]}°
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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

