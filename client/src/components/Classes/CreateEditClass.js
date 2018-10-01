import React, { Component } from 'react'
import StudentPanel from './CreateEditComponents/StudentPanel'
import ClassSettings from './CreateEditComponents/ClassSettings'
import QuizList from './CreateEditComponents/QuizList'
import PropTypes from 'prop-types'

class CreateEditClass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: ''
    }
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
      const { ClassID, ClassName, quizSet } = this.state.classItem

      return (
        <div>
          <h1>{ClassName ? `Editing ${ClassName}` : ' Creating New Class'}</h1>
          <ClassSettings className={ClassName} />
          <StudentPanel classID={ClassID} />
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
