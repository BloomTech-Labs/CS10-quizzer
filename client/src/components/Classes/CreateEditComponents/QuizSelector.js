import React, { Component } from 'react'
import QuizSelectModal from './QuizSelectModal'
import { Button } from 'reactstrap'
import { string } from 'prop-types'

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
    const { classID } = this.props
    return (
      <div>
        <QuizSelectModal classID={classID} isOpen={this.state.isOpen} toggle={this.toggle} />
        <Button onClick={this.toggle}>Add Class</Button>
      </div>
    )
  }
}

QuizSelector.propTypes = {
  classID: string
}

export default QuizSelector
