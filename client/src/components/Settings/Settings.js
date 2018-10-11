import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Button } from 'reactstrap'

import QueryComponent from './QueryComponent'

import './Settings.css'
import {
  SettingsContainerStyled,
  SettingsContainerFormWrapperStyled
} from './styled'

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
      oldPassword: null,
      newPassword: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { name, email, oldPassword, newPassword } = this.state

    return (
      // <div className='settings_container'>
      <SettingsContainerStyled className='settings_container'>
        <Mutation mutation={updateInformation}>
          {(updateTeacher, { loading, error, data }) => (
            <SettingsContainerFormWrapperStyled
              className='settings_container__form_wrapper'
            >
              <form onSubmit={event => {
                event.preventDefault()
                const updatedInfo = updateTeacher({
                  variables: {
                    incomingJwt: localStorage.getItem('token'),
                    TeacherName: name,
                    TeacherEmail: email,
                    OldPassword: oldPassword,
                    NewPassword: newPassword
                  },
                  refetchQueries: ['GetCurrentInformation']
                })
                updatedInfo.then(res => {
                  window.localStorage.setItem('token', res.data.updateTeacher.jwtString)
                }).catch(() => {
                  return <span>Something went wrong!</span>
                })
              }
              }>
                <QueryComponent
                  email={email}
                  handleInputChange={this.handleInputChange}
                  name={name}
                  newPassword={newPassword}
                  oldPassword={oldPassword}
                />

                <Button type='submit' color='info' className='settings_save_button'>Save</Button>
              </form>

              {loading && <span>Loading...</span>}
              {error && <span>{error.message}</span>}
              {data && <span>Successfully updated!</span>}
            </SettingsContainerFormWrapperStyled>
          )}
        </Mutation>
      </SettingsContainerStyled>
      // </div>
    )
  }
}

export default Settings
