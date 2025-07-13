import React, { useEffect, useState } from "react";
import "./WeatherDetails.css";
import Forecast from "./Forecast";

function WeatherDetails({ weatherData, onHome }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!weatherData) return;
    const fetchForecast = async () => {
      setLoading(true);
      const API_KEY = "9bee64019e34675824fe5d73465abce6";
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            weatherData.name
          )}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error("Forecast API error");
        const data = await response.json();
        setForecastData(data);
      } catch {
        setForecastData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [weatherData]);

  if (!weatherData) return null;
  return (
    <div className="canvas">
      <button
        className="home-btn"
        onClick={onHome}
        title="Back to Home"
        style={{ position: "absolute", top: 450, left: 25 }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#900c0c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div
        style={{
          width: "100%",
          maxWidth: "70%",
          margin: "auto",
          paddingBottom: "40px",
        }}
      >
        <div className="details-box" style={{ paddingTop: 48 }}>
          <h1>
            {weatherData.name}, {weatherData.sys && weatherData.sys.country}
          </h1>
          <div className="flex-row"> Impression &nbsp; &nbsp; : &nbsp; &nbsp; <b>{weatherData.weather && weatherData.weather[0].description}</b></div>
          <div>
            <div className="flex-row">
              Temperature &nbsp; &nbsp;: &nbsp; &nbsp; <b>{Math.round(weatherData.main.temp)}°C</b>
            </div>
            <div className="flex-row">
              Feels Like &nbsp;&nbsp; : &nbsp;&nbsp;  <b>{Math.round(weatherData.main.feels_like)}°C</b>
            </div>
            <div className="flex-row">
              Humidity &nbsp; &nbsp;: &nbsp;&nbsp; <b>{weatherData.main.humidity}%</b>
            </div>
            <div className="flex-row">
              Pressure &nbsp;&nbsp; : &nbsp;&nbsp; <b>{weatherData.main.pressure} hPa</b>
            </div>
            <div className="flex-row">
              Wind  &nbsp; &nbsp;: &nbsp;&nbsp; <b>{weatherData.wind.speed} km/h</b> ({weatherData.wind.deg}
              °)
            </div>
            <div className="flex-row">
              Visibility &nbsp; &nbsp;: &nbsp;&nbsp; <b>{weatherData.visibility / 1000} km</b>
            </div>
            {weatherData.airQuality && (
              <div className="flex-row">
                Air Quality &nbsp;&nbsp; : &nbsp;&nbsp; {" "}
                <b>
                  {(() => {
                    switch (weatherData.airQuality.main.aqi) {
                      case 1:
                        return "Good";
                      case 2:
                        return "Fair";
                      case 3:
                        return "Moderate";
                      case 4:
                        return "Poor";
                      case 5:
                        return "Very Poor";
                      default:
                        return "--";
                    }
                  })()}
                </b>
              </div>
            )}
          </div>
          {loading ? (
            <div style={{ textAlign: "center", marginTop: 18 }}>
              Loading forecast...
            </div>
          ) : (
            <Forecast forecastData={forecastData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
