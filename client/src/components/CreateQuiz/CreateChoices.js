import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import './CreateQuiz.css'

class CreateChoices extends Component {
  render () {
    return (
      this.props.choices[this.props.index][Number(this.props.choice)][2]
        ? <Button choice={this.props.choice} className='enable_disable_choice' name={this.props.index} onClick={this.props.enableOrDisable}>Enable Choice</Button>
        : <Button choice={this.props.choice} color='info' className='enable_disable_choice' name={this.props.index} onClick={this.props.enableOrDisable}>Disable Choice</Button>
    )
  }
}

CreateChoices.propTypes = {
  choice: PropTypes.string,
  choices: PropTypes.array,
  index: PropTypes.number,
  enableOrDisable: PropTypes.func
}

export default CreateChoices
