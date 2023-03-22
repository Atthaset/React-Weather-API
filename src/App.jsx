import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const city = 'Bangkok'
  const apiKey = 'bf1c32d1c54cc98f8570aaa074a8d0b6'
  const [location, setLocation] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(url)
      .then(res => res.json)
      .then(data => {
        setLocation(data)
        setIsLoading(true)
      })
  }, [])

  const convertTemp = (kelvin) => {
    return (kelvin - 273).toFixed()
  }

  return (
    (isLoading && <div className='App'>
      <section>
        <div className='location'>
          <h1 className='city'>{location.name}</h1>
          <p className='state'>{location.sys.county}</p>
        </div>
        <div className='card'>
          <div className='weather'>
            <h1>{convertTemp(location.main.temp)}&deg;C</h1>
            <small>max : {convertTemp(location.main.temp_max)}&deg;C, min : {convertTemp(location.main.temp_min)}&deg;C</small>
          </div>
          <div className='info'>
            <div className='status'>{location.weather[0].main}</div>
            <div className='humidity'>Moisture : {location.main.humidity}</div>
            <div className='wind'>Wind speed : {location.wind.speed}</div>
          </div>
        </div>
      </section>
    </div>)
  )
}

export default App
