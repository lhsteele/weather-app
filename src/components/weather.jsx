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
      // .then(res => console.log(res.list[0].dt))
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
      let date = new Date(fcast.dt * 1000).toString().split(" ").slice(1, 3)
      let time = new Date(fcast.dt * 1000).toString().split(" ").slice(4, 5)
      // let date = new Date(fcast.dt * 1000).toString()
      console.log(date)
      return (
        <li key={i} className="fcast">
          <p>{date}</p>
          <p>{time}</p>
          <p>{fcast.weather[0].main}</p>
          <p>{fcast.weather[0].description}</p>
          <p>{`Min: ${fcast.main.temp_min} F`}</p>
          <p>{`Max: ${fcast.main.temp_max} F`}</p>
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