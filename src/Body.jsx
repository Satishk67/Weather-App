import './Body.css'

function Body({onSearch}){
    const display_result = async (event) => {
        // Ripple animation
        const button = event.currentTarget;
        const circle = document.createElement('span');
        circle.className = 'ripple';
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - diameter/2}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - diameter/2}px`;
        button.appendChild(circle);
        setTimeout(() => circle.remove(), 500);

        const city = event.target.id;
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
          alert("Failed to fetch weather data");
        }
    }

    return(
        <>
        <h1 className='heading'>Quick Search</h1>
        <ul className="flexbox">
            <ul className="gridbox">
                <li><button className='states-btn' id='Gaya,Bihar' onClick={display_result}>Gaya,Bihar </button></li>
                <li><button className='states-btn' id='Kolkata,WestBengal' onClick={display_result}>Kolkata,West Bengal </button></li>
                <li><button className='states-btn' id='Ranchi,Jharkhand' onClick={display_result}>Ranchi,Jharkhand </button></li>
                <li><button className='states-btn' id='Lucknow,UttarPradesh' onClick={display_result}>Lucknow,Uttar Pradesh </button></li>
            </ul>
            <ul className="gridbox">
                <li><button className='states-btn' id='Delhi' onClick={display_result}>Delhi </button></li>
                <li><button className='states-btn' id='Chennai,TamilNadu' onClick={display_result}>Chennai,Tamil Nadu </button></li>
                <li><button className='states-btn' id='Surat,Gujarat' onClick={display_result}>Surat,Gujarat </button></li>
                <li><button className='states-btn' id='Dubai,UnitedArabEmirates' onClick={display_result}>Dubai,United Arab Emirates </button></li>
            </ul>
            <ul className="gridbox">
                <li><button className='states-btn' id='Mumbai,Maharashtra' onClick={display_result}>Mumbai,Maharashtra </button></li>
                <li><button className='states-btn' id='Bengaluru,Karnataka' onClick={display_result}>Bengaluru,Karnataka </button></li>
                <li><button className='states-btn' id='Hyderabad,AndhraPradesh' onClick={display_result}>Hyderabad,Andhra Pradesh </button></li>
                <li><button className='states-btn' id='Visakhapatnam,AndhraPradesh' onClick={display_result}>Visakhapatnam,Andhra Pradesh </button></li>
            </ul>
            <ul className="gridbox">
            <li><button className='states-btn' id='Varanasi,UttarPradesh' onClick={display_result}>Varanasi,Uttar Pradesh </button></li>
                <li><button className='states-btn' id='Paris,France' onClick={display_result}>Paris,France </button></li>
                <li><button className='states-btn' id='Tokyo,Japan' onClick={display_result}>Tokyo,Japan </button></li>
                <li><button className='states-btn' id='Bangkok,Thailand' onClick={display_result}>Bangkok,Thailand </button></li>
            </ul>
        </ul>
        </>
    )
}
export default Body;