import React from 'react';
import './Forecast.css';

function Forecast({ forecastData }) {
  if (!forecastData || !forecastData.list) return null;

  // --- Hourly forecast: next 8 periods (24 hours) ---
  const next8 = forecastData.list.slice(0, 8);

  // --- Daily forecast: group by date, pick value closest to 12:00 for each day ---
  const groups = {};
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split('T')[0];
    if (!groups[dayKey]) groups[dayKey] = [];
    groups[dayKey].push(item);
  });
  const dailyForecasts = Object.keys(groups).slice(0, 5).map(day => {
    const midday = groups[day].reduce((prev, curr) => {
      const prevHour = Math.abs(new Date(prev.dt * 1000).getHours() - 12);
      const currHour = Math.abs(new Date(curr.dt * 1000).getHours() - 12);
      return currHour < prevHour ? curr : prev;
    });
    return midday;
  });

  return (
    <>
      <div className="forecast-section">
        <h3>Hourly Forecast (Next 24 Hours)</h3>
        <div className="forecast-list">
          {next8.map(item => (
            <div className="forecast-item" key={item.dt}>
              <div className="forecast-time">
                {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="forecast-icon">
                <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} width={36} height={36} />
              </div>
              <div className="forecast-temp">{Math.round(item.main.temp)}°C</div>
              <div className="forecast-desc">{item.weather[0].main}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="forecast-section">
        <h3>5-Day Forecast</h3>
        <div className="forecast-list">
          {dailyForecasts.map(item => (
            <div className="forecast-item" key={item.dt}>
              <div className="forecast-time">
                {new Date(item.dt * 1000).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
              <div className="forecast-icon">
                <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} width={36} height={36} />
              </div>
              <div className="forecast-temp">{Math.round(item.main.temp)}°C</div>
              <div className="forecast-desc">{item.weather[0].main}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Forecast;
