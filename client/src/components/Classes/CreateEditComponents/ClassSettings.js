import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { InputGroup, Input, Button } from 'reactstrap'
import { string } from 'prop-types'

const UPDATE_CLASS_NAME = gql`
mutation UpdateClassName($ClassID: String!, $ClassName: String!, $encJWT: String!){
  updateClass(ClassID: $ClassID, ClassName: $ClassName, encJWT: $encJWT) {
    updatedClass {
      ClassID
      ClassName
    }
  }
}`

class ClassSettings extends Component {
  state = {
    name: ''
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { className, classID } = this.props
    const { name } = this.state

    return (
      <div>
        <h4>Settings</h4>
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
                  refetchQueries: ['GetClassNames']
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
        <InputGroup>
          <Input type='checkbox' />
          <p>CC Me on Class Emails</p>
        </InputGroup>
        <Button>Import CSV</Button>
      </div>
    )
  }
}

ClassSettings.propTypes = {
  className: string,
  classID: string
}

export default ClassSettings
