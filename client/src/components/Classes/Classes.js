import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Row, Col } from 'reactstrap'

import ViewQuizOrClass from '../ViewQuizOrClass/ViewQuizOrClass'
import ClassList from './ClassList'
import NewClassCard from './NewClassCard'

import './Classes.css'

import Styles from '../RocketStyles'

const GET_CLASSES_INFORMATION = gql`
  query getClasses($token: String!) {
    teacher(encJwt: $token) {
      classSet {
        ClassID
        ClassName

        studentSet {
          StudentID
        }

        quizSet {
          QuizID
        }

        quizscoresSet {
          QuizScoresID
          StudentID
          QuizID
          Score
        }
      }
    }
  }
`

class Classes extends Component {
  state = {}

  renderClassComponent = data => {
    const classSet = data.teacher[0].classSet
    return (
      <ViewQuizOrClass
        key={classSet.ClassID}
        maxWidth='100%'
        render={() => (
          <ClassList
            classSet={classSet}
          />
        )}
      />
    )
  }

  render () {
    return (
      <Styles>
        <Row>
          <Col
            className='text-center d-flex flex-column flex-wrap align-items-center px-4 mb-5'
          >
            <h1 className='mb-3'>Classes</h1>

            <NewClassCard />
          </Col>
        </Row>

        <Row className='h-100 m-0 px-3'>
          <Query query={GET_CLASSES_INFORMATION} variables={{ token: localStorage.getItem('token') }}>
            {({ loading, data, error }) => {
              if (loading) return <h1>Loading...</h1>
              if (error) return <h1>{error.message}</h1>

              if (data) {
                return (this.renderClassComponent(data))
              }
            }}
          </Query>
        </Row>
      </Styles>
    )
  }
}

export default Classes
