import "./Hero.css";
import React, { useEffect, useState } from "react";
import Notification from "./Notification";

function Hero({ onSearch }) {
  const [notif, setNotif] = useState({ show: false, message: "" });
  const clearinput = () => {
    const input = document.getElementById("input");
    input.value = "";
  };

  const [bgImage, setBgImage] = useState();

  const setRandomBg = async () => {
    const accessKey = "n82t9SAXe6qB74qPaM2ITtpV3-lwlxHV5H4VYZSv4lA";

    const keywords = [
      "nature",
      "sunset",
      "mountains",
      "river",
      "forest",
      "sky",
      "rain",
      "lightning",
      "snow",
      "clouds",
      "waterfall",
    ];
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${randomKeyword}&orientation=landscape&client_id=${accessKey}`
      );

      if (!response.ok) {
        throw new Error("Unsplash API request failed");
      }

      const data = await response.json();
      console.log("Unsplash Image URL:", data.urls.full);
      setBgImage(data.urls.full);
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
      setBgImage("");
    }
  };

  const enterornot = (event) => {
    if (event.key === "Enter") {
      display_result();
    }
  };

  const display_result = async () => {
    const input = document.getElementById("input");
    const city = input.value.trim();
    if (!city) return;
    const API_KEY = "9bee64019e34675824fe5d73465abce6";
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
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
      onSearch({ ...data, airQuality });
    } catch {
      setNotif({ show: true, message: "Please enter a valid city name." });
      setTimeout(() => setNotif({ show: false, message: "" }), 2500);
    }
  };

  useEffect(() => {
    setRandomBg();
  }, []);

  return (
    <div className="box" style={{ backgroundImage: `url("${bgImage}")` }}>
      <Notification message={notif.message} show={notif.show} />
      <div className="content">
        <h1 className="title">☀️SkySense</h1>
        <div className="search">
          <div className="search-box">
            <div>
              <input
                type="text"
                id="input"
                className="inp-box"
                placeholder="Enter your city"
                onKeyDown={enterornot}
              />
            </div>
            <div className="action-btn-box">
              <button className="clear btn" onClick={clearinput}>
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M19 5L4.99998 19M5.00001 5L19 19"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
              <button
                className="search btn"
                onClick={display_result}
              >
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
