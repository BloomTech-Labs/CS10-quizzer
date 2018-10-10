import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { bool, string } from 'prop-types'
import gql from 'graphql-tag'

const UPDATE_CC_EMAIL_SETTING = gql`
mutation UpdateCCEmailSetting($ClassID: String!) {
  updateCcEmails(ClassID: $ClassID) {
    updatedCcEmails {
      ccEmails
    }
  }
}
`

export default class ClassSettingsCheckbox extends Component {
  state = {
    ccEmails: this.props.ccEmails
  }

  render () {
    const { classID } = this.props

    return (
      <Mutation mutation={UPDATE_CC_EMAIL_SETTING}>
        {(updateCCEmailSetting, { loading, error, data }) => (
          <div>
            <input
              type='checkbox'
              name='ccEmails'
              checked={this.state.ccEmails}
              onChange={event => {
                event.preventDefault()
                updateCCEmailSetting({
                  variables: {
                    ClassID: classID
                  }
                })
                this.setState({
                  ccEmails: !this.state.ccEmails
                })
              }} />
            <label htmlFor='ccEmails'>CC Me on Class Emails</label>
            <br />
            {loading && <span>Saving change...</span>}
            {error && <span>{error.message}</span>}
          </div>
        )}
      </Mutation>
    )
  }
}

ClassSettingsCheckbox.propTypes = {
  classID: string,
  ccEmails: bool
}
