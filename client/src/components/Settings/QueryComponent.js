import React, { Component } from 'react'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import InputForm from './InputForm'

// GraphQL Query for current user information
const getCurrentInformation = gql`
  {
    teacher(encJwt: "${window.localStorage.getItem('token')}") {
      TeacherName
      TeacherEmail
    }
  }`

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

export default QueryComponent
