import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Button, Input, Label } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import './QuizPage.css'

// const testData = require('./testData.json')

const GET_QUIZ = gql`
  query ($quizID: String!) {
    quiz: singleQuiz(QuizID: $quizID) {
      QuizID
      QuizName
      
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
        variables={{ quizID: this.props.match.params.qid }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h1>Retrieving Quiz Information...</h1>

          if (error) return <h1>There was an error</h1>

          if (data) {
            console.log(data.quiz)

            return (
              <div>
                <h1>{data.quiz.QuizName}</h1>

                <div>
                  <h2>
                    { data.quiz.questionSet[ this.state.page ].Question }
                  </h2>

                  <ul>
                    { data.quiz.questionSet[ this.state.page ].choiceSet.map(choice => (
                      <li key={choice.ChoiceID}>
                        { choice.ChoiceText }
                      </li>
                    )) }
                  </ul>
                </div>

                <button onClick={() => this.setState({ page: this.state.page - 1 })}>Back</button>
                <button onClick={() => this.setState({ page: this.state.page + 1 })}>Next</button>
              </div>
            )
          }
        }}
      </Query>
    )
  }
}

export default QuizPage
