import axios from "axios";
import { useEffect, useState } from "react";

function Weather(props) {
    const [weatherData, setWeatherData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const getWeather = async() => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Naivasha&appid=${weatherApiKey}&units=metric`)
        setWeatherData(response.data);
        setIsLoading(false);
        console.log(response);
    }

    useEffect(() => {
        getWeather();
    },[]);

    if(isLoading) {
        return '...';
    } else {
        return(
            <div className="weather">
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="weather-icon" alt='weather icon'></img>
                <p className="temperature">{Math.round(weatherData.main.temp)}°</p>
                <p className="city">Naivasha</p>           
            </div>
        );
    }
}


export default Weather;
