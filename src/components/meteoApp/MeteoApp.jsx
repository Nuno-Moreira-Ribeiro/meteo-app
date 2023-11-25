import React, { useState } from 'react'
import './meteoApp.scss'
import rechercheLoupe from '../Assets/search.svg'
import nuage from '../Assets/cloud.png'
import soleil from '../Assets/clear.png'
import pluie from '../Assets/drizzle.png'
import neige from '../Assets/snow.png'
import rien from '../Assets/rien.png'
import vent from '../Assets/wind.png'
import humidite from '../Assets/humidity.png'
import config from '../../config.js';


const MeteoApp = () => {

    const api_key = config.apiKey;
    const [wicon, setWicon] = useState(rien);
    const [humidIcon, setHumidIcon] = useState(rien);
    const [windIcon, setWindIcon] = useState(rien);
    const [description, setDescription] = useState("");

    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            search();
        }
    });

    function setImgAndDescription(data) {
        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n" || data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(soleil);
            setDescription("Ensoleillé");
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n" || data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(nuage);
            setDescription("Nuageux");
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n" || data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(pluie);
            setDescription("Pluie");
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(neige);
            setDescription("Neige");
        } else {
            setWicon(nuage);
            setDescription("Nuageux");
        }
    }

    const search = async () => {
        if (windIcon === rien) {
            setWindIcon(vent);
            setHumidIcon(humidite);
        }
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
            let response = await fetch(url);
            let data = await response.json();
            const temperature = document.getElementsByClassName("temperatre");
            const minTemp = document.getElementsByClassName("minTemp");
            const maxTemp = document.getElementsByClassName("maxTemp");
            const sepMinMax = document.getElementsByClassName("sepMinMax");
            const wind = document.getElementsByClassName("wind");
            const humidity = document.getElementsByClassName("humidity");
            temperature[0].innerHTML = data.main.temp + "°C";
            minTemp[0].innerHTML = data.main.temp_min + "°C";
            sepMinMax[0].innerHTML = " - ";
            maxTemp[0].innerHTML = data.main.temp_max + "°C";
            humidity[0].innerHTML = data.main.humidity + "%";
            wind[0].innerHTML = data.wind.speed + "km/h";
            setImgAndDescription(data);
        } catch (error) {
            console.error("Problème lors de la récuperation des données de la ville vérifier que la ville est correcte.")
        }
    }

    return (
        <div className='container'>
            <div className="search">
                <input type="text" className='cityInput' placeholder='recherche' />
                <button className='searchLoupe' type='submit' onClick={() => { search() }}>
                    <img id="imgLoupe" src={rechercheLoupe} alt=" loupe de recherche" draggable="false" />
                </button>
            </div>
            <div className="informationsWeather">
                <div className="imageTemp">
                    <img className='imgTemp' src={wicon} alt="img de la température actuelle" draggable="false" />
                </div>
                <div className="tempCelsius">
                    <h1 className='temperatureInfo'>{description}</h1>
                    <h1 className='temperatureInfo temperatre'> </h1>
                    <div className="minmax">
                        <h3 className='temperatureInfo minTemp' > </h3>
                        <h3 className='temperatureInfo sepMinMax' > </h3>
                        <h3 className='temperatureInfo maxTemp' > </h3>
                    </div>
                    <div className="windHumid">
                        <div className="windHumidContainer">
                            <img className='logoWindHumid' src={windIcon} alt="vent logo" />
                            <h3 className='infoWindHumid wind'> </h3>
                        </div>
                        <div className="windHumidContainer">
                            <img className='logoWindHumid' src={humidIcon} alt="humidité logo" />
                            <h3 className='infoWindHumid humidity'> </h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MeteoApp;