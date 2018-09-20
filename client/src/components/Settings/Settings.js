/* This page allows a user to change the following:
  Email address
  Password

  Should also import the Rocketlist component to provide navigation.
*/

import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Breadcrumb, BreadcrumbItem, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
// import Rocketlist
import './Settings.css'

// GraphQL Query for current user information
const getCurrentInformation = gql`
  {
    teacher(encJwt: "${window.localStorage.getItem('token')}") {
      TeacherEmail
    }
  }`

// GraphQL Mutation to update user information
// const updateInformation = gql`
//   {
//     mutation
//   }
// `

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
        <div className='settings_breadcrumb_container'>
          <Breadcrumb tag='nav'>
            <BreadcrumbItem tag='a' href='#'>Home</BreadcrumbItem>
            <BreadcrumbItem active tag='span'>Settings</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Query query={getCurrentInformation}>
          {({ error, data }) => {
            return (
              <InputGroup>
                <InputGroupAddon addonType='prepend'>Email:</InputGroupAddon>
                <Input placeholder={data.teacher ? data.teacher[0].TeacherEmail : 'Loading...'} type='email' name='email' value={email} onChange={this.handleInputChange} />
                {(error && <span>Error!: {error.message}</span>)}
              </InputGroup>
            )
          }}
        </Query>
        <br />
        <InputGroup>
          <InputGroupAddon addonType='prepend'>Old Password: </InputGroupAddon>
          <Input type='password' name='oldPassword' value={oldPassword} onChange={this.handleInputChange} />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType='prepend'>New Password: </InputGroupAddon>
          <Input type='password' name='newPassword' value={newPassword} onChange={this.handleInputChange} />
        </InputGroup>
        <Button type='submit' color='info' className='settings_save_button'>Save</Button>
      </div>
    )
  }
}

export default Settings
