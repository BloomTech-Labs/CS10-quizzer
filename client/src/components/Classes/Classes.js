import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
import ViewQuizOrClass from '../ViewQuizOrClass/ViewQuizOrClass'
import ClassList from './ClassList'
import './Classes.css'

const GET_CLASSES_INFORMATION = gql`
  query getClasses($token: String!) {
    teacher(encJwt: $token) {
      classSet {
        ClassID
        ClassName
        studentSet {
          StudentID
          StudentName
          StudentEmail
        }
        quizSet {
          QuizID
          QuizName
        }
      }
    }
  }`

class Classes extends Component {
  state = {}

  renderClassComponent = data => {
    const classSet = data.teacher[0].classSet
    return (
      <ViewQuizOrClass
        key={classSet.ClassID}
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
      <div className='quizzes_container'>
        <span>Add a new Class</span>

        <Query query={GET_CLASSES_INFORMATION} variables={{ token: localStorage.getItem('token') }}>
          {({ loading, data, error }) => {
            if (loading) return <h1>Loading...</h1>
            if (error) return <h1>{error.message}</h1>

            if (data) {
              return this.renderClassComponent(data)
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

export default Classes
