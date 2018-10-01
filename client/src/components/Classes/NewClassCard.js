import React, { Component } from 'react'
import NewClassModal from './NewClassModal/NewClassModal'
import { Button } from 'reactstrap'

class NewClassCard extends Component {
  state = {
    newClassModal: false
  }

  toggleNewClassModal = () => {
    this.setState({
      newClassModal: !this.newClassModal
    })
  }

  render () {
    return (
      <div>
        <h4>New Class</h4>
        <NewClassModal newClassModal={this.state.newClassModal} toggleNewClassModal={this.toggleNewClassModal} />
        <Button color='warning' className='add_quiz_button' onClick={this.toggleNewClassModal}>
          <span role='img' aria-labelledby='Plus Symbol'>&#x2795;</span>
        </Button>
      </div>
    )
  }
}

export default NewClassCard
