/* This page allows a user to change the following:
  Email address
  Password

  Should also import the Rocketlist component to provide navigation.
*/

import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Breadcrumb, BreadcrumbItem, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
// import Rocketlist
import './Settings.css'

// GraphQL Query for current user information
const getCurrentInformation = gql`
  {
    teacher(encJwt: "${window.localStorage.getItem('token')}") {
      TeacherName
      TeacherEmail
    }
  }`

// GraphQL Mutation to update user information
const updateInformation = gql`
  mutation UpdateTeacher($TeacherName: String!, $TeacherEmail: String!, $TeacherPW: String!) {
    updateTeacher(incomingJwt: "${window.localStorage.getItem('token')}", TeacherName: $TeacherName, TeacherEmail: $TeacherEmail, TeacherPW: $TeacherPW) {
      teacher {
        TeacherName
        TeacherEmail
      }
      jwtString
    }
  }`

const InputForm = (props) => {
  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>Name:</InputGroupAddon>
        <Input placeholder={props.data.teacher ? props.data.teacher[0].TeacherName : 'Loading...'} type='text' name='name' value={props.name} onChange={props.handleInputChange} />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon addonType='prepend'>Email:</InputGroupAddon>
        <Input placeholder={props.data.teacher ? props.data.teacher[0].TeacherEmail : 'Loading...'} type='email' name='email' value={props.email} onChange={props.handleInputChange} />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon addonType='prepend'>Old Password: </InputGroupAddon>
        <Input type='password' name='oldPassword' value={props.oldPassword} onChange={props.handleInputChange} />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon addonType='prepend'>New Password: </InputGroupAddon>
        <Input type='password' name='newPassword' value={props.newPassword} onChange={props.handleInputChange} />
      </InputGroup>
    </div>
  )
}

InputForm.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  email: PropTypes.string,
  handleInputChange: PropTypes.func,
  oldPassword: PropTypes.string,
  newPassword: PropTypes.string
}

class QueryComponent extends Component {
  constructor (props) {
    super()
    this.state = {
      name: props.name,
      email: props.email,
      oldPassword: props.oldPassword,
      newPassword: props.newPassword
    }
  }

  render () {
    return (
      <Query query={getCurrentInformation}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return `Error: ${error.message}`

          return (
            <InputForm data={data} handleInputChange={this.props.handleInputChange} />
          )
        }}
      </Query>
    )
  }
}

QueryComponent.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  oldPassword: PropTypes.string,
  newPassword: PropTypes.string,
  handleInputChange: PropTypes.func
}

// class MutationComponent extends Component {
//   constructor (props) {
//     super()
//     this.state = {
//       name: props.name,
//       email: props.email,
//       oldPassword: props.oldPassword,
//       newPassword: props.newPassword
//     }
//   }

//   render () {
//     const { name, email, newPassword } = this.state
//     return (
//       <Mutation mutation={updateInformation}>
//         {(updateTeacher, { loading, error, data }) => {
//           if (loading) return 'Loading...'
//           if (error) return `Error: ${error.message}`

//           return (
//             updateTeacher({ variables: { TeacherName: name, TeacherEmail: email, TeacherPW: newPassword } })
//           )
//         }}
//       </Mutation>
//     )
//   }
// }

// MutationComponent.propTypes = {
//   name: PropTypes.string,
//   email: PropTypes.string,
//   oldPassword: PropTypes.string,
//   newPassword: PropTypes.string
// }

class Settings extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      oldPassword: '',
      newPassword: ''
    }

    // this.sendData = this.sendData.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  // sendData () {
  //   const { name, email, oldPassword, newPassword } = this.state
  //   return (
  //     <MutationComponent name={name} email={email} oldPassword={oldPassword} newPassword={newPassword} />
  //   )
  // }

  render () {
    const { name, email, oldPassword, newPassword } = this.state
    return (
      <div className='settings_container'>
        <div className='settings_breadcrumb_container'>
          <Breadcrumb tag='nav'>
            <BreadcrumbItem tag='a' href='#'>Home</BreadcrumbItem>
            <BreadcrumbItem active tag='span'>Settings</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Mutation mutation={updateInformation}>
          {(updateTeacher, { loading, error, data }) => (
            <div>
              <form onSubmit={event => {
                event.preventDefault()
                updateTeacher({ variables: { TeacherName: name, TeacherEmail: email, TeacherPW: newPassword } })
              }}>
                <QueryComponent name={name} email={email} oldPassword={oldPassword} newPassword={newPassword} handleInputChange={this.handleInputChange} />
                <Button type='submit' color='info' className='settings_save_button'>Save</Button>
              </form>
              {loading && <span>Loading...</span>}
              {error && <span>Something went wrong...</span>}
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}

export default Settings
