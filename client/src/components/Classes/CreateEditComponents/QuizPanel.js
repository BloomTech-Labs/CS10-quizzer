import React, { Fragment } from 'react'
import QuizCard from './QuizCard'
import QuizSelector from './QuizSelector'
import { Query } from 'react-apollo'
import { string } from 'prop-types'
import gql from 'graphql-tag'

const GET_CLASS_QUIZZES = gql`
query GetClassQuizzes($ClassID: String!, $encJWT: String!) {
  classQuizzes(ClassID: $ClassID) {
    QuizID
    QuizName
  }
  classStudents(ClassID: $ClassID) {
    StudentID
    StudentName
    StudentEmail
  }
  teacher(encJwt: $encJWT) {
    TeacherName
    TeacherEmail
  }
}`

function QuizPanel (props) {
  const { classID, className } = props

  return (
    <div>
      <h4>Quizzes</h4>
      <Query query={GET_CLASS_QUIZZES} variables={{ ClassID: classID, encJWT: localStorage.getItem('token') }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return error.message
          if (data && data.classQuizzes && data.classStudents && data.teacher) {
            const quizzes = data.classQuizzes
            const students = data.classStudents
            const teacherName = data.teacher[0].TeacherName
            const teacherEmail = data.teacher[0].TeacherEmail

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
                        teacherName={teacherName}
                        teacherEmail={teacherEmail}
                        className={className}
                        classID={classID}
                      />
                    )
                  })}
                </Fragment>
              )
            } else {
              return null
            }
          }
          return <span>Something broke!</span>
        }}
      </Query>
      <QuizSelector classID={classID} />
    </div>
  )
}

QuizPanel.propTypes = {
  classID: string,
  className: string
}

export default QuizPanel
