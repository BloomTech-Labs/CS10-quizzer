import React, { Component } from 'react'
import QuizSelectModal from './QuizSelectModal'
import { Button } from 'reactstrap'

class QuizSelector extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <div>
        <QuizSelectModal isOpen={this.state.isOpen} toggle={this.toggle} />
        <Button onClick={this.toggle}>+</Button>
      </div>
    )
  }
}

export default QuizSelector
