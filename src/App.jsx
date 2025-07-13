import './App.css'
import Hero from './Hero'
import Body from './Body'
import Footer from './Footer'
import Result from './Result'
import WeatherDetails from './WeatherDetails'


import { useState } from 'react';

import { useEffect } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Function to update weather data
  const handleWeatherSearch = (data) => {
    setWeatherData(data);
    setShowDetails(false); // Always return to main page after new search
  };

  useEffect(() => {
    if (navigator.geolocation) {
      // Ask for permission
      const askLocation = window.confirm(
        "Would you like to allow location access to automatically show weather for your city?"
      );
      if (askLocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const API_KEY = "9bee64019e34675824fe5d73465abce6";
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) throw new Error("Weather API error");
            const data = await response.json();
            // Optionally fetch air quality
            let airQuality = null;
            if (data.coord) {
              const aqRes = await fetch(
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`
              );
              if (aqRes.ok) {
                const aqData = await aqRes.json();
                airQuality =
                  aqData.list && aqData.list[0] ? aqData.list[0] : null;
              }
            }
            setWeatherData({ ...data, airQuality });
          } catch {
            // fail silently, keep as is
          }
        }, () => {
          // User denied or error, keep as is
        });
      }
    }
  }, []);

  return (
    <>
      <Hero onSearch={handleWeatherSearch} />
      {showDetails && weatherData ? (
        <WeatherDetails weatherData={weatherData} onHome={() => setShowDetails(false)} />
      ) : (
        <>
          <Result weatherData={weatherData} onDetails={() => setShowDetails(true)} />
          <Body onSearch={handleWeatherSearch} />
        </>
      )}
      <Footer />
    </>
  )
}

export default App
