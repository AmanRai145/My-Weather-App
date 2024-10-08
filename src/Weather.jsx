// src/components/Weather.jsx
import React, { useState, useEffect } from "react";
import axios from "axios"; 

const Weather = () => {
  const [city, setCity] = useState(""); 
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "4ba8582439707f24ad88d674388dea37";

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
          );
          setWeatherData(response.data);
          setError("");
        } catch (err) {
          setError("City not found or error fetching data");
          setWeatherData(null);
        }
      };

      fetchWeather();
    }
  }, [city]); // useEffect will run whenever the city changes

  return (
    <div className=" align-center mt-[50px] bg-[blue]" >
      <h1 className=" bg-red">Weather in Your City</h1>
      <input
        type="text"
        className="inpute bg-white rounded"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      {error && <p className="color-red-500">{error}</p>}

      {weatherData && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
