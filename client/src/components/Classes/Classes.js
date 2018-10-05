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

        quizscoresSet {
          QuizScoresID
          StudentID
          QuizID
          Score
        }
      }
    }
  }
`

class Classes extends Component {
  state = {}

  renderClassComponent = data => {
    const classSet = data.teacher[0].classSet
    return (
      <ViewQuizOrClass
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
      <div className='quizzes_container'>
        <h1>Classes</h1>

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
