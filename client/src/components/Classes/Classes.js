import React, { Component } from 'react'
import { Query } from 'react-apollo'
import ClassCard from './ClassCard'
import NewClassCard from './NewClassCard'
import gql from 'graphql-tag'
// import axios from 'axios'
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

// const testQuery = `
// query getClasses($token: String!) {
//   teacher(encJwt: $token) {
//     classSet {
//       ClassID
//       ClassName
//       studentSet {
//         StudentID
//         StudentName
//         StudentEmail
//       }
//       quizSet {
//         QuizID
//         QuizName
//       }
//     }
//   }
// }`

class Classes extends Component {
  constructor () {
    super()
    this.state = {}
  }

  // componentDidMount () {
  //   // window.fetch('http://localhost:8000/graphiql/', {
  //   //   method: 'POST',
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //     'Accept': 'application/json'
  //   //   },
  //   //   body: JSON.stringify({ query: testQuery, variables: { token: window.localStorage.getItem('token') } })
  //   // })
  //   //   .then(r => r.json())
  //   //   .then(data => this.setState({
  //   //     data
  //   //   })
  //   //   )
  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:8000/graphiql/',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     data: ({ query: testQuery, variables: { token: window.localStorage.getItem('token') } })
  //   }).then((response) => {
  //     this.setState({
  //       data: response.data
  //     })
  //     console.log(this.state)
  //   }).catch(err => console.log(err))
  // }

  render () {
    return (
      <div className='classes_container'>
        <h1>Add Classes</h1>
        <Query query={GET_CLASSES_INFORMATION} variables={{ token: localStorage.getItem('token') }}>
          {({ loading, error, data }) => {
            if (loading) return 'Getting your classes...'
            if (error) return `Error: ${error.message}`
            const classSet = data.teacher[0].classSet

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
