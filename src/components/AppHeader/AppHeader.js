import React from 'react'

import './AppHeader.css'

const AppHeader = ({favorites, recycle}) => (
  <div className="app-header d-flex">
    <h1>City Filter</h1>
    <h2>{favorites} favorites, {recycle} recycled</h2>
  </div>
)

export default AppHeader
