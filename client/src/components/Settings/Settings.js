import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
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
  mutation UpdateTeacher($TeacherName: String!, $TeacherEmail: String!, $OldPassword: String!, $NewPassword: String!) {
    updateTeacher(incomingJwt: "${window.localStorage.getItem('token')}", TeacherName: $TeacherName, TeacherEmail: $TeacherEmail, OldPassword: $OldPassword, NewPassword: $NewPassword) {
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

class Settings extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      emptyFields: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { name, email, oldPassword, newPassword } = this.state
    return (
      <div className='settings_container'>
        <Mutation mutation={updateInformation}>
          {(updateTeacher, { loading, error, data }) => (
            <div>
              <form onSubmit={event => {
                event.preventDefault()
                if (name.length < 1 || email.length < 1 || newPassword.length < 1) {
                  this.setState({
                    emptyFields: true
                  })
                } else {
                  this.setState({
                    emptyFields: false
                  })
                  const updatedInfo = updateTeacher({ variables: { TeacherName: name, TeacherEmail: email, OldPassword: oldPassword, NewPassword: newPassword } })
                  updatedInfo.then(res => {
                    window.localStorage.setItem('token', res.data.updateTeacher.jwtString)
                  }).catch(() => {
                    return <span>Something went wrong!</span>
                  })
                }
              }}>
                <QueryComponent name={name} email={email} oldPassword={oldPassword} newPassword={newPassword} handleInputChange={this.handleInputChange} />
                <Button type='submit' color='info' className='settings_save_button'>Save</Button>
              </form>
              {loading && <span>Loading...</span>}
              {error && <span>Error: {error.message}</span>}
              {data && <span>Successfully updated!</span>}
              {this.state.emptyFields ? <span>Please fill out all fields.</span> : null}
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}

export default Settings
