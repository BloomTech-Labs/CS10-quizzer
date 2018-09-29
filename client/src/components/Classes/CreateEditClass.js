import React, { Component } from 'react'
import AddStudents from './CreateEditComponents/AddStudents'
import ClassSettings from './CreateEditComponents/ClassSettings'
import QuizList from './CreateEditComponents/QuizList'
import StudentList from './CreateEditComponents/StudentList'
import PropTypes from 'prop-types'

class CreateEditClass extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    if (this.props.location.state) {
      this.setState({
        classItem: this.props.location.state.classItem
      })
    }
  }

  render () {
    if (this.state.classItem) {
      const { ClassName, quizSet, studentSet } = this.state.classItem

      return (
        <div>
          <h1>{ClassName ? `Editing ${ClassName}` : ' Creating New Class'}</h1>
          <AddStudents />
          <ClassSettings className={ClassName} />
          <StudentList students={studentSet} />
          <QuizList quizzes={quizSet} />
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

CreateEditClass.propTypes = {
  location: PropTypes.object
}

export default CreateEditClass
