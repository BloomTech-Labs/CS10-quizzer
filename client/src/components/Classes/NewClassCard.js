import React, { Component } from 'react'
import NewClassModal from './NewClassModal/NewClassModal'
import { Card, CardTitle, CardBody, Button } from 'reactstrap'

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
      <Card className='quiz_card'>
        <CardBody className='quiz_card_body'>
          <CardTitle className='quiz_card_title'>New Class</CardTitle>
          <Button
            color='warning'
            onClick={this.toggleNewClassModal}
          >
            <span role='img' aria-labelledby='Plus Symbol'>&#x2795;</span>
          </Button>
          <NewClassModal openNewClassModal={this.state.openNewClassModal} toggleNewClassModal={this.toggleNewClassModal} />
        </CardBody>
      </Card>
    )
  }
}

export default NewClassCard
