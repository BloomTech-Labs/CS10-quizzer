import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Redirect, withRouter } from 'react-router-dom'
import { Button } from 'reactstrap'
import ViewQuizOrClass from '../ViewQuizOrClass/ViewQuizOrClass'
import QuizList from './QuizList'
import './Quizzes.css'

const getCurrentInformation = gql`
  query getCurrentInformation($token: String!) {
    teacher(encJwt: $token) {
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
  }
`

class Quizzes extends Component {
  constructor () {
    super()
    this.state = {
      redirect: false,
      token: null
    }
  }

  componentWillMount () {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  createQuiz = () => {
    this.setState({
      redirect: true
    })
  }

  render () {
    return (
      <div className='quizzes_container'>
        <div className='add_quiz_container'>
          <span>Add a new Quiz</span>
          <Button color='warning' className='add_quiz_button' onClick={this.createQuiz}>
            <span role='img' aria-labelledby='Plus Symbol'>&#x2795;</span>
          </Button>
        </div>
        <Query query={getCurrentInformation} variables={{ token: this.state.token }}>
          {({ loading, error, data }) => {
            console.log('Test')
            if (loading) {
              return <span>Loading...</span>
            }

            if (error) {
              return <span>{`Error: ${error.message}`}</span>
            }

            if (data) {
              const { quizSet } = data.teacher[0]
              return quizSet.map(quiz => {
                const { QuizID, QuizName, Classes } = quiz
                const amountOfClasses = Classes.length
                return (
                  <div key={QuizID}>
                    <ViewQuizOrClass render={() => {
                      return (
                        <QuizList
                          QuizName={QuizName}
                          QuizID={QuizID}
                          amountOfClasses={amountOfClasses}
                        />
                      )
                    }}
                    />
                  </div>
                )
              })
            }
          }}
        </Query>
        {this.state.redirect ? <Redirect from='/rocket/quizzes' to='/rocket/quizzes/createquiz' /> : null}
      </div>
    )
  }
}

export default withRouter(Quizzes)
