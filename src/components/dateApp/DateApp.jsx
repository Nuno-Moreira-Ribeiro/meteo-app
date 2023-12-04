import React, { useState, useEffect } from 'react'
import './DateApp.scss'

function DateApp() {

    const [Heure, setHeure] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setHeure(new Date());
        }, 600);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="DateContainer">
            <h1 className='date'>{Heure.getDate()}/{(Heure.getMonth() + 1)}/{Heure.getFullYear()}</h1>
            <h1 className="time">{Heure.getHours()}:{Heure.getMinutes()}</h1>
        </div>
    )
}

export default DateApp