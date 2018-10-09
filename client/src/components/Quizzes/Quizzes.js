import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { Button, Card, CardBody, CardTitle } from 'reactstrap'
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
      redirect: false
    }
  }

  createQuiz = () => {
    this.setState({
      redirect: true
    })
  }

  render () {
    return (
      <div className='quizzes_container'>
        <Query query={getCurrentInformation} variables={{ token: localStorage.getItem('token') }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <span>Loading...</span>
            }

            if (error) {
              return <span>{`Error: ${error.message}`}</span>
            }

            if (data) {
              const queryLength = data.teacher[0].quizSet.length
              if (queryLength === 0) {
                return (
                  <div className='add_quiz_container'>
                    <div className='cards'>
                      <Card className='quiz_card'>
                        <CardBody className='quiz_card_body'>
                          <CardTitle className='quiz_card_title'>New Quiz</CardTitle>
                          <Button color='warning' onClick={this.createQuiz}>
                            <span role='img' aria-labelledby='Plus Symbol'>&#x2795;</span>
                          </Button>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                )
              } else {
                const { quizSet } = data.teacher[0]
                return (
                  <div>
                    {queryLength >= 10 ? <span>The free plan has a limit of 10 quizzes. <Link to='/rocket/billing'>Upgrade your plan?</Link></span> : null}
                    <div className='quiz_cards_container'>
                      <div className='cards'>
                        <Card className='quiz_card'>
                          <CardBody className='quiz_card_body'>
                            <CardTitle className='quiz_card_title'>New Quiz</CardTitle>
                            <Button color='warning' onClick={this.createQuiz}>
                              <span role='img' aria-labelledby='Plus Symbol'>&#x2795;</span>
                            </Button>
                          </CardBody>
                        </Card>
                      </div>
                      {quizSet.map(quiz => {
                        const { QuizID, QuizName, Classes } = quiz
                        const amountOfClasses = Classes.length
                        return (
                          <ViewQuizOrClass key={QuizID} render={() => {
                            return (
                              <QuizList
                                QuizName={QuizName}
                                QuizID={QuizID}
                                amountOfClasses={amountOfClasses}
                              />
                            )
                          }}
                          />
                        )
                      })}
                    </div>
                  </div>
                )
              }
            }
          }}
        </Query>
        {this.state.redirect ? <Redirect to='/rocket/quizzes/createquiz' /> : null}
      </div>
    )
  }
}

export default withRouter(Quizzes)
