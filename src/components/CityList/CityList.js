import React from 'react'
import CityListItem from '../CityListItem'

import './CityList.css'

const CityList = ({todos, favorites, recycle, onDelete, onToggleFavorite, onToggleRecycle}) => {
  const elements = todos.map(({id, ...itemProps}) =>
    <li key={id} className="list-group-item">
      <CityListItem {...itemProps}
        onDelete={() => onDelete(id)}
        onToggleFavorite={() => onToggleFavorite(id)}
        onToggleRecycle={() => onToggleRecycle(id)}
      />
    </li>
  )
  const date = new Date()
  const currentDate = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`
  if (elements.length === 0) {
    return (
      <React.Fragment>
      <ul className="list-group list-group-flush city-list">
        <li className="list-group-item text-center">empty list</li>
      </ul>
      <div className="city-list-time">(last updated: {currentDate})</div>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <ul className="list-group list-group-flush city-list">
        {elements}
      </ul>
      <div className="city-list-time">(last updated: {currentDate})</div>
    </React.Fragment>
  )
}

export default CityList
