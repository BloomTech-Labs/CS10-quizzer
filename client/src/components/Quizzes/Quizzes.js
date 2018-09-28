import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import ViewQuizOrClass from '../ViewQuizOrClass/ViewQuizOrClass'
import QuizList from './QuizList'

import './Quizzes.css'

const getCurrentInformation = gql`
 {
    teacher(encJwt: "${window.localStorage.getItem('token')}") {
      quizSet {
        QuizID
        QuizName
        Public

        Classes {
          ClassID
          ClassName
        }
      }
    }
  }`

class Quizzes extends Component {
  constructor () {
    super()
    this.state = {}
  }

  renderQuizComponent = data => {
    const { quizSet } = data.teacher[0]
    const quizData = quizSet.map(quiz => {
      const { QuizID, QuizName, Classes } = quiz
      const amountOfClasses = Classes.length

      return (
        <div key={QuizID}>
          <ViewQuizOrClass
            render={() => (
              <QuizList
                QuizName={QuizName}
                QuizID={QuizID}
                amountOfClasses={amountOfClasses}
              />
            )}
          />
        </div>
      )
    })

    return quizData
  }

  render () {
    return (
      <div>
        <h1>Add a Quiz</h1>

        <Query query={getCurrentInformation}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error: ${error.message}`

            if (data) {
              return this.renderQuizComponent(data)
            }
          }}
        </Query>
      </div>
    )
  }
}

export default Quizzes
