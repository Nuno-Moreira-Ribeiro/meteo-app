// NewsApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Actualite from '../actualite/Actualite';
import './ActualiteApp.scss';

const ActualiteApp = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_API_KEY_NEWS}`;
                const response = await axios.get(url);

                if (response.data.articles) {
                    console.log(response.data.articles)
                    setNews(response.data.articles);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des actualités', error);
            }
        };

        fetchNews();
    }, []);


    return (
        <div id='ContainerTitleAndNews'>
            <h1 id='Titre'>Dernières actualités</h1>
            <div className="actu">
                {news.map((article, index) => (
                    <Actualite
                        key={index}
                        title={article.title}
                        url={article.url}
                        imgUrl={article.urlToImage}
                    />
                ))}
            </div>
        </div>
    );
};

export default ActualiteApp;
