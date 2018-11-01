import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import { CREATE_QUIZ, CREATE_QUESTION, CREATE_CHOICE } from '../Mutations'
import CreateQuestions from '../CreateQuestion/CreateQuestion'
import ModalMessage from '../Modals/ModalMessage'

import './CreateQuiz.css'

import {
  CreateQuizContainer,
  Header,
  CheckList,
  CheckListItem,
  CreateQuizForm,
  CreateQuizName,
  CreateQuizBtns
} from './styled'

class CreateQuiz extends Component {
  constructor () {
    super()
    this.state = {
      answerList: [],
      choices: [],
      choicesCount: 0,
      modalOpen: false,
      modalLoading: false,
      modalSuccess: false,
      modalText: '',
      modalTitle: '',
      questions: [],
      quizName: '',
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

  addQuestion = () => {
    const choicesArr = [...this.state.choices]
    const list = [...this.state.answerList]
    const questionsArr = [...this.state.questions]

    choicesArr.push([
      ['', false, false],
      ['', false, false],
      ['', false, true],
      ['', false, true]
    ])

    list.push(null)
    questionsArr.push('')

    this.setState({
      answerList: list,
      choices: choicesArr,
      choicesCount: this.state.choicesCount + 2,
      questions: questionsArr
    })
  }

  questionChange = (event) => {
    const index = Number(event.target.name)
    const questionsArr = [...this.state.questions]

    questionsArr[index] = event.target.value

    this.setState({
      questions: questionsArr
    })
  }

  deleteQuestion = (event) => {
    const choicesArr = [...this.state.choices]
    let count = 0
    const index = Number(event.target.name)
    const list = [...this.state.answerList]
    const questionsArr = [...this.state.questions]
    choicesArr[index].forEach(choice => {
      if (choice[2] === false) {
        count++
      }
    })

    questionsArr.splice(index, 1)
    choicesArr.splice(index, 1)
    list.splice(index, 1)

    this.setState({
      answerList: list,
      choices: choicesArr,
      choicesCount: this.state.choicesCount - count,
      questions: questionsArr
    })
  }

  choiceChange = (event) => {
    const choice = Number(event.target.id)
    const choicesArr = [...this.state.choices]
    const index = Number(event.target.name)

    choicesArr[index][choice][0] = event.target.value
    this.setState({
      choices: choicesArr
    })
  }

  choiceCheck = (event) => {
    const choice = Number(event.target.id)
    const choicesArr = [...this.state.choices]
    const list = [...this.state.answerList]
    const index = Number(event.target.name)

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
      answerList: list,
      choices: choicesArr
    })
  }

  enableOrDisable = (event) => {
    const choice = Number(event.target.id)
    const choicesArr = [...this.state.choices]
    let count = this.state.choicesCount
    const index = Number(event.target.name)
    const list = [...this.state.answerList]

    if (choicesArr[index][choice][1] === true) {
      list[index] = null
    } else if (choicesArr[index][choice][2] === false) {
      count--
    } else if (choicesArr[index][choice][2] === true) {
      count++
    }

    choicesArr[index][choice][1] = false
    choicesArr[index][choice][2] = !choicesArr[index][choice][2]

    this.setState({
      choices: choicesArr,
      answersList: list,
      choicesCount: count
    })
  }

  toggleModalMessage = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  redirect = () => {
    this.setState({
      redirect: true
    })
  }

  render () {
    return (
      <CreateQuizContainer>
        <Header>To create a quiz you must</Header>

        <CheckList>
          <CheckListItem>Provide a Quiz Name</CheckListItem>
          <CheckListItem>Add at least one question</CheckListItem>
          <CheckListItem>Add at least two answer choices per question</CheckListItem>
        </CheckList>

        <Mutation mutation={CREATE_QUIZ}>
          {(createNewQuiz) => (
            <Mutation mutation={CREATE_QUESTION}>
              {(createNewQuestion) => (
                <Mutation mutation={CREATE_CHOICE}>
                  {(createNewChoice) => (
                    <CreateQuizForm onSubmit={event => {
                      event.preventDefault()
                      if (this.state.questions.length === 0) {
                        this.setState({
                          modalOpen: true,
                          modalText: 'To create a quiz, you must add at least one question.',
                          modalTitle: 'Information'
                        })
                        return
                      } else if (this.state.answerList.indexOf(null) > -1) {
                        this.setState({
                          modalOpen: true,
                          modalTitle: 'Information',
                          modalText: 'To create a quiz, you must choose an answer for each question you add.'
                        })
                        return
                      } else {
                        this.setState({
                          modalOpen: true,
                          modalText: 'The quiz is being saved. Please wait...',
                          modalTitle: 'Information',
                          modalLoading: true
                        })
                      }
                      const createdQuiz = createNewQuiz({
                        variables:
                          {
                            encJWT: this.state.token,
                            Public: false,
                            QuizName: this.state.quizName
                          },
                        refetchrefetchQueries: ['getCurrentInformation']
                      })
                      createdQuiz
                        .then(data => {
                          const quizId = data.data.createQuiz.quiz.QuizID
                          this.state.questions.forEach((question, index) => {
                            const createdQuestion = createNewQuestion({
                              variables: {
                                encJWT: this.state.token,
                                isMajor: false,
                                QuizID: quizId,
                                QuestionText: question
                              },
                              refetchQueries: ['getCurrentInformation']
                            })
                            createdQuestion
                              .then(data => {
                                const questionId = data.data.createQuestion.question.QuestionID
                                this.state.choices[index].forEach(choice => {
                                  if (choice[2] === false) {
                                    const createdChoice = createNewChoice({
                                      variables: {
                                        ChoiceText: choice[0],
                                        status: false,
                                        encJWT: this.state.token,
                                        isCorrect: choice[1],
                                        QuestionID: questionId
                                      },
                                      refetchQueries: ['getCurrentInformation']
                                    })
                                    createdChoice
                                      .then(() => {
                                        this.setState({
                                          choicesCount: this.state.choicesCount - 1
                                        })
                                        if (this.state.choicesCount === 0) {
                                          this.setState({
                                            answerList: [],
                                            choices: [],
                                            choicesCount: 0,
                                            modalOpen: true,
                                            modalText: 'You have successfully created a quiz. Do you want to go to the quizzes page?',
                                            modalTitle: 'Success',
                                            modalSuccess: true,
                                            questions: [],
                                            quizName: ''
                                          })
                                        }
                                      })
                                      .catch(() => {
                                        this.setState({
                                          modalOpen: true,
                                          modalText: 'An error occurred while creating the quiz.',
                                          modalTitle: 'Error'
                                        })
                                      })
                                  }
                                })
                              })
                              .catch(() => {
                                this.setState({
                                  modalOpen: true,
                                  modalText: 'An error occurred while creating the quiz.',
                                  modalTitle: 'Error'
                                })
                              })
                          })
                        })
                        .catch(() => {
                          this.setState({
                            modalOpen: true,
                            modalText: 'An error occurred while creating the quiz.',
                            modalTitle: 'Error'
                          })
                        })
                    }}>
                      <CreateQuizName
                        name='quizName'
                        onChange={this.handleOnChange}
                        placeholder='Quiz Name'
                        required
                        type='text'
                        value={this.state.quizName}
                      />

                      <CreateQuestions
                        state={this.state}
                        questionChange={this.questionChange}
                        choiceCheck={this.choiceCheck}
                        choiceChange={this.choiceChange}
                        deleteQuestion={this.deleteQuestion}
                        enableOrDisable={this.enableOrDisable}
                      />

                      <CreateQuizBtns
                        color='secondary'
                        onClick={this.addQuestion}
                      >Add Question
                      </CreateQuizBtns>

                      <CreateQuizBtns
                        color='info'
                      >Create Quiz
                      </CreateQuizBtns>
                    </CreateQuizForm>
                  )}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
        <ModalMessage
          modalOpen={this.state.modalOpen}
          modalTitle={this.state.modalTitle}
          modalText={this.state.modalText}
          modalLoading={this.state.modalLoading}
          modalSuccess={this.state.modalSuccess}
          modalFuncOne={this.redirect}
          modalFuncTwo={this.toggleModalMessage}
        />
        {this.state.redirect ? <Redirect to='/rocket/quizzes' /> : null}
      </CreateQuizContainer>
    )
  }
}

export default CreateQuiz
