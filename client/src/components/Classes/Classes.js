import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ViewQuizOrClass from '../ViewQuizOrClass/ViewQuizOrClass'
import ClassList from './ClassList'
import './Classes.css'

const GET_CLASSES_INFORMATION = gql`
  query getClasses($token: String!) {
    teacher(encJwt: $token) {
      classSet {
        ClassID
        ClassName
        studentSet {
          StudentID
        }
        quizSet {
          QuizID
        }
      }
    }
  }`

class Classes extends Component {
  state = {}

  renderClassComponent = data => {
    const classSet = data.teacher[0].classSet

    return (
      <ViewQuizOrClass
        className='wut'
        key={classSet.ClassID}
        render={() => (
          <ClassList
            classSet={classSet}
          />
        )}
      />
    )
  }

  render () {
    return (
      <div>
        <Query query={GET_CLASSES_INFORMATION} variables={{ token: localStorage.getItem('token') }}>
          {({ loading, data, error }) => {
            if (loading) return <h1>Loading...</h1>
            if (error) return <h1>{error.message}</h1>

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
