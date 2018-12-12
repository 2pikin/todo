import React, { Component } from 'react'

import './CityItemStatusFilter.css'

export default class CityItemStatusFilter extends Component {

  buttons = [
    {name: 'all', label: 'All'},
    {name: 'favorites', label: 'Favorites'},
    {name: 'recycle', label: 'Recycle'}
  ]

  render() {
    const {filter, onFilterChange} = this.props;

    const buttons = this.buttons.map(({name, label}) => {
      const isActive = filter === name
      const classActive = isActive ? 'btn-success' : 'btn-outline-success'
      return (
        <button key={name}
          type="button"
          className={`btn ${classActive}`}
          onClick={() => onFilterChange(name)}
        >
        {label}
        </button>
      )
    })

    return (
      <div className="btn-group">
        {buttons}
      </div>
    )
  }
}
