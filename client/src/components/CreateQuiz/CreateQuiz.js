import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Button } from 'reactstrap'
import './CreateQuiz.css'

// Create Quiz Mutation
const CREATE_QUIZ = gql`
  mutation CreateQuiz($Public: Boolean!, $QuizName: String!, $encJWT: String!) {
    createQuiz(Public: $Public, QuizName: $QuizName, encJWT: $encJWT) {
      quiz {
        QuizID
      }
    }
  }
`

// Create Question Mutation
const CREATE_QUESTION = gql`
  mutation CreateQuestion($QuestionText: String!, $QuizID: String!, $encJWT:String!, $isMajor: Boolean!) {
    createQuestion(QuestionText: $QuestionText, QuizID: $QuizID, encJWT: $encJWT, isMajor: $isMajor) {
      question {
        QuestionID
      }
    }
  }
`

// Create Choice Mutation
const CREATE_CHOICE = gql`
  mutation CreateChoice($ChoiceText: String!, $QuestionID: String!, $encJWT: String!, $isCorrect: Boolean!) {
    createChoice(ChoiceText: $ChoiceText, QuestionID: $QuestionID, encJWT: $encJWT, isCorrect: $isCorrect) {
      choice {
        ChoiceID
      }
    }
  }
`

class CreateQuiz extends Component {
  constructor () {
    super()
    this.state = {
      quizName: '',
      questions: [],
      choices: [],
      answerList: [],
      createQuizModal: false,
      modalText: '',
      token: '',
      redirect: false
    }
  }

  componentDidMount () {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // This method adds a new question to this.state.questions array,
  // add choices to this.state.choices array for that question, and
  // adds a null value in this.state.answerList for that question since no answers have been chosen yet
  addQuestion = () => {
    const questionsArr = Object.assign([], this.state.questions)
    const choicesArr = Object.assign([], this.state.choices)
    const list = Object.assign([], this.state.answerList)
    questionsArr.push('')
    choicesArr.push([
      ['', false, false],
      ['', false, false],
      ['', false, true],
      ['', false, true]
    ])
    list.push(null)
    this.setState({
      questions: questionsArr,
      choices: choicesArr,
      answerList: list
    })
  }

  // This method changes the text value of the question while the user is typing
  questionChange = (event) => {
    const questionsArr = Object.assign([], this.state.questions)
    const index = Number(event.target.name)
    questionsArr[index] = event.target.value
    this.setState({
      questions: questionsArr
    })
  }

  // This method deletes the question from this.state.questions,
  // deletes the question choices from this.state.choices, and
  // deletes the value associated to the question in this.state.answerList
  deleteQuestion = (event) => {
    const questionsArr = Object.assign([], this.state.questions)
    const choicesArr = Object.assign([], this.state.choices)
    const list = Object.assign([], this.state.answerList)
    const index = Number(event.target.name)
    questionsArr.splice(index, 1)
    choicesArr.splice(index, 1)
    list.splice(index, 1)
    this.setState({
      questions: questionsArr,
      choices: choicesArr,
      answerList: list
    })
  }

  // This method changes the text value for the choice while the user is typing
  choiceChange = (event) => {
    const choicesArr = Object.assign([], this.state.choices)
    const index = Number(event.target.name)
    const choice = Number(event.target.id)
    choicesArr[index][choice][0] = event.target.value
    this.setState({
      choices: choicesArr
    })
  }

  // This method changes the check value for a choice from false to true when clicked on
  // and it changes the other check values in a choice set to false
  check = (event) => {
    const choicesArr = Object.assign([], this.state.choices)
    const list = Object.assign([], this.state.answerList)
    const index = Number(event.target.name)
    const choice = Number(event.target.id)

    if (choicesArr[index][choice][1] === false) {
      choicesArr[index][choice][1] = true
      list[index] = choice

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
      choices: choicesArr,
      answerList: list
    })
  }

  // This method enables or disables the 3rd or 4th  question in a choice set
  enableOrDisable = (event) => {
    const choicesArr = Object.assign([], this.state.choices)
    const list = Object.assign([], this.state.answerList)
    const index = Number(event.target.name)
    const choice = Number(event.target.attributes.choice.nodeValue)
    if (choicesArr[index][choice][1] === true) {
      list[index] = null
    }
    choicesArr[index][choice][1] = false
    choicesArr[index][choice][2] = !choicesArr[index][choice][2]
    this.setState({
      choices: choicesArr,
      answersList: list
    })
  }

  render () {
    return (
      <div className='create_quiz_container'>
        <h4 className='create_quiz_instructions'>
        To create a quiz, you must provide a quiz name, quiz content and add at least one question. You must also add atleast two answer
        choices per question, but you are limited to four answer choices.</h4>
        <Mutation mutation={CREATE_QUIZ}>
          {(createNewQuiz, { loading: loadingQuiz }) => (
            <Mutation mutation={CREATE_QUESTION}>
              {(createNewQuestion, { loading: loadingQuestion }) => (
                <Mutation mutation={CREATE_CHOICE}>
                  {(createNewChoice, { loading: loadingChoice }) => (
                    <form className='create_quiz_form' onSubmit={event => {
                      event.preventDefault()
                      if (this.state.questions.length === 0) {
                        console.log('You need questions!')
                        this.setState({
                          createQuizModal: true,
                          modalText: 'To create a quiz, you must add at least one question.'
                        })
                        return
                      } else if (this.state.answerList.indexOf(null) > -1) {
                        console.log('You need answers!')
                        this.setState({
                          createQuizModal: true,
                          modalText: 'To create a quiz, you must choose an answer for each question you add.'
                        })
                        return
                      }
                      const createdQuiz = createNewQuiz({
                        variables:
                          {
                            Public: false,
                            QuizName: this.state.quizName,
                            encJWT: this.state.token
                          }
                      })
                      createdQuiz
                        .then(data => {
                          const quizId = data.data.createQuiz.quiz.QuizID
                          this.state.questions.forEach((question, index) => {
                            const createdQuestion = createNewQuestion({
                              variables: {
                                QuestionText: question,
                                QuizID: quizId,
                                encJWT: this.state.token,
                                isMajor: false
                              }
                            })
                            createdQuestion
                              .then(data => {
                                const questionId = data.data.createQuestion.question.QuestionID
                                this.state.choices[index].forEach(choice => {
                                  if (choice[2] === false) {
                                    const createdChoice = createNewChoice({
                                      variables: {
                                        ChoiceText: choice[0],
                                        QuestionID: questionId,
                                        encJWT: this.state.token,
                                        isCorrect: choice[1]
                                      }
                                    })
                                    createdChoice
                                      .then(() => {
                                        console.log('Successfully created choice!')
                                      })
                                      .catch(() => {
                                        this.setState({
                                          createQuizModal: true,
                                          modalText: 'An error occurred while creating the quiz.'
                                        })
                                      })
                                  }
                                })
                              })
                              .catch(() => {
                                this.setState({
                                  createQuizModal: true,
                                  modalText: 'An error occurred while creating the quiz.'
                                })
                              })
                          })
                          if (!loadingQuiz && !loadingQuestion && !loadingChoice) {
                            this.setState({
                              redirect: true
                            })
                          }
                        })
                        .catch(() => {
                          this.setState({
                            createQuizModal: true,
                            modalText: 'An error occurred while creating the quiz.'
                          })
                        })
                    }}>
                      <input className='create_quiz_name' name='quizName' onChange={this.handleOnChange} placeholder='Name' type='text' required />
                      {this.state.questions.map((question, index) => {
                        return (
                          <div key={index}>
                            <textarea cols='50' className='question' name={index} placeholder={`Question ${index + 1}`} onChange={this.questionChange} rows='5' required value={question} />
                            <fieldset className='question_fieldset'>
                              <div>
                                <input checked={this.state.choices[index][0][1]} name={index} id='0' onChange={this.check} required type='radio' />
                                <input className='question_choices' name={index} placeholder='Choice 1' onChange={this.choiceChange} required type='text' />
                              </div>
                              <div>
                                <input checked={this.state.choices[index][1][1]} name={index} id='1' onChange={this.check} required type='radio' />
                                <input className='question_choices' name={index} placeholder='Choice 2' onChange={this.choiceChange} required type='text' />
                              </div>
                              <div>
                                <input checked={this.state.choices[index][2][1]} disabled={this.state.choices[index][2][2]} id='2' name={index} onChange={this.check} type='radio' />
                                <input className='question_choices' disabled={this.state.choices[index][2][2]} placeholder='Choice 3' onChange={this.choiceChange} required type='text' />
                                {this.state.choices[index][2][2]
                                  ? <Button choice='2' className='enable_disable_choice' name={index} onClick={this.enableOrDisable}>Enable Choice</Button>
                                  : <Button choice='2' color='info' className='enable_disable_choice' name={index} onClick={this.enableOrDisable}>Disable Choice</Button>}           </div>
                              <div>
                                <input checked={this.state.choices[index][3][1]} disabled={this.state.choices[index][3][2]} id='3' name={index} onChange={this.check} type='radio' />
                                <input className='question_choices' disabled={this.state.choices[index][3][2]} placeholder='Choice 4' onChange={this.choiceChange} required type='text' />
                                {this.state.choices[index][3][2]
                                  ? <Button choice='3' name={index} className='enable_disable_choice' onClick={this.enableOrDisable}>Enable Choice</Button>
                                  : <Button choice='3' color='info' className='enable_disable_choice' name={index} onClick={this.enableOrDisable}>Disable Choice</Button>}
                              </div>
                            </fieldset>
                            <Button color='danger' className='delete_question' name={index} onClick={this.deleteQuestion} type='button'>Delete Question</Button>
                          </div>
                        )
                      })}
                      <Button color='seconday' className='create_quiz_container_button' onClick={this.addQuestion}>Add Question</Button>
                      <Button color='info' className='create_quiz_container_button'>Create Quiz</Button>
                    </form>
                  )}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
        {this.state.redirect ? <Redirect to='/rocket/quizzes' /> : null}
      </div>
    )
  }
}

export default CreateQuiz
