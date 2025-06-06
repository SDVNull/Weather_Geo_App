import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function CitySelector({ onSelect }) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isProgrammaticChange = useRef(false);
  const timer = useRef(null);

  useEffect(() => {
    if (isProgrammaticChange.current) {
      isProgrammaticChange.current = false;
      return;
    }

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

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(fetchCities, 500);

    return () => {
      clearTimeout(timer.current);
    };
  }, [query]);

  const handleQueryChange = (e) => {
    isProgrammaticChange.current = false;
    setQuery(e.target.value);
  };

  const handleCityClick = (city) => {
    isProgrammaticChange.current = true;
    onSelect({ lat: city.lat, lon: city.lon }, city.display_name.split(",")[0]);
    setQuery(city.display_name);
    setCities([]);
  };

  return (
    <div className="relative mb-8">
      <h1 className="text-2xl md:text-3xl font-extrabold text-blue-500">
        Прогноз погоды
      </h1>
      <label htmlFor="city-search" className="sr-only">
        Поиск города
      </label>
      <input
        id="city-search"
        type="text"
        name="CitySelector"
        className="w-full p-3 rounded-lg border border-gray-300"
        placeholder="Введите город..."
        value={query}
        onChange={handleQueryChange}
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
                onClick={() => handleCityClick(city)}
              >
                {city.display_name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
