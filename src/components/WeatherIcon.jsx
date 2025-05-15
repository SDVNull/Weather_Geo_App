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
    0: { icon: WiDaySunny, description: 'Ясно' },
    1: { icon: WiDayCloudy, description: 'Преимущественно ясно' },
    2: { icon: WiDayCloudy, description: 'Переменная облачность' },
    3: { icon: WiCloudy, description: 'Пасмурно' },
    45: { icon: WiFog, description: 'Туман' },
    48: { icon: WiFog, description: 'Инейный туман' },
    51: { icon: WiRain, description: 'Легкая морось' },
    53: { icon: WiRain, description: 'Умеренная морось' },
    55: { icon: WiRain, description: 'Сильная морось' },
    56: { icon: WiRain, description: 'Ледяная морось' },
    57: { icon: WiRain, description: 'Сильная ледяная морось' },
    61: { icon: WiRain, description: 'Небольшой дождь' },
    63: { icon: WiRain, description: 'Умеренный дождь' },
    65: { icon: WiRain, description: 'Сильный дождь' },
    66: { icon: WiRain, description: 'Ледяной дождь' },
    67: { icon: WiRain, description: 'Сильный ледяной дождь' },
    71: { icon: WiSnow, description: 'Небольшой снег' },
    73: { icon: WiSnow, description: 'Умеренный снег' },
    75: { icon: WiSnow, description: 'Сильный снег' },
    77: { icon: WiSnow, description: 'Снежные зерна' },
    80: { icon: WiRain, description: 'Ливень' },
    81: { icon: WiRain, description: 'Сильный ливень' },
    82: { icon: WiRain, description: 'Очень сильный ливень' },
    85: { icon: WiSnow, description: 'Снегопад' },
    86: { icon: WiSnow, description: 'Сильный снегопад' },
    95: { icon: WiThunderstorm, description: 'Гроза' },
    96: { icon: WiThunderstorm, description: 'Гроза с градом' },
    99: { icon: WiThunderstorm, description: 'Сильная гроза с градом' },
  };

	const getWeatherDescription = (code) => {
    return iconMap[code] && iconMap[code].description;
  };

  const { icon: Icon } = iconMap[code] || { icon: WiDaySunny };
	return (
    <div>
      <Icon className="text-4xl mx-auto" />
      {getWeatherDescription(code)}
    </div>
  );
}
