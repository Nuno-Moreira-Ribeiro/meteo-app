import React from 'react'
import './DateApp.scss'

const Heure = new Date();

let minutes = Heure.getMinutes();

if (minutes !== Heure.getMinutes()) {
}


function DateApp() {
    return (
        <div className="DateContainer">
            <h1 className='date'>{Heure.getDate()}/{Heure.getMonth()}/{Heure.getFullYear()}</h1>
            <h1 className="time">{Heure.getHours()}:{Heure.getMinutes()}</h1>
        </div>
    )
}

export default DateApp