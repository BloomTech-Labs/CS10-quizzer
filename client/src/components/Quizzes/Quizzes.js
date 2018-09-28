import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import './Quizzes.css'

const getCurrentInformation = gql`
 {
    teacher(encJwt: "${window.localStorage.getItem('token')}") {
      TeacherID
      TeacherName
      TeacherEmail
      CustomerID
      Subscription

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

  render () {
    return (
      <div>
        <h1>Add a Quiz</h1>

        <Query query={getCurrentInformation}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error: ${error.message}`

            if (data) {
              console.log(data.teacher[0])
              const { quizSet } = data.teacher[0]

              const quizData = quizSet.map(quiz => {
                const { QuizID, QuizName, Classes } = quiz
                const amountOfClasses = Classes.length

                return (
                  <div key={QuizID}>
                    <p>{QuizName}</p>
                    <p>Classes Assigned: {amountOfClasses}</p>

                    <button
                      onClick={() => console.log(`EDIT ${quiz.QuizName}`)}
                    >
                      Edit
                    </button>
                  </div>
                )
              })

              return quizData
            }
          }}
        </Query>
      </div>
    )
  }
}

export default Quizzes
