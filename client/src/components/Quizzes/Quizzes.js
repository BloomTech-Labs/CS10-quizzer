import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Quizzes.css'
const quizzesTest = require('./quizzesTest.json')

class Quizzes extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  componentDidMount () {
    const quizzes = quizzesTest.quizzes
    console.log('Quizzes', quizzes)
  }

  render () {
    return (
      <div>
        <Link>Add a Quiz</Link>
      </div>
    )
  }
}

export default Quizzes
