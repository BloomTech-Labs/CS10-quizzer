import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { Button, Card, CardBody, CardTitle } from 'reactstrap'
import ViewQuizOrClass from '../ViewQuizOrClass/ViewQuizOrClass'
import QuizList from './QuizList'
import QuizPaywallModal from './QuizPaywallModal'
import './Quizzes.css'

import Styles from '../RocketStyles'
import { AddQuizContainer, Cards } from './styled'

const getCurrentInformation = gql`
  query getCurrentInformation($token: String!) {
    teacher(encJwt: $token) {
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
  }
`

const FREE_PLAN = 10
const BASIC_PLAN = 25

class Quizzes extends Component {
  constructor () {
    super()
    this.state = {
      redirect: false,
      toggleModal: false
    }
  }

  subscriptionCheck = (subType, quizAmount) => {
    if ((subType === '' && quizAmount >= FREE_PLAN) || (subType === 'Basic' && quizAmount >= BASIC_PLAN)) {
      this.togglePaywallModal()
    } else {
      this.createQuiz()
    }
  }

  togglePaywallModal = () => {
    this.setState({
      toggleModal: !this.state.toggleModal
    })
  }

  createQuiz = () => {
    this.setState({
      redirect: true
    })
  }

  render () {
    return (
      <Styles>
        <QuizPaywallModal isOpen={this.state.toggleModal} toggle={this.togglePaywallModal} />
        <Query query={getCurrentInformation} variables={{ token: localStorage.getItem('token') }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <span>Loading...</span>
            }

            if (error) {
              return <span>{`Error: ${error.message}`}</span>
            }

            if (data) {
              const { quizSet, Subscription } = data.teacher[0]
              const quizzesLength = quizSet.length

              return (
                <div>
                  {quizzesLength >= FREE_PLAN && Subscription === '' ? <span>The free plan has a limit of {FREE_PLAN} quizzes. <Link to='/rocket/billing'>Upgrade your plan?</Link></span> : null}
                  {quizzesLength >= BASIC_PLAN && Subscription === 'Basic' ? <span>The basic plan has a limit of {BASIC_PLAN} quizzes. <Link to='/rocket/billing'>Upgrade your plan?</Link></span> : null}
                  <AddQuizContainer className='add_quiz_container'>
                    <Cards>
                      <Card className='quiz_card'>
                        <CardBody className='quiz_card_body'>
                          <CardTitle className='quiz_card_title'>New Quiz</CardTitle>
                          <Button color='warning' onClick={() => this.subscriptionCheck(Subscription, quizzesLength)}>
                            <span role='img' aria-labelledby='Plus Symbol'>&#x2795;</span>
                          </Button>
                        </CardBody>
                      </Card>
                    </Cards>

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
                  </AddQuizContainer>
                </div>
              )
            }
          }}
        </Query>

        {this.state.redirect ? <Redirect to='/rocket/quizzes/createquiz' /> : null}
      </Styles>
    )
  }
}

export default withRouter(Quizzes)
