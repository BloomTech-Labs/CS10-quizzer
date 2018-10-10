import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Redirect, withRouter } from 'react-router-dom'
import { Button, Card, CardBody, CardTitle } from 'reactstrap'
import ViewQuizOrClass from '../ViewQuizOrClass/ViewQuizOrClass'
import QuizList from './QuizList'
import './Quizzes.css'

import Styles from '../RocketStyles'
import { AddQuizContainer, Cards } from './styled'

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
      <Styles>
        <Query query={getCurrentInformation} variables={{ token: localStorage.getItem('token') }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <span>Loading...</span>
            }

            if (error) {
              return <span>{`Error: ${error.message}`}</span>
            }

            if (data) {
              const { quizSet } = data.teacher[0]

              return (
                <AddQuizContainer className='add_quiz_container'>
                  <Cards className='cards'>
                    <Card className='quiz_card'>
                      <CardBody className='quiz_card_body'>
                        <CardTitle className='quiz_card_title'>New Quiz</CardTitle>
                        <Button color='warning' onClick={this.createQuiz}>
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
