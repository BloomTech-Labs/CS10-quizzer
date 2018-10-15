import React, { Fragment } from 'react'
import QuizCard from './QuizCard'
import QuizSelector from './QuizSelector'
import { Query } from 'react-apollo'
import { string } from 'prop-types'
import gql from 'graphql-tag'

import styled from 'styled-components'

const QuizSectionHeaderStyled = styled.h4`
  margin-bottom: 2rem;
`

const QuizListWrapper = styled.div`
  display: grid;
  grid-template: auto / 1fr
  grid-row-gap: 50px;
  margin-bottom: 2rem;

  @media (min-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 636px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

// const QuizListWrapper = styled.div`
//   display: grid;
//   grid-column-gap: 15px;
//   grid-template-columns: 100%;
//   grid-auto-rows: 50px;

//   @media (min-width: 420px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (min-width: 636px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `

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
      <QuizSectionHeaderStyled>
        Quizzes
      </QuizSectionHeaderStyled>

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
                <QuizListWrapper className='quiz_list_wrapper'>
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
                </QuizListWrapper>
              )
            }
          }
          return null
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
