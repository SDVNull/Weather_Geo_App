import React from 'react';
import { useState } from 'react';
import WeatherIcon from './WeatherIcon';

export default function WeatherDisplay ({ weatherData, locationName }) {
  const [activeTab, setActiveTab] = useState("current");

  if (!weatherData) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
			<h2 className="text-xl font-semibold mb-4 text-center">{locationName}</h2>
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
          <div className="text-center mb-6 flex flex-col items-center">
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
            <div
              key={date}
              className="p-4 bg-gray-50 rounded-lg text-center mb-6 flex flex-col justify-center h-full"
            >
              <p>
                {new Date(date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
              <p className="font-medium mb-2">
                {new Date(date).toLocaleDateString("ru-RU", {
                  weekday: "long",
                })}
              </p>
              <WeatherIcon code={weatherData.daily.weather_code[index]} />
              <div className="mt-auto">
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