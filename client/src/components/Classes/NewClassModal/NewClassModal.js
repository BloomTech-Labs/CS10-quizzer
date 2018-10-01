import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Mutation } from 'react-apollo'

const CREATE_NEW_CLASS = gql`
mutation NewClass($ClassName: String!, $encJwt: String!) {
  createClass(ClassName: $ClassName, encJwt: $encJwt) {
    newClass {
      ClassID
    }
  }
}`

class NewClassModal extends Component {
  state = {
    name: ''
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const { name } = this.state

    return (
      <Modal isOpen={this.props.newClassModal} toggle={this.props.toggleNewClassModal}>
        <ModalHeader>
          <span>Create a New Classroom</span>
        </ModalHeader>
        <Mutation mutation={CREATE_NEW_CLASS}>
          {(createClass, { loading, error, data }) => (
            <form onSubmit={event => {
              event.preventDefault()
              if (this.state.name.length > 0) {
                createClass({
                  variables: {
                    ClassName: name,
                    encJwt: window.localStorage.getItem('token')
                  },
                  refetchQueries: ['getClasses']
                })
                this.setState({
                  name: ''
                })
                this.props.toggleNewClassModal()
              }
            }}>
              <ModalBody>
                <div>
                  <input type='text' name='name' value={name} onChange={this.handleInputChange} required />
                </div>
              </ModalBody>
              <Button type='submit'>Save New Class</Button>
              <ModalFooter>
                {loading && <span>Saving new class...</span>}
                {error && <span>{error.message}</span>}
                {data && <span>Class saved!</span>}
              </ModalFooter>
            </form>
          )}
        </Mutation>
      </Modal>
    )
  }
}

NewClassModal.propTypes = {
  newClassModal: PropTypes.bool,
  toggleNewClassModal: PropTypes.func
}

export default NewClassModal
