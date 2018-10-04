import React from 'react'
import { Button } from 'reactstrap'
import { string, array } from 'prop-types'
import { apiURI } from '../../../index'

const postData = {
  'teacherName': 'Teacher Name',
  'className': 'Class Name',
  'students': [
    'student@fake_school.com'
  ],
  'quizName': 'Quiz Name',
  'quizLink': 'http://localhost:8000/rocket/quizzes/$23134dscsf'
}

const sendEmail = async () => {
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
  const { quizID, quizName, students } = props
  students.forEach(student => {
    console.log(student)
  })
  return (
    <div>
      <h4>{quizName}</h4>
      <p>Completed: Number</p>
      <Button onClick={sendEmail}>Email to Students</Button>
    </div>
  )
}

QuizCard.propTypes = {
  quizID: string,
  quizName: string,
  students: array
}

export default QuizCard
