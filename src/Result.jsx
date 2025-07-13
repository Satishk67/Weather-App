import "./result.css";

// const API_KEY = "9bee64019e34675824fe5d73465abce6";

import { useEffect, useRef, useState } from 'react';

function Result({ weatherData, onDetails }) {
  const getTime = () => {
    if (!weatherData) return '--';
    const date = new Date((weatherData.dt || 0) * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getLocation = () => {
    if (!weatherData) return '--';
    return `${weatherData.name || '--'}, ${(weatherData.sys && weatherData.sys.country) || '--'}`;
  };
  const getTemp = () => weatherData && weatherData.main ? Math.round(weatherData.main.temp) : '--';
  const getRealFeel = () => weatherData && weatherData.main ? Math.round(weatherData.main.feels_like) : '--';
  const getWind = () => weatherData && weatherData.wind ? `${weatherData.wind.speed} km/h` : '--';
  const getWindDir = () => {
    if (!weatherData || !weatherData.wind || typeof weatherData.wind.deg !== 'number') return '';
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(weatherData.wind.deg / 45) % 8];
  };
  const getWindGust = () => weatherData && weatherData.wind && weatherData.wind.gust ? `${weatherData.wind.gust} km/h` : '--';
  const getAirQuality = () => {
    if (!weatherData || !weatherData.airQuality) return '--';
    const aqi = weatherData.airQuality.main.aqi;
    switch (aqi) {
      case 1: return 'Good';
      case 2: return 'Fair';
      case 3: return 'Moderate';
      case 4: return 'Poor';
      case 5: return 'Very Poor';
      default: return '--';
    }
  };
  const cardRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (weatherData) {
      setAnimate(false); // Reset first to ensure only one animation
      const raf = requestAnimationFrame(() => {
        setAnimate(true);
        const timeout = setTimeout(() => setAnimate(false), 600);
        return () => {
          clearTimeout(timeout);
          cancelAnimationFrame(raf);
        };
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [weatherData]);

  return (
    <>
      <div
        ref={cardRef}
        className={`weather-card${animate ? ' weather-card-animate' : ''}`}
        role="button"
        tabIndex={0}
        style={{ cursor: weatherData ? 'pointer' : 'default' }}
        onClick={() => weatherData && onDetails && onDetails()}
        onKeyDown={e => {
          if (weatherData && onDetails && (e.key === 'Enter' || e.key === ' ')) onDetails();
        }}
        aria-label="Show weather details"
      >
        <ul className="header">
          <li>{getLocation()}</li>
          <li>{getTime()}</li>
        </ul>
        <div className="weather-main">
          <div className="temp-section">
            <div className="weather-icon">🌤️</div>
            <div className="temp">
              <span className="temp-value">{getTemp()}°</span>
              <span className="temp-unit">C</span>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail">
              <span>
                RealFeel Shade
              </span>
              <span>{getRealFeel()}°</span>
            </div>
            <div className="detail">
              <span>Wind</span>
              <span>
                {getWindDir()} {getWind()}
              </span>
            </div>
            <div className="detail">
              <span>Wind Gusts</span>
              <span>{getWindGust()}</span>
            </div>
            <div className="detail">
              <span>Air Quality</span>
              <span
                className={
                  `air-quality-value ${(() => {
                    switch(getAirQuality()) {
                      case 'Good': return 'aqi-good';
                      case 'Fair': return 'aqi-fair';
                      case 'Moderate': return 'aqi-moderate';
                      case 'Poor': return 'aqi-poor';
                      case 'Very Poor': return 'aqi-very-poor';
                      default: return '';
                    }
                  })()}`
                }
                style={{fontWeight: 'bold'}}
              >
                {getAirQuality()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Result;
