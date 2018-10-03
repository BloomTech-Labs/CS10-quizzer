import React, { Component } from 'react'

import QuestionBody from './QuestionBody'
import QuestionTitle from './QuestionTitle'

class Questions extends Component {
  state = {}

  render () {
    return (
      <div>
        <QuestionTitle
          title={this.props.quiz.questionSet[ this.props.page ].Question}
        />

        <QuestionBody
          choiceSet={this.props.quiz.questionSet[ this.props.page ].choiceSet}
          page={this.props.page}
          setIsAnswerCorrect={this.props.setIsAnswerCorrect}
        />
      </div>
    )
  }
}

export default Questions
