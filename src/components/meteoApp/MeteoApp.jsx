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
import locationIcon from '../Assets/Locationcircle.svg'
import lune from '../Assets/nuit.png'

const MeteoApp = () => {
    const api_key = process.env.REACT_APP_API_KEY;
    const [wicon, setWicon] = useState(rien);
    const [humidIcon, setHumidIcon] = useState(rien);
    const [windIcon, setWindIcon] = useState(rien);
    const [description, setDescription] = useState("");
    var lat;
    var long;

    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            search();
        }
    });

    function getLatLong() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    lat = position.coords.latitude;
                    long = position.coords.longitude;
                    resolve({ lat, long });
                },
                error => {
                    reject(error);
                }
            );
        });
    }

    function updateData(data) {
        const temperature = document.getElementsByClassName("temperatre");
        const minTemp = document.getElementsByClassName("minTemp");
        const maxTemp = document.getElementsByClassName("maxTemp");
        const sepMinMax = document.getElementsByClassName("sepMinMax");
        const wind = document.getElementsByClassName("wind");
        const humidity = document.getElementsByClassName("humidity");
        temperature[0].innerHTML = data.main.temp + "°C";
        minTemp[0].innerHTML = data.main.temp + "°C";
        sepMinMax[0].innerHTML = " - ";
        maxTemp[0].innerHTML = data.main.temp_max + "°C";
        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = data.wind.speed + "km/h";
        setImgAndDescription(data);
        if (windIcon === rien) {
            setWindIcon(vent);
            setHumidIcon(humidite);
        }
    }

    function setImgAndDescription(data) {
        if (data.weather[0].icon === "01d" || data.weather[0].icon === "02d") {
            setWicon(soleil);
            setDescription("Ensoleillé");
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "04d") {
            setWicon(nuage);
            setDescription("Nuageux");
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "10d") {
            setWicon(pluie);
            setDescription("Pluie");
        } else if (data.weather[0].icon === "13d") {
            setWicon(neige);
            setDescription("Neige");
        } else if (data.weather[0].icon === "13n" || data.weather[0].icon === "01n" || data.weather[0].icon === "03n" || data.weather[0].icon === "09n" || data.weather[0].icon === "02n" || data.weather[0].icon === "04n" || data.weather[0].icon === "10n") {
            setWicon(lune);
            setDescription("Nuit");

        } else {
            setWicon(nuage);
            setDescription("Nuageux");
        }
    }

    const searchLoc = async () => {
        try {
            const { lat, long } = await getLatLong();
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`;
            let response = await fetch(url);
            let data = await response.json();
            updateData(data);
        } catch (error) {
            console.error("Problème lors de la récuperation des données de la ville vérifier que la ville est correcte.");
        }
    };


    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
            let response = await fetch(url);
            let data = await response.json();
            updateData(data);
        } catch (error) {
            console.error("Problème lors de la récuperation des données de la ville vérifier que la ville est correcte.")
        }
    }

    return (
        <div className='container'>
            <div className="search">
                <div className="leftBarToCenter"></div>
                <div className="searchBar">
                    <input type="text" className='cityInput' placeholder='Recherche' />
                    <button className='searchLoupe' type='submit' onClick={() => { search() }}>
                        <img id="imgSearch" src={rechercheLoupe} alt=" loupe de recherche" draggable="false" />
                    </button>
                </div>
                <button type="submit" className='searchLoupe' onClick={() => { searchLoc() }}>
                    <img id="imgSearchLoc" src={locationIcon} alt="Localisation pour la recherche" />
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

        </div >
    );
}

export default MeteoApp;