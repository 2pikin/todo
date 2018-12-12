import React, { Component } from 'react'

import './CityItemFilter.css'

export default class CityItemFilter extends Component {
  state = {
    term: ''
  }

  onSearchChange = (e) => {
    this.setState({
      term: e.target.value
    })
    this.props.onSearchChange(e.target.value)
  }

  render() {
    return (
      <input
        type="text"
        className="form-control search-panel"
        placeholder="find city in current list"
        value={this.state.term}
        onChange={this.onSearchChange}
      />
    )
  }
}
