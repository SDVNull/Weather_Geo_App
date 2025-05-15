import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function CitySelector  ({ onSelect }) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isProgrammaticChange = useRef(false);

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

    const timer = setTimeout(fetchCities, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <div className="relative mb-8">
      <h1 className="text-3xl md:text-3xl font-extrabold text-blue-500">
        Прогноз погоды
      </h1>
      <input
        type="text"
        name="CitySelector"
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
                  isProgrammaticChange.current = true;
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
}