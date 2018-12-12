import React, { Component } from 'react'
import WeatherService from '../../services/WeatherService'

import './CityItemAdd.css'

export default class CityItemAdd extends Component {

  weather = new WeatherService()

  state  = {
    label: '',
    error: false
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  updateWeather() {
    this.weather.getCityByName('Moscow').then((w) => {
      this.setState({
        temp: w.main.temp,
        pressure: w.main.pressure,
        wind_speed: w.wind.speed,
        wind_deg: w.wind.deg,
        id: w.id
      })
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {label} = this.state
    const letters = /^[A-Za-z]+$/;
    if (label === '' || !label.match(letters)) {
      this.setState({error: true})
      return
    }

    this.weather.getByCityName(label).then((w) => {
      const temp = Math.floor(parseFloat(w.main.temp)-273.15)
      this.props.onAdd(
        label, w.weather[0].icon, temp, w.main.pressure,
        w.wind.speed, w.wind.deg, w.id
      )

      this.setState({
        label: '',
        error: false
      })
    }).catch(() => {
      this.setState({
        error: true
      })
    })
  }

  render() {
    const style = this.state.error ? 'd-block' : 'd-none'
    return (
      <div>
        <form className="city-item-add d-flex">
          <input type="text"
            className="form-control"
            onChange={this.onLabelChange}
            placeholder="add city to list, f.e. Moscow"
            value={this.state.label}
          />
          <button type="button"
            className="btn btn-outline-success"
            onClick={this.onSubmit}
          >
          Add City
          </button>
        </form>
        <div className={`alert alert-danger city-item-add-alert ${style}`}>
          <i className="fa fa-exclamation-circle city-item-add-icon"></i>
          Please enter correct city name
        </div>
      </div>
    )
  }
}
