import React, { Component } from 'react'
import AddStudents from './CreateEditComponents/AddStudents'
import ClassSettings from './CreateEditComponents/ClassSettings'
import QuizList from './CreateEditComponents/QuizList'
import StudentList from './CreateEditComponents/StudentList'

class CreateEditClass extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div>
        <AddStudents />
        <ClassSettings />
        <StudentList />
        <QuizList />
      </div>
    )
  }
}

export default CreateEditClass
