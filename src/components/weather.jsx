import React from 'react';
import './weather.css'

class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city : null,
      country: null,
      forecast: null
    }
  }

  componentDidMount() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=imperial&APPID=83b3abcf3df058e692a4697bf517eae1')
      .then(res => res.json())
      // .then(res => console.log(res.list))
      .then(res => {
        this.setState({
          city: res.city.name,
          country: res.city.country,
          forecast: res.list
        })
      })
  }

  render() {
    if (!this.state.city) return <p>Loading ...</p>

    let forecast = this.state.forecast.map((fcast, i) => {
      return (
        <li key={i} className="fcast">
          <p>{fcast.weather[0].main}</p>
          <p>{fcast.weather[0].description}</p>
          <p>{fcast.main.temp_min}</p>
          <p>{fcast.main.temp_max}</p>
        </li>
      )
    })
    

    return (
      <>
        <>
          <p>{this.state.city}</p>
          <p>{this.state.country}</p>
        </>
        <ul className="forecast-ul">
          {forecast}
        </ul>
      </>
    )
  }
}

export default Weather