import React from 'react'
import { Button } from 'reactstrap'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { string, array } from 'prop-types'

import styled from 'styled-components'

const QuizCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CompletedStyled = styled.p`
  text-align: center;
`

const QUIZ_COMPLETION_QUERY = gql`
query QuizCompletionQuery($QuizID: String!) {
  quizScores(QuizID: $QuizID) {
    Score
  }
}`

const sendGridURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/sendgrid/' : '/sendgrid/'

const sendEmail = async (event, postData) => {
  event.preventDefault()
  try {
    const res = await window.fetch(sendGridURL, {
      method: 'POST',
      body: JSON.stringify(postData)
    })
    if (res) console.log(res)
  } catch (err) {
    return console.error(err)
  }
}

function QuizCard (props) {
  const { classID, className, teacherName, teacherEmail, quizID, quizName, students } = props
  const studentArray = []

  students.forEach(student => {
    studentArray.push({
      id: student.StudentID,
      name: student.StudentName,
      email: student.StudentEmail
    })
  })

  const postData = {
    teacherName,
    teacherEmail,
    className,
    classID,
    students: studentArray,
    quizName,
    quizID
  }

  return (
    <QuizCardStyled className='edit_class__quiz_card'>
      <h4>{quizName}</h4>

      <Query query={QUIZ_COMPLETION_QUERY} variables={{ QuizID: quizID }}>
        {({ loading, error, data }) => {
          if (loading) return <span>Loading...</span>

          if (error) return <span>{error.message}</span>

          if (data.quizScores) {
            let completedCount = 0

            data.quizScores.forEach(value => {
              if (value.Score > 0) completedCount++
            })

            return (
              <div>
                <CompletedStyled className='edit_class__quiz_card__completed_text'>
                  Completed: {completedCount} / {studentArray.length}
                </CompletedStyled>

                <Button onClick={event => sendEmail(event, postData)}>Email to Students</Button>
              </div>
            )
          }
        }}
      </Query>
    </QuizCardStyled>
  )
}

QuizCard.propTypes = {
  classID: string,
  className: string,
  teacherName: string,
  teacherEmail: string,
  quizID: string,
  quizName: string,
  students: array
}

export default QuizCard
