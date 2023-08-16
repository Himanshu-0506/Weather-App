import "./index.css";
import { useState } from "react";
import { Waveform } from '@uiball/loaders'

function App() {
  const [data, setData] = useState(null);
  const [inputCity, setinputCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");


  const handleChangeInput = (e) => {
    setinputCity(e.target.value);
  };

  const api = "e7ba6d0efbedb88405103d95f0c9166a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric`;

  const weatherdetails = async () => {
    setIsLoading(true);
    const response = await fetch(url + `&appid=${api}`);
    const resJson = await response.json();
    
    if (response.ok) {
      setData(resJson);
      setError(""); 
      document.querySelector(".weather-container").style.display = "block";
      document.querySelector(".error").style.display = "none";
      setBackgroundImage(getBackgroundImage(resJson.weather[0].main));

    } else {
      setData(null);
      setError("Invalid city name"); 
      document.querySelector(".weather-container").style.display = "none";
      document.querySelector(".error").style.display = "block";
      setBackgroundImage("");
    }

    setIsLoading(false); 
  };
  
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      weatherdetails();
    }
  };

  const getBackgroundImage = (weatherMain) => {
    switch (weatherMain) {
      case "Clouds":
        return "./images/cloudy.jpeg";
      case "Clear":
        return "./images/clear.jpeg";
      case "Rain":
        return "./images/Rain.png";
      case "Mist":
        return "./images/mist.jpeg";
      case "Snow":
        return "./images/snow.jpeg";
      default:
        return "";
    }
  };

  // console.log(getBackgroundImage);

  return (
    <div className={`App ${backgroundImage}`}>
      <div className="search">
        <input
          type="text"
          placeholder="Enter City Name"
          id="myInput"
          onChange={handleChangeInput}
          onKeyUp={handleKeyUp}/>
        <button id="myBtn" onClick={weatherdetails} disabled={isLoading}>
          Search
        </button>
        

        {isLoading && <Waveform size={25} color="white"/>}
      </div>
      <div className="error">
      {error && <p className="error-message">{error}</p>}
      </div>
      <div className="weather-container">
        <div className="top">
          <div className="location">
            <p>{data?.name}</p>
          </div>

          <div className="temperature">
            {data===null ? "" :  <h1>{(data.main.temp).toFixed(0)}°C</h1>}
          </div>
        </div>

        <div className="bottom">

          <div className="feelsLike">
            <p>{data===null ? "" :data.main.feels_like}</p>
            <p>Feels Like</p>
          </div>

          <div className="humidity">
            <p>{data===null ? "" :data.main.humidity}%</p>
            <p>Humidity</p>
          </div>

          <div className="windSpeed">
            <p>{data===null ? "" : data.wind.speed} Km/H</p>
            <p>Wind Speed</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
