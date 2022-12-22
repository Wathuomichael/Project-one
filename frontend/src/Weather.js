import axios from "axios";
import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import { FiEdit2 } from 'react-icons/fi';

function Weather(props) {
    const [weatherData, setWeatherData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState('Nairobi')
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const getWeather = async() => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`)
        setWeatherData(response.data);
        setIsLoading(false);
        console.log(response);
    }

    useEffect(() => {
        getWeather();
    },[]);

    if(isLoading) {
        return '';
    } else {
        return(
            <div className="weather">
                <Popup trigger={<button className="weather-popup-button">...</button>} position='bottom right'>
                    <div className="weather-popup">
                        <div className="city-popup">
                            <p className="popup-city-name">{city}</p>
                            <button className="edit-city-button"><FiEdit2 /></button>
                        </div>
                        <div className="popup-weather-data">
                            <div className="primary-weather-data">
                                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="weather-popup-icon" alt='weather icon'></img>
                                <p className="popup-temperature">{Math.round(weatherData.main.temp)}°</p>
                            </div>
                            <div className="secondary-weather-data">
                                <p>Feels like {Math.round(weatherData.main.feels_like)}°</p>
                                <p>Humidity {Math.round(weatherData.main.humidity)} g/m3</p>
                                <p>Wind speed {Math.round(weatherData.wind.speed)} km/h</p>
                            </div>
                        </div>
                    </div>
                </Popup>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="weather-icon" alt='weather icon'></img>
                <p className="temperature">{Math.round(weatherData.main.temp)}°</p>
                <p className="city">{city}</p>           
            </div>
        );
    }
}


export default Weather;
