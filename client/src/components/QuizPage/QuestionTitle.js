import React, { Component } from 'react'

class QuestionTitle extends Component {
  state = {}

  render () {
    return (
      <h2>
        { this.props.title }
      </h2>
    )
  }
}

export default QuestionTitle
