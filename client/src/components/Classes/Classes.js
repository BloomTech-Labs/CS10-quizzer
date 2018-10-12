import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import ViewQuizOrClass from '../ViewQuizOrClass/ViewQuizOrClass'
import ClassList from './ClassList'
import { AddQuizContainer } from '../Quizzes/styled'

import './Classes.css'

import Styles from '../RocketStyles'

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
      <Styles>
        <AddQuizContainer className='add_quiz_container'>
          <Query query={GET_CLASSES_INFORMATION} variables={{ token: localStorage.getItem('token') }}>
            {({ loading, data, error }) => {
              if (loading) return <span>Loading...</span>
              if (error) return <span>{error.message}</span>

              if (data) {
                return (this.renderClassComponent(data))
              }
            }}
          </Query>
        </AddQuizContainer>
      </Styles>
    )
  }
}

export default Classes
