import React, { Component } from 'react'
import { Button } from 'reactstrap'
import './CreateQuiz.css'

class CreateQuiz extends Component {
  constructor () {
    super()
    this.state = {
      quizName: '',
      quizContent: '',
      questions: [],
      choices: []
    }
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addQuestion = () => {
    const questionsArr = Object.assign([], this.state.questions)
    const choicesArr = Object.assign([], this.state.choices)
    questionsArr.push('')
    choicesArr.push([
      ['', false],
      ['', false],
      ['', false, true],
      ['', false, true]
    ])
    this.setState({
      questions: questionsArr,
      choices: choicesArr
    })
  }

  questionChange = (event) => {
    const questionsArr = Object.assign([], this.state.questions)
    const index = Number(event.target.name)
    questionsArr[index] = event.target.value
    this.setState({
      questions: questionsArr
    })
  }

  deleteQuestion = (event) => {
    const questionsArr = Object.assign([], this.state.questions)
    const choicesArr = Object.assign([], this.state.choices)
    const index = Number(event.target.name)
    questionsArr.splice(index, 1)
    choicesArr.splice(index, 1)
    this.setState({
      questions: questionsArr,
      choices: choicesArr
    })
  }

  choiceChange = (event) => {
    const choicesArr = Object.assign([], this.state.choices)
    const index = Number(event.target.name)
    const choice = Number(event.target.id)
    choicesArr[index][choice][0] = event.target.value
    this.setState({
      choices: choicesArr
    })
  }

  check = (event) => {
    const choicesArr = Object.assign([], this.state.choices)
    const index = Number(event.target.name)
    const choice = Number(event.target.id)

    if (choicesArr[index][choice][1] === false) {
      choicesArr[index][choice][1] = true

      switch (choice) {
        case 0:
          choicesArr[index][1][1] = false
          choicesArr[index][2][1] = false
          choicesArr[index][3][1] = false
          break
        case 1:
          choicesArr[index][0][1] = false
          choicesArr[index][2][1] = false
          choicesArr[index][3][1] = false
          break
        case 2:
          choicesArr[index][0][1] = false
          choicesArr[index][1][1] = false
          choicesArr[index][3][1] = false
          break
        default:
          choicesArr[index][0][1] = false
          choicesArr[index][1][1] = false
          choicesArr[index][2][1] = false
          break
      }
    }

    this.setState({
      choices: choicesArr
    })
  }

  enableOrDisable = (event) => {
    const choicesArr = Object.assign([], this.state.choices)
    const index = Number(event.target.name)
    const choice = Number(event.target.attributes.choice.nodeValue)
    choicesArr[index][choice][1] = false
    choicesArr[index][choice][2] = !choicesArr[index][choice][2]
    this.setState({
      choices: choicesArr
    })
  }

  render () {
    return (
      <div className='create_quiz_container'>
        <h4 className='create_quiz_instructions'>
        To create a quiz, you must provide a quiz name, quiz content and add at least one question. You must also add atleast two answer
        choices per question, but you are limited to four answer choices.</h4>
        <input className='create_quiz_name' name='quizName' onChange={this.handleOnChange} placeholder='Name' type='text' required />
        <textarea cols='50' className='create_quiz_content' name='quizContent' onChange={this.handleOnChange} placeholder='Content' rows='5' required value={this.state.quizContent} />
        {this.state.questions.map((question, index) => {
          return (
            <div key={index}>
              <textarea cols='50' className='question' name={index} placeholder={`Question ${index + 1}`} onChange={this.questionChange} rows='5' required value={question} />
              <fieldset className='question_fieldset'>
                <div>
                  <input checked={this.state.choices[index][0][1]} name={index} id='0' onChange={this.check} type='radio' />
                  <input className='question_choices' name={index} placeholder='Choice 1' onChange={this.choiceChange} type='text' />
                </div>
                <div>
                  <input checked={this.state.choices[index][1][1]} name={index} id='1' onChange={this.check} type='radio' />
                  <input className='question_choices' name={index} placeholder='Choice 2' onChange={this.choiceChange} type='text' />
                </div>
                <div>
                  <input checked={this.state.choices[index][2][1]} disabled={this.state.choices[index][2][2]} id='2' name={index} onChange={this.check} type='radio' />
                  <input className='question_choices' disabled={this.state.choices[index][2][2]} placeholder='Choice 3' onChange={this.choiceChange} type='text' />
                  {this.state.choices[index][2][2]
                    ? <Button choice='2' className='enable_disable_choice' name={index} onClick={this.enableOrDisable}>Enable Choice</Button>
                    : <Button choice='2' color='info' className='enable_disable_choice' name={index} onClick={this.enableOrDisable}>Disable Choice</Button>}           </div>
                <div>
                  <input checked={this.state.choices[index][3][1]} disabled={this.state.choices[index][3][2]} id='3' name={index} onChange={this.check} type='radio' />
                  <input className='question_choices' disabled={this.state.choices[index][3][2]} placeholder='Choice 4' onChange={this.choiceChange} type='text' />
                  {this.state.choices[index][3][2]
                    ? <Button choice='3' name={index} className='enable_disable_choice' onClick={this.enableOrDisable}>Enable Choice</Button>
                    : <Button choice='3' color='info' className='enable_disable_choice' name={index} onClick={this.enableOrDisable}>Disable Choice</Button>}
                </div>
              </fieldset>
              <Button color='danger' className='delete_question' name={index} onClick={this.deleteQuestion}>Delete Question</Button>
            </div>
          )
        })}
        <Button color='seconday' className='create_quiz_container_button' onClick={this.addQuestion}>Add Question</Button>
        <Button color='info' className='create_quiz_container_button'>Create Quiz</Button>
      </div>
    )
  }
}

export default CreateQuiz
