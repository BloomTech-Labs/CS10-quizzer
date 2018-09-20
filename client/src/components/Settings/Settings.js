/* This page allows a user to change the following:
  Email address
  Password

  Should also import the Rocketlist component to provide navigation.
*/

import React, { Component } from 'react'
// import gql from 'graphql-tag'
import { Button } from 'reactstrap'
// import Rocketlist

// GraphQL structures go here. We need to retrieve the current
// email address and password (for the old password field), and we
// need a mutation to request a change through the server.

class Settings extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      oldPassword: '',
      newPassword: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { email, oldPassword, newPassword } = this.state
    return (
      <div className='settings_container'>
        <span>Email:</span>
        <input type='email' name='email' value={email} onChange={this.handleInputChange} />
        <span>Old Password:</span>
        <input type='password' name='oldPassword' value={oldPassword} onChange={this.handleInputChange} />
        <span>New Password:</span>
        <input type='password' name='newPassword' value={newPassword} onChange={this.handleInputChange} />
        <Button type='submit' color='info' className='settings_save_button'>Save</Button>
      </div>
    )
  }
}

export default Settings
