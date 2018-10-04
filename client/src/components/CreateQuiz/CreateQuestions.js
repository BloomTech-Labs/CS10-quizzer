import React, { Component } from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import CreateChoices from './CreateChoices'
import './CreateQuiz.css'

class CreateQuestions extends Component {
  render () {
    const { questions, choices } = this.props.state
    return (
      questions.map((question, index) => {
        return (
          <div key={index}>
            <textarea cols='50' className='question' name={index} placeholder={`Question ${index + 1}`} onChange={this.props.questionChange} rows='5' required value={question} />
            <fieldset className='question_fieldset'>
              <div>
                <input checked={choices[index][0][1]} name={index} id='0' onChange={this.props.check} required type='radio' />
                <input className='question_choices' id='0' name={index} placeholder='Choice 1' onChange={this.props.choiceChange} required type='text' value={choices[index][0][0]} />
              </div>
              <div>
                <input checked={choices[index][1][1]} name={index} id='1' onChange={this.props.check} required type='radio' />
                <input className='question_choices' id='1' name={index} placeholder='Choice 2' onChange={this.props.choiceChange} required type='text' value={choices[index][1][0]} />
              </div>
              <div>
                <input checked={choices[index][2][1]} disabled={choices[index][2][2]} id='2' name={index} onChange={this.props.check} type='radio' />
                <input className='question_choices' disabled={choices[index][2][2]} id='2' placeholder='Choice 3' onChange={this.props.choiceChange} required type='text' value={choices[index][2][0]} />
                <CreateChoices choice='2' choices={choices} index={index} enableOrDisable={this.props.enableOrDisable} />
              </div>
              <div>
                <input checked={choices[index][3][1]} disabled={choices[index][3][2]} id='3' name={index} onChange={this.props.check} type='radio' />
                <input className='question_choices' disabled={choices[index][3][2]} id='3' placeholder='Choice 4' onChange={this.props.choiceChange} required type='text' value={choices[index][3][0]} />
                <CreateChoices choice='3' choices={choices} index={index} enableOrDisable={this.props.enableOrDisable} />
              </div>
            </fieldset>
            <Button color='danger' className='delete_question' name={index} onClick={this.props.deleteQuestion} type='button'>Delete Question</Button>
          </div>
        )
      })
    )
  }
}

CreateQuestions.propTypes = {
  state: PropTypes.object,
  questionChange: PropTypes.func,
  check: PropTypes.func,
  choiceChange: PropTypes.func,
  deleteQuestion: PropTypes.func,
  enableOrDisable: PropTypes.func
}

export default CreateQuestions
