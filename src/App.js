import React from 'react'
import MeteoApp from './components/meteoApp/MeteoApp'
import DateApp from './components/dateApp/DateApp'
import ActualiteApp from './components/actualiteApp/ActualiteApp'
import "./App.css"

function App() {
  return (
    <div className='main'>
      <DateApp />
      <MeteoApp />
      <ActualiteApp />
    </div>
  )
}

export default App