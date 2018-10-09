import React, { Component } from 'react'
import NewClassModal from './NewClassModal/NewClassModal'
import { CardTitle, Button } from 'reactstrap'

import { NewClassCardStyles } from './styles'

class NewClassCard extends Component {
  constructor () {
    super()
    this.state = {
      openNewClassModal: false
    }
  }

  toggleNewClassModal = () => {
    this.setState({
      openNewClassModal: !this.state.openNewClassModal
    })
  }

  render () {
    return (
      <NewClassCardStyles className='classes_newClassContainer_Card pt-3'>
        <CardTitle>New Class</CardTitle>

        <Button
          className='add_quiz_button'
          color='warning'
          onClick={this.toggleNewClassModal}
        >
          <span role='img' aria-labelledby='Plus Symbol'>&#x2795;</span>
        </Button>

        <NewClassModal openNewClassModal={this.state.openNewClassModal} toggleNewClassModal={this.toggleNewClassModal} />
      </NewClassCardStyles>
    )
  }
}

export default NewClassCard
