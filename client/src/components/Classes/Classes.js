import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'

import ViewQuizOrClass from '../ViewQuizOrClass/ViewQuizOrClass'
import ClassList from './ClassList'

import './Classes.css'

const getClasses = gql`
{
  teacher(encJwt: "${localStorage.getItem('token')}") {
    classSet {
      ClassID
      ClassName
    }
  }
}
`

class Classes extends Component {
  state = {}

  renderClassComponent = data => {
    const { classSet } = data.teacher[0]

    return classSet.map(val => {
      const { ClassName, ClassID } = val

      return (
        <ViewQuizOrClass
          key={ClassID}
          render={() => (
            <ClassList
              ClassName={ClassName}
              ClassID={ClassID}
            />
          )}
        />
      )
    })
  }

  render () {
    return (
      <div className='quizzes_container'>
        <span>Add a new Quiz</span>

        <Query query={getClasses}>
          {({ loading, data, err }) => {
            if (loading) return <h1>Loading...</h1>
            if (err) return <h1>GraphQL ERR</h1>

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
