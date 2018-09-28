import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import ViewQuizOrClass from '../ViewQuizOrClass/ViewQuizOrClass'

import './Classes.css'
import ClassList from './ClassList'

const getClasses = gql`
{
  teacher(encJwt: "${localStorage.getItem('token')}") {
    classSet {
      ClassID
      ClassName
    }
  }
}
`

class Classes extends Component {
  state = {}

  renderClassComponent = data => {
    const { classSet } = data.teacher[0]

    return classSet.map(val => {
      const { ClassName, ClassID } = val

      return (
        <ViewQuizOrClass
          key={ClassID}
          render={() => (
            <ClassList
              ClassName={ClassName}
              ClassID={ClassID}
            />
          )}
        />
      )
    })
  }

  render () {
    return (
      <div>
        <h1>Add Classes</h1>

        <Query query={getClasses}>
          {({ loading, data, err }) => {
            if (loading) return <h1>Loading...</h1>
            if (err) return <h1>GraphQL ERR</h1>

            if (data) {
              return this.renderClassComponent(data)
            }
          }}
        </Query>
      </div>
    )
  }
}

export default Classes
