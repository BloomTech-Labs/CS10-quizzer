import React from 'react'
import { Button } from 'reactstrap'
import { string, array } from 'prop-types'
import { apiURI } from '../../../index'

const sendEmail = async (event, postData) => {
  event.preventDefault()
  try {
    const res = await window.fetch(apiURI, {
      method: 'POST',
      body: JSON.stringify(postData)
    })
    if (res) console.log(res)
  } catch (err) {
    return console.error(err)
  }
}

function QuizCard (props) {
  const { className, teacher, quizID, quizName, students } = props
  const studentArray = []

  students.forEach(student => {
    studentArray.push({
      id: student.StudentID,
      name: student.StudentName,
      email: student.StudentEmail
    })
  })

  const postData = {
    teacherName: teacher,
    className: className,
    students: studentArray,
    quizName: quizName,
    quizID: quizID
  }
  console.log(postData)
  return (
    <div>
      <h4>{quizName}</h4>
      <p>Completed: Number</p>
      <Button onClick={event => sendEmail(event, postData)}>Email to Students</Button>
    </div>
  )
}

QuizCard.propTypes = {
  className: string,
  teacher: string,
  quizID: string,
  quizName: string,
  students: array
}

export default QuizCard
