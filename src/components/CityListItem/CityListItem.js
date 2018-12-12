import React from 'react'

import './CityListItem.css'

const CityListItem = ({ label, icon, temp, pressure, wind_speed, wind_deg,
  favorites, recycle, onDelete, onToggleFavorite, onToggleRecycle }) => {

    let classNames = 'city-list-item'
    if (recycle) {
      classNames += ' recycle'
    }

    if (favorites) {
      classNames += ' favorites'
    }

    return (
      <span className={classNames}>
        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather"/>
        <span className="city-list-item-label">{label}</span>
        <span className="city-list-item-temp">
          <i className="fa fa-thermometer-empty city-list-item-icon"></i>{temp}&deg;C
        </span>

        <i className="fa fa-clock-o city-list-item-icon"></i>{pressure}hPA
        <i className="fa fa-angle-double-right city-list-item-icon"></i>{wind_speed}m/sec

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDelete}
        >
          <i className="fa fa-times"/>
        </button>

        <button type="button"
          className="btn btn-outline-warning btn-sm float-right"
          onClick={onToggleRecycle}
        >
          <i className="fa fa-trash-o"/>
        </button>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleFavorite}
        >
          <i className="fa fa-star-o"/>
        </button>
      </span>)
}

export default CityListItem
