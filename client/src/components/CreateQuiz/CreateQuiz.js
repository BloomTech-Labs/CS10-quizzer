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
    choicesArr.push({ '1': '', '2': '', '3': ['', true], '4': ['', true] })
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

  // enableOrDisable = (event) => {
  //   const index = Number(event.target.name)

  // }

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
                  <input type='radio' />
                  <input className='question_choices' placeholder='Choice 1' type='text' />
                </div>
                <div>
                  <input type='radio' />
                  <input className='question_choices' placeholder='Choice 2' type='text' />
                </div>
                <div>
                  <input disabled={this.state.choices[index]['3'][1]} type='radio' />
                  <input className='question_choices' disabled={this.state.choices[index]['3'][1]} placeholder='Choice 3' type='text' />
                  <Button name={index} id='3' className='enable_answer' onClick={this.enableOrDisable}>Enable Answer</Button>
                </div>
                <div>
                  <input disabled={this.state.choices[index]['4'][1]} type='radio' />
                  <input className='question_choices' disabled={this.state.choices[index]['4'][1]} placeholder='Choice 4' type='text' />
                  <Button name={index} id='4' className='enable_answer' onClick={this.enableOrDisable}>Enable Answer</Button>
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
