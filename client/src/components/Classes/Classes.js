import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import ViewQuizOrClass from '../ViewQuizOrClass/ViewQuizOrClass'
import ClassList from './ClassList'
import { AddQuizContainer } from '../Quizzes/styled'
import NewClassCard from './NewClassCard'

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

  render () {
    return (
      <Styles>
        <Query query={GET_CLASSES_INFORMATION} variables={{ token: localStorage.getItem('token') }}>
          {({ loading, data, error }) => {
            if (loading) return <span>Loading...</span>
            if (error) return <span>{error.message}</span>

            if (data) {
              const classSet = data.teacher[0].classSet

              return (
                <AddQuizContainer className='add_quiz_container'>
                  <NewClassCard />
                  {classSet.map(classroom => {
                    const { ClassID } = classroom

                    return (
                      <ViewQuizOrClass key={ClassID} render={() => {
                        return (
                          <ClassList
                            classroom={classroom}
                          />
                        )
                      }} />
                    )
                  })}
                </AddQuizContainer>
              )
            }
          }}
        </Query>
        <div /> {/* this is here because Styles expects an array, otherwise throws error */}
      </Styles>
    )
  }
}

export default Classes
