import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import './Quizzes.css'

class Quizzes extends Component {
  constructor () {
    super()
    this.state = {
      redirect: false
    }
  }

  createQuiz = () => {
    this.setState({
      redirect: true
    })
  }

  render () {
    return (
      <div className='quizzes_container'>
        <span>Add a new Quiz</span>
        <Button color='warning' className='add_quiz_button' onClick={this.createQuiz}>
          <span role='img' aria-labelledby='Plus Symbol'>&#x2795;</span>
        </Button>
        {this.state.redirect ? <Redirect from='/rocket/quizzes' to='/rocket/quizzes/createquiz' /> : null}
      </div>
    )
  }
}

export default Quizzes
