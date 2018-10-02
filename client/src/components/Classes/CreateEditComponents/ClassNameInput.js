import React, { Component } from 'react'
import { InputGroup, Input } from 'reactstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

const UPDATE_CLASS_NAME = gql`
mutation UpdateClassName($ClassID: String!, $ClassName: String!, $encJWT: String!){
  updateClass(ClassID: $ClassID, ClassName: $ClassName, encJWT: $encJWT) {
    updatedClass {
      ClassID
      ClassName
    }
  }
}`

class ClassNameInput extends Component {
  state = {
    name: ''
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { name } = this.state
    const { className, classID } = this.props
    return (
      <Mutation mutation={UPDATE_CLASS_NAME}>
        {(updateClassName, { loading, error }) => (
          <div>
            <form onSubmit={event => {
              event.preventDefault()
              updateClassName({
                variables: {
                  ClassID: classID,
                  ClassName: name,
                  encJWT: window.localStorage.getItem('token')
                },
                refetchQueries: ['GetSingleClass', 'getClasses']
              })
              this.setState({
                name: ''
              })
            }}>
              <InputGroup>
                <Input type='text' name='name' value={name} placeholder={className} onChange={this.handleInputChange} />
              </InputGroup>
            </form>
            {loading && <span>Saving changes...</span>}
            {error && <span>{error.message}</span>}
          </div>
        )}
      </Mutation>
    )
  }
}

ClassNameInput.propTypes = {
  className: PropTypes.string,
  classID: PropTypes.string
}

export default ClassNameInput
