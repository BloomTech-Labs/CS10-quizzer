import React, { Component } from 'react'
import ClassNameInput from './ClassNameInput'
// import { Button } from 'reactstrap'
import { Query } from 'react-apollo'
import { string } from 'prop-types'
import gql from 'graphql-tag'
import ClassSettingsCheckbox from './ClassSettingsCheckbox'

const GET_SINGLE_CLASS = gql`
  query GetSingleClass($ClassID: String!) {
    classroom: singleClass(ClassID: $ClassID) {
      ClassName
      ccEmails
    }
  }`

class ClassSettings extends Component {
  state = {
    name: ''
  }

  render () {
    const { classID } = this.props

    return (
      <Query query={GET_SINGLE_CLASS} variables={{ ClassID: classID }}>
        {({ loading, error, data }) => {
          if (loading) return <span>Loading...</span>
          if (error) return <span>{error.message}</span>
          if (data) {
            const className = data.classroom.ClassName
            const ccEmails = data.classroom.ccEmails

            return (
              <div>
                <h1>Editing {className}</h1>
                <h4>Settings</h4>
                <ClassNameInput className={className} classID={classID} />
                <ClassSettingsCheckbox ccEmails={ccEmails} />
                {/* <Button>Import CSV</Button> */}
              </div>
            )
          }
        }}
      </Query>
    )
  }
}

ClassSettings.propTypes = {
  classID: string
}

export default ClassSettings
