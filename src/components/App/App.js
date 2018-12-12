import React, { Component } from 'react'
import AppHeader from '../AppHeader'
import CityItemFilter from '../CityItemFilter'
import CityItemStatusFilter from '../CityItemStatusFilter'
import CityList from '../CityList'
import CityItemAdd from '../CityItemAdd'
import WeatherService from '../../services/WeatherService'

import './App.css'

export default class App extends Component {

  weather = new WeatherService()

  state = {
    todoData: [],
    term: '',
    filter: 'all' // all, favorites, recycle
  }

  componentDidMount() {
    this.interval = setInterval(this.updateWeather, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  updateWeather = () => {
    this.state.todoData.forEach(({label}) => {
      this.updateCityItem(label)
    })
  }

  updateCityItem = (label) => {
    this.setState(({todoData}) => {
      this.weather.getByCityName(label).then((w) => {
        const temp = Math.floor(parseFloat(w.main.temp)-273.15)
        const index = todoData.findIndex((el) => el.label === label)
        const oldItem = todoData[index]
        this.setState({
          todoData: [
            ...todoData.slice(0, index),
            {...oldItem, icon:w.weather[0].icon, temp,
              pressure:w.main.pressure, wind_speed:w.wind.speed, wind_deg:w.wind.deg},
            ...todoData.slice(index+1)
          ]
        })

      })

    })
  }

  createCityItem(label, icon, temp, pressure, wind_speed, wind_deg, id) {
    return { label, icon, temp, pressure, wind_speed, wind_deg, id, favorites: false, recycle: false }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const index = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index+1)]

      return {
        todoData : newArray
      }
    })
  }

  addItem = (text, icon, temp, pressure, wind_speed, wind_deg, id) => {
    this.setState(({todoData}) => {
      const newArray = [
        ...todoData,
        this.createCityItem(text, icon, temp, pressure, wind_speed, wind_deg, id)
      ]
      return {
        todoData: newArray
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id)
    const oldItem = arr[index]
    const newItem = {...oldItem, [propName]: !oldItem[propName]}
    return [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index+1)
    ]
  }

  onToggleFavorite = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'favorites')
      }
    })
  }

  onToggleRecycle = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'recycle')
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({
      filter
    })
  }

  filterItem(items, filter) {
    switch (filter) {
      case 'favorites':
        return items.filter((el) => el.favorites && !el.recycle)
      case 'recycle':
        return items.filter((el) => el.recycle)
      default:
        return items.filter((el) => !el.recycle)
    }
  }

  onSearchChange = (term) => {
    this.setState({
      term
    })
  }

  searchItem(items, term) {
    if (term.length === 0) {
      return items
    }
    return items.filter((el) => el.label.toLowerCase()
      .indexOf(term.toLowerCase()) > -1)
  }

  render() {
    const {todoData, term, filter} = this.state;

    const visibleItems = this.filterItem(this.searchItem(todoData, term), filter)

    const favoritesCount = todoData.filter((el) => el.favorites).length
    const recycleCount = todoData.filter((el) => el.recycle).length

    return (
      <div className="app-main">
        <nav className="navbar navbar-custom">
          <h2><i className="fa fa-sun-o" aria-hidden="true"></i> My Weather Monitor</h2>
        </nav>
        <div className="container">
          <AppHeader favorites={favoritesCount} recycle={recycleCount}/>
          <div className="top-panel d-flex">
            <CityItemFilter onSearchChange={this.onSearchChange}/>
            <CityItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
          </div>
          <CityList todos={visibleItems}
            onDelete={this.deleteItem}
            onToggleFavorite={this.onToggleFavorite}
            onToggleRecycle={this.onToggleRecycle}
          />
          <CityItemAdd onAdd={this.addItem} />
        </div>
      </div>
    )
  }
}
