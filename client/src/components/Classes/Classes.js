import React, { Component } from 'react'
import { Query } from 'react-apollo'
import ClassCard from './ClassCard'
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
          QuizID
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
            const classSet = data.teacher[0].classSet
            console.log(classSet)

            return (
              <ul>
                {classSet.length > 0
                  ? classSet.map((classItem, index) => {
                    return (
                      <ClassCard
                        key={index}
                        classItem={classItem} />
                    )
                  })
                  : null}
                <NewClassCard />
              </ul>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Classes
