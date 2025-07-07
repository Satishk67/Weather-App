import "./result.css";

// const API_KEY = "9bee64019e34675824fe5d73465abce6";

function Result() {
  return (
    <>
      <div class="weather-card">
        <ul class="header">
          <li>KOLKATA, INDIA</li>
          <li>12:30 p.m.</li>
        </ul>
        <div class="weather-main">
          <div class="temp-section">
            <div class="weather-icon">🌤️</div>
            <div class="temp">
              <span class="temp-value">34°</span>
              <span class="temp-unit">C</span>
            </div>
          </div>

          <div class="weather-details">
            <div class="detail">
              <span>
                RealFeel Shade
              </span>
              <span>38°</span>
            </div>
            <div class="detail">
              <span>Wind</span>
              <span>
                SE 14 km/h
              </span>
            </div>
            <div class="detail">
              <span>Wind Gusts</span>
              <span>30 km/h</span>
            </div>
            <div class="detail">
              <span>Air Quality</span>
              <span class="poor">Poor</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Result;
