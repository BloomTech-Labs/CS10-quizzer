import React, { Component } from 'react'
import { Query } from 'react-apollo'
import NewClassCard from './NewClassCard'
import gql from 'graphql-tag'
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
          QuizName
        }
      }
    }
  }`

class Classes extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div>
        <h1>Add Classes</h1>
        <Query query={GET_CLASSES_INFORMATION} variables={{ token: localStorage.getItem('token') }}>
          {({ loading, error, data }) => {
            if (loading) return 'Getting your classes...'
            if (error) return `Error: ${error.message}`

            return (
              <NewClassCard />
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Classes
