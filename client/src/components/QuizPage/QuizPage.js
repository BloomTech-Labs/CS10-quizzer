import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Button, Input, Label } from 'reactstrap'
import { Redirect } from 'react-router-dom'

import QuizQuestions from './QuizQuestions'

import './QuizPage.css'

// const testData = require('./testData.json')

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
  constructor () {
    super()
    this.state = {
      page: 0
    }
  }

  render () {
    return (
      <Query
        query={ GET_QUIZ }
        variables={{ 
          quizID: this.props.match.params.qid,
          classID: this.props.match.params.cid,
          studentID: this.props.match.params.sid
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h1>Retrieving Quiz Information...</h1>

          if (error) return <h1>There was an error</h1>

          if (data) {
            return <QuizQuestions {...data} {...this.props.match.params} history={this.props.history} />
          }
        }}
      </Query>
    )
  }
}

export default QuizPage
