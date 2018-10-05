import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Button } from 'reactstrap'

import Questions from './Questions'
import QuizComplete from './QuizComplete'
import QuizHeader from './QuizHeader'

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

  callMutation = (questionsLength, mutation) => {
    const { qid, cid, sid } = this.props
    const { quizScore } = this.state

    mutation({
      variables: {
        QuizID: qid,
        Classroom: cid,
        StudentID: sid,
        Score: quizScore / (questionsLength * 10) * 100
      }
    })
  }

  getNextQuestion = page => {
    this.setState({ page: page + 1 })
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
        }

        resolve()
      })
    ))()

    if (page + 1 === questionsLength) {
      this.callMutation(questionsLength, mutation)
    } else {
      this.getNextQuestion(page)
    }
  }

  // render
  render () {
    const { classroom, student, quiz } = this.props
    const { page, quizComplete, quizScore } = this.state
    const questionSetLength = quiz.questionSet.length

    console.log(quizScore)

    // render this portion when the quiz has been completed
    if (quizComplete) {
      return (
        <QuizComplete
          questionsLength={questionSetLength}
          quizScore={quizScore}
          page={page}
        />
      )
    }

    // this portion is the actual quiz
    // this is what the student will see before when they first land on this page
    return (
      <div>
        <QuizHeader
          classroom={classroom}
          page={page}
          questionSetLength={questionSetLength}
          student={student}
        />

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
