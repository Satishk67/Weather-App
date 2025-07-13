# ☀️ SkySense Weather App

SkySense is a modern, real-time weather application built with React and Vite. It provides users with instant weather updates, air quality information, and both hourly and 5-day forecasts for any city worldwide.

## Features
- **Current Weather:** Real-time temperature, humidity, wind, pressure, visibility, and weather impression.
- **Air Quality Index:** Displays AQI with easy-to-understand labels.
- **Hourly & 5-Day Forecast:** View upcoming weather trends in a clean, accessible layout.
- **Quick Search & Suggestions:** Fast city search with quick-access buttons.
- **Persistent Search Bar:** Always-visible search for seamless navigation.
- **Accessible UI:** Keyboard navigation, clear icons, and responsive design.
- **Notifications:** Elegant pop-ups for invalid input and errors.

## Getting Started
1. **Clone the repository:**
   ```bash
   git clone <this-repo-url>
   cd weather-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Tech Stack
- **Frontend:** React 19, Vite
- **APIs:** OpenWeatherMap (weather & forecast), Unsplash (backgrounds)
- **REST API:** Consumes RESTful endpoints for weather, air quality, and forecast data
- **Styling:** CSS Modules

## About React Usage
SkySense is built using [React](https://react.dev/), a powerful JavaScript library for building user interfaces. The app leverages React's component-based architecture to create reusable UI elements such as search bars, weather cards, notifications, and forecast displays. State management is handled with React hooks, enabling real-time updates and smooth navigation between views. All UI logic, data fetching, and interactivity are managed through React components for a seamless user experience.

REST APIs (such as OpenWeatherMap for weather and air quality) are called directly from React components using the fetch method, ensuring the UI stays synchronized with live data from external services.

## Configuration
- Update your OpenWeatherMap API key in the source files for full functionality.
- For production, move API keys to environment variables for security.

## Credits
- Weather data by [OpenWeatherMap](https://openweathermap.org/)
- Background images by [Unsplash](https://unsplash.com/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)

---

© 2025 SkySense Weather App. All rights reserved.
