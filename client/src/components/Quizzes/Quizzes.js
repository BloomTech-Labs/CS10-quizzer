import React, { Component } from 'react'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'

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
    this.state = {
      redirect: false
    }
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

  createQuiz = () => {
    this.setState({
      redirect: true
    })
  }

  render () {
    return (
      <div className='quizzes_container'>
        <span>Add a new Quiz</span>

        <Query query={getCurrentInformation}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error: ${error.message}`

            if (data) {
              return this.renderQuizComponent(data)
            }
          }}
        </Query>

        <Button color='warning' className='add_quiz_button' onClick={this.createQuiz}>
          <span role='img' aria-labelledby='Plus Symbol'>&#x2795;</span>
        </Button>

        {this.state.redirect ? <Redirect from='/rocket/quizzes' to='/rocket/quizzes/createquiz' /> : null}
      </div>
    )
  }
}

export default Quizzes
