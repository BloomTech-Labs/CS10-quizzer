import React, { Component } from 'react'
import AddStudents from './CreateEditComponents/AddStudents'
import ClassSettings from './CreateEditComponents/ClassSettings'
import QuizList from './CreateEditComponents/QuizList'
import StudentList from './CreateEditComponents/StudentList'
import PropTypes from 'prop-types'

class CreateEditClass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    this.setState({ [event.target.name]: event.target.value })
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
      const { ClassID, ClassName, quizSet, studentSet } = this.state.classItem

      return (
        <div>
          <h1>{ClassName ? `Editing ${ClassName}` : ' Creating New Class'}</h1>
          <AddStudents classID={ClassID} name={this.state.name} email={this.state.email} handleInputChange={this.handleInputChange} />
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
