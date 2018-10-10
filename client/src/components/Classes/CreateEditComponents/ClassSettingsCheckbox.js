import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { bool } from 'prop-types'
import gql from 'graphql-tag'

export default class ClassSettingsCheckbox extends Component {
  state = {
    ccEmails: this.props.ccEmails
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked
    })
  }

  render () {
    return (
      <form>
        <input type='checkbox' name='ccEmails' checked={this.state.ccEmails} onChange={this.handleInputChange} />
        <label htmlFor='ccEmails'>CC Me on Class Emails</label>
      </form>
    )
  }
}

ClassSettingsCheckbox.propTypes = {
  ccEmails: bool
}
