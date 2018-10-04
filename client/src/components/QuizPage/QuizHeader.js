import React from 'react'
import { number, object } from 'prop-types'

const QuizHeader = ({ classroom, page, questionSetLength, student }) => {
  return (
    <React.Fragment>
      <h1>{ classroom.ClassName } - { student.StudentName }</h1>
      <p>{ page + 1 } of { questionSetLength }</p>
    </React.Fragment>
  )
}

QuizHeader.propTypes = {
  classroom: object.isRequired,
  page: number.isRequired,
  questionSetLength: number.isRequired,
  student: object.isRequired
}

export default QuizHeader
