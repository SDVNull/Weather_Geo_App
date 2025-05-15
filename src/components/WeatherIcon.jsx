import React from "react";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiDayCloudy,
  WiFog,
} from "react-icons/wi";

export default function WeatherIcon({ code }) {
  const iconMap = {
    0: WiDaySunny, // Ясно
    1: WiDayCloudy, // Преимущественно ясно
    2: WiDayCloudy, // Переменная облачность
    3: WiCloudy, // Пасмурно
    45: WiFog, // Туман
    48: WiFog, // Инейный туман
    51: WiRain, // Легкая морось
    53: WiRain, // Умеренная морось
    55: WiRain, // Сильная морось
    56: WiRain, // Ледяная морось
    57: WiRain, // Сильная ледяная морось
    61: WiRain, // Небольшой дождь
    63: WiRain, // Умеренный дождь
    65: WiRain, // Сильный дождь
    66: WiRain, // Ледяной дождь
    67: WiRain, // Сильный ледяной дождь
    71: WiSnow, // Небольшой снег
    73: WiSnow, // Умеренный снег
    75: WiSnow, // Сильный снег
    77: WiSnow, // Снежные зерна
    80: WiRain, // Ливень
    81: WiRain, // Сильный ливень
    82: WiRain, // Очень сильный ливень
    85: WiSnow, // Снегопад
    86: WiSnow, // Сильный снегопад
    95: WiThunderstorm, // Гроза
    96: WiThunderstorm, // Гроза с градом
    99: WiThunderstorm, // Сильная гроза с градом
  };

  const Icon = iconMap[code] || WiDaySunny;
  return <Icon className="text-4xl" />;
};