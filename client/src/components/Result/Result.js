import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Result.css'

class Result extends Component {
  constructor (props) {
    super(props)
    this.state = {
      grade: null
    }
  }

  componentDidMount () {
    this.setState({
      grade: this.props.location.state.grade
    })
  }

  render () {
    if (!this.state.grade) {
      return <div>Loading...</div>
    }
    return (
      <div>
        {this.state.grade > 70 ? <h1>Congratulations you pass! You received a grade of {this.state.grade}%.</h1> : <h1>You did not pass. You received a grade of {this.state.grade}%.</h1>}
      </div>
    )
  }
}

Result.propTypes = {
  location: PropTypes.object
}

export default Result
