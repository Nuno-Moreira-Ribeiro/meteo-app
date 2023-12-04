// News.js
import React from 'react';
import './Actualite.scss'
import rien from '../Assets/rien.png'


const Actualite = ({ title, url, imgUrl }) => {
    if (imgUrl !== null) {
        rien = imgUrl;
    }

    return (
        <div className="newsContainer">
            <img id='imgNews' src={rien} alt="news img" />
            <div className="infos">
                <h2>{title}</h2>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    Lire la suite
                </a>
            </div>
        </div>
    );
};

export default Actualite;
