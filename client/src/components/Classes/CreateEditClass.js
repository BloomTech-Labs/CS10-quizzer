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
    // if (this.state.classItem) console.log(this.state.classItem)
    return (
      <div>
        <h1>{this.state.classItem ? `Editing ${this.state.classItem.ClassName}` : ' Creating New Class'}</h1>
        <AddStudents />
        <ClassSettings />
        <StudentList />
        <QuizList />
      </div>
    )
  }
}

CreateEditClass.propTypes = {
  location: PropTypes.object
}

export default CreateEditClass
