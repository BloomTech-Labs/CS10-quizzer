import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

const UPDATE_QUIZ_SCORE = gql`
  mutation ($QuizID: String!, $Classroom: String!, $StudentID: String!, $Score: Int!) {
    updateQuizScore(QuizID: $QuizID, Classroom: $Classroom, StudentID: $StudentID, Score: $Score) {
      updatedQuizScore {
        QuizID
        StudentID
        Score
      }
    }
  }
`

class QuizQuestions extends Component {
  state = {
    isAnswerCorrect: false,
    page: 0,
    quizComplete: false,
    quizScore: 0
  }

  increaseQuizScore = () => {
    this.setState({
      isAnswerCorrect: false,
      // page: this.state.page + 1,
      quizScore: this.state.quizScore + 10
    })
  }

  decreaseQuizScore = () => {
    this.setState({
      isAnswerCorrect: false,
      // page: this.state.page + 1,
      quizScore: this.state.quizScore - 10
    })
  }

  resetQuizScore = () => {
    this.setState({
      isAnswerCorrect: false,
      // page: this.state.page + 1,
      quizScore: 0
    })
  }

  setIsAnswerCorrect = e => {
    const { correctAnswer } = e.target.dataset

    if (correctAnswer === 'true') {
      this.setState({ isAnswerCorrect: true })
    } else {
      this.setState({ isAnswerCorrect: false })
    }
  }

  submitAnswer = async (questionsLength, mutation) => {
    const { isAnswerCorrect } = this.state

    await (() => (
      new Promise((resolve, reject) => {
        if (isAnswerCorrect) {
          resolve(this.increaseQuizScore())
        } else {
          if (this.state.quizScore > 10) {
            resolve(this.decreaseQuizScore())
          } else {
            resolve(this.resetQuizScore())
          }
        }
      })
    ))()

    if (this.state.page + 1 === questionsLength) {
      mutation({
        variables: {
          QuizID: this.props.qid,
          Classroom: this.props.cid,
          StudentID: this.props.sid,
          Score: this.state.quizScore
        }
      })
    } else {
      this.setState({ page: this.state.page + 1 })
    }
  }

  render () {
    console.log(this.state)

    if (this.state.quizComplete) {
      return (
        <div>
          <p>Quiz Complete! You got a score of {this.state.quizScore} out of {(this.state.page + 1) * 10}</p>

          <Link to='/'>
            Back to Quizzer Homepage
          </Link>
        </div>
      )
    }

    return (
      <div>
        <h1>{ this.props.classroom.ClassName } - { this.props.student.StudentName }</h1>
        <h2>{ this.state.page + 1 } of { this.props.quiz.questionSet.length }</h2>
        <h1>{this.props.quiz.QuizName}</h1>

        <div>
          <h2>
            { this.props.quiz.questionSet[ this.state.page ].Question }
          </h2>

          <ul>
            { this.props.quiz.questionSet[ this.state.page ].choiceSet.map(choice => (
              <li key={choice.ChoiceID}>
                <input
                  data-correct-answer={choice.isCorrect}
                  name={this.state.page}
                  onClick={ this.setIsAnswerCorrect }
                  type='radio'
                />
                <label htmlFor=''>{ choice.ChoiceText }</label>
              </li>
            )) }
          </ul>
        </div>

        <Mutation
          mutation={UPDATE_QUIZ_SCORE}
          onCompleted={({ updateQuizScore }) => this.setState({ quizComplete: true })}
        >
          {(updateQuizScore, { loading, error }) => {
            return <button onClick={() => this.submitAnswer(this.props.quiz.questionSet.length, updateQuizScore)}>
              Submit Quiz
            </button>
          }}
        </Mutation>
      </div>
    )
  }
}
 
export default QuizQuestions