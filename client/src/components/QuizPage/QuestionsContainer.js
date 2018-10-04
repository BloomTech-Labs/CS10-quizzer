import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

import Questions from './Questions'

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

  // setQuizScore
  setQuizScore = score => {
    this.setState({
      isAnswerCorrect: false,
      quizScore: score
    })
  }

  // setIsAnswerCorrect
  setIsAnswerCorrect = e => {
    const { correctAnswer } = e.target.dataset

    if (correctAnswer === 'true') {
      this.setState({ isAnswerCorrect: true })
    } else {
      this.setState({ isAnswerCorrect: false })
    }
  }

  // submitAnswer
  submitAnswer = async (questionsLength, mutation) => {
    const { isAnswerCorrect, page, quizScore } = this.state

    /**
     * a self-calling promise (look up JavaScript IIFE in google) to ensure
     * that the state has been set before attempting to check if the student is
     * submitting the final question of the test.
     * if so then the student shall be directed to a new component that will
     * show their quiz score if not they will be given the next question
     */
    await (() => (
      new Promise((resolve, reject) => {
        if (isAnswerCorrect) {
          resolve(this.setQuizScore(quizScore + 10))
        } else {
          if (quizScore > 10) {
            resolve(this.setQuizScore(quizScore - 10))
          } else {
            resolve(this.setQuizScore(0))
          }
        }
      })
    ))()

    if (page + 1 === questionsLength) {
      const { qid, cid, sid } = this.props

      mutation({
        variables: {
          QuizID: qid,
          Classroom: cid,
          StudentID: sid,
          Score: quizScore
        }
      })
    } else {
      this.setState({ page: page + 1 })
    }
  }

  // render
  render () {
    const { classroom, student, quiz } = this.props
    const { page, quizComplete, quizScore } = this.state
    const questionSetLength = quiz.questionSet.length

    // render this portion when the quiz has been completed
    if (quizComplete) {
      return (
        <div>
          <p>
            Quiz Complete! You got a score of {quizScore} out of {(page + 1) * 10}
          </p>

          <Link to='/'>
            Back to Quizzer Homepage
          </Link>
        </div>
      )
    }

    // this portion is the actual quiz
    // this is what the student will see before when they first land on this page
    return (
      <div>
        <h1>{ classroom.ClassName } - { student.StudentName }</h1>
        <p>{ page + 1 } of { questionSetLength }</p>

        <Questions
          {...this.props}
          setIsAnswerCorrect={this.setIsAnswerCorrect}
          page={page}
        />

        <Mutation
          mutation={UPDATE_QUIZ_SCORE}
          onCompleted={() => this.setState({ quizComplete: true })}
        >
          {(updateQuizScore, { loading, error }) => {
            return (
              <Button
                onClick={() => {
                  this.submitAnswer(questionSetLength, updateQuizScore)
                }}
              >
                Submit
              </Button>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default QuizQuestions
