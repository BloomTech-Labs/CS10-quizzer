import React, { Fragment } from 'react'
import QuizCard from './QuizCard'
import QuizSelector from './QuizSelector'
import { Query } from 'react-apollo'
import { string } from 'prop-types'
import gql from 'graphql-tag'

const GET_CLASS_QUIZZES = gql`
query GetClassQuizzes($ClassID: String!) {
  classQuizzes(ClassID: $ClassID) {
    QuizID
    QuizName
  }
  classStudents(ClassID: $ClassID) {
    StudentID
    StudentName
    StudentEmail
  }
}`

function QuizPanel (props) {
  const classID = props.classID

  return (
    <div>
      <h4>Quizzes</h4>
      <Query query={GET_CLASS_QUIZZES} variables={{ ClassID: classID }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return error.message
          if (data) {
            const quizzes = data.classQuizzes
            const students = data.classStudents

            if (quizzes.length > 0) {
              return (
                <Fragment>
                  {quizzes.map((quiz) => {
                    return (
                      <QuizCard
                        key={quiz.QuizID}
                        quizID={quiz.QuizID}
                        quizName={quiz.QuizName}
                        students={students}
                      />
                    )
                  })}
                </Fragment>
              )
            } else {
              return null
            }
          }
        }}
      </Query>
      <QuizSelector classID={classID} />
    </div>
  )
}

QuizPanel.propTypes = {
  classID: string
}

export default QuizPanel
