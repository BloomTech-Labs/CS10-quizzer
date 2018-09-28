import React, { Component } from 'react'
import NewClassCard from './NewClassCard'
import './Classes.css'

class Classes extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div>
        <h1>Add Classes</h1>
        <NewClassCard />
      </div>
    )
  }
}

export default Classes
