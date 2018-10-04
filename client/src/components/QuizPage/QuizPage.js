import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import QuestionsContainer from './QuestionsContainer'

import './QuizPage.css'

const GET_QUIZ = gql`
  query ($quizID: String!, $classID: String!, $studentID: String!) {
    quiz: singleQuiz(QuizID: $quizID) {
      questionSet {
        QuestionID
        Question
        isMajor

        choiceSet {
          ChoiceID
          ChoiceText
          isCorrect
        }
      }
    }
    
    classroom: singleClass(ClassID: $classID) {
      ClassID
      ClassName
    }
    
    student: student(StudentID: $studentID) {
      StudentID
      StudentName
      StudentEmail
    }
  }
`

class QuizPage extends Component {
  state = {
    page: 0
  }

  render () {
    const { history, params } = this.props.match
    const { cid, qid, sid } = params

    return (
      <Query
        query={GET_QUIZ}
        variables={{
          quizID: qid,
          classID: cid,
          studentID: sid
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h1>Retrieving Quiz Information...</h1>

          if (error) return <h1>There was an error</h1>

          if (data) {
            return (
              <QuestionsContainer
                {...data}
                {...params}
                history={history}
              />
            )
          }
        }}
      </Query>
    )
  }
}

export default QuizPage
