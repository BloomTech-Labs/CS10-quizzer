import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from 'reactstrap'
import QueryComponent from './QueryComponent'
import './Settings.css'

// GraphQL Mutation to update user information
const updateInformation = gql`
  mutation UpdateTeacher($incomingJwt: String!, $TeacherName: String, $TeacherEmail: String, $OldPassword: String!, $NewPassword: String) {
    updateTeacher(incomingJwt: $incomingJwt, TeacherName: $TeacherName, TeacherEmail: $TeacherEmail, OldPassword: $OldPassword, NewPassword: $NewPassword) {
      teacher {
        TeacherName
        TeacherEmail
      }
      jwtString
    }
  }`

class Settings extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      oldPassword: '',
      newPassword: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { name, email, oldPassword, newPassword } = this.state
    return (
      <div className='settings_container'>
        <Mutation mutation={updateInformation}>
          {(updateTeacher, { loading, error, data }) => (
            <div>
              <form onSubmit={async event => {
                event.preventDefault()
                try {
                  const updatedInfo = await updateTeacher({
                    variables: {
                      incomingJwt: window.localStorage.getItem('token'),
                      TeacherName: name,
                      TeacherEmail: email,
                      OldPassword: oldPassword,
                      NewPassword: newPassword
                    },
                    refetchQueries: ['GetCurrentInformation']
                  })
                  if (updatedInfo.data.updateTeacher.jwtString) {
                    window.localStorage.setItem('token', updatedInfo.data.updateTeacher.jwtString)
                    return this.setState({
                      name: '',
                      email: '',
                      oldPassword: '',
                      newPassword: ''
                    })
                  }
                } catch (err) {
                  return <span>Something went wrong!</span>
                }
              }}>
                <QueryComponent name={name} email={email} oldPassword={oldPassword} newPassword={newPassword} handleInputChange={this.handleInputChange} />
                <Button type='submit' color='info' className='settings_save_button'>Save</Button>
              </form>
              {loading && <span>Loading...</span>}
              {error && <span>{error.message}</span>}
              {data && <span>Successfully updated!</span>}
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}

export default Settings
