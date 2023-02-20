import axios from "axios";
import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import { FiEdit2 } from 'react-icons/fi';



function Weather(props) {
    const [weatherData, setWeatherData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState('Nairobi')
    const [cityList, setCityList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const apiNinjasKey = process.env.REACT_APP_API_NINJAS_KEY;

    const getWeather = async() => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`)
        setWeatherData(response.data);
        console.log(response);
    }

    const getcities = async() => {
        const options = {
            method: 'GET',
            url: 'https://countriesnow.space/api/v0.1/countries/capital',
                headers: {
                  'X-Api-Key': `${apiNinjasKey}`
                }
            };
            axios.request(options).then(function (response) {
                response.data.data.map(item => {
                    setCityList(prevValue => {
                        return [...prevValue, item.capital];
                    });
                    setIsLoading(false);
                });
            }).catch(function (error) {
                console.error(error);
            });
    }


    useEffect(() => {
        getWeather();
    },[city]);

    useEffect(() => {
        getcities();
    },[]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }


    const handleClick = (item) => {
        setCity(item);
        setSearchTerm('');
    }


    if(isLoading) {
        return '';
    } else {
        return(
            <div className="weather">
                 <div className="weather-data">
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="weather-icon" alt='weather icon'></img>
                    <p className="temperature">{Math.round(weatherData.main.temp)}°</p>
                    <p className="city">{city}</p>   
                </div>
                <div className="popup">
                    <Popup trigger={<button className="weather-popup-button">...</button>} position='bottom right' nested>
                        <div className="weather-popup">
                            <div className="city-popup">
                                <p className="popup-city-name">{city}</p>
                                <Popup trigger={<button className="edit-city-button"><FiEdit2 /></button>} position='center center' nested>
                                    {close => (
                                        <div className="search-bar">
                                            <input className="city-input"onChange={handleChange} type='text' placeholder='Type a Location' value={searchTerm}></input>
                                            {cityList.filter(item => {
                                                const userInput = searchTerm.toLowerCase();
                                                const listItem = item.toLowerCase();

                                                return userInput && listItem.startsWith(userInput);
                                            }).slice(0, 10).map(item => {
                                                return (
                                                    <div key={item} className="suggestions"
                                                        onClick={() => {
                                                            handleClick(item);
                                                            close();
                                                        }}>{item}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </Popup>
                            </div>
                            <div className="popup-weather-data">
                                <div className="primary-weather-data">
                                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="weather-popup-icon" alt='weather icon'></img>
                                    <p className="popup-temperature">{Math.round(weatherData.main.temp)}°</p>
                                </div>
                                <div className="secondary-weather-data">
                                    <p>Feels like {Math.round(weatherData.main.feels_like)}°</p>
                                    <p>Humidity {Math.round(weatherData.main.humidity)} g/m3</p>
                                    <p>Wind speed {Math.round(weatherData.wind.speed)} m/s</p>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </div>        
            </div>
        );
    }
}


export default Weather;
