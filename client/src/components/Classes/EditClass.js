import React, { Component } from 'react'
// import gql from 'graphql-tag'
import StudentPanel from './CreateEditComponents/StudentPanel'
import ClassSettings from './CreateEditComponents/ClassSettings'
import QuizList from './CreateEditComponents/QuizList'
import PropTypes from 'prop-types'

// const GET_CLASS_NAMES = gql`
// query GetClassNames($encJwt: String!) {
//   classes(encJwt: $encJwt) {
//     ClassID
//     ClassName
//   }
// }`

class EditClass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      classItem: null
    }
  }

  componentDidMount = () => {
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
          <h1>Editing {ClassName}</h1>
          <ClassSettings classID={ClassID} className={ClassName} />
          <StudentPanel classID={ClassID} />
          <QuizList quizzes={quizSet} />
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

EditClass.propTypes = {
  location: PropTypes.object
}

export default EditClass
