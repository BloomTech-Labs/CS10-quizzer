import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'
import { client } from '../../index'

import EditQuestion from '../EditQuestion/EditQuestion'
import { GET_QUIZ_INFORMATION } from '../Queries'
import {
  CREATE_QUESTION,
  CREATE_CHOICE,
  UPDATE_QUIZ,
  UPDATE_QUESTION,
  UPDATE_CHOICE,
  DELETE_QUIZ,
  DELETE_QUESTION,
  DELETE_CHOICE
} from '../Mutations'

import ModalMessage from '../Modals/ModalMessage'

import {
  EditQuizContainer,
  Header,
  CheckList,
  CheckListItem,
  EditQuizForm,
  EditQuizName,
  EditQuizBtns
} from './styled'

class EditQuiz extends Component {
  constructor () {
    super()
    this.state = {
      choiceCount: 0,
      deletedQuestions: [],
      modalLoading: false,
      modalOpen: false,
      modalSuccess: false,
      modalText: '',
      modalTitle: '',
      mutation: {},
      mutationType: '',
      questionCount: 0,
      quizData: {},
      quizId: '',
      token: '',
      redirect: false
    }
  }

  componentDidMount () {
    if (this.props.location.state) {
      this.setState({
        quizId: this.props.location.state,
        token: localStorage.getItem('token')
      })
    }
  }

  componentWillUnmount () {
    client.resetStore()
  }

  quizNameChange = (event) => {
    const obj = Object.assign({}, this.state.quizData)

    obj.QuizName = event.target.value

    this.setState({
      quizData: obj
    })
  }

  questionTextChange = (event) => {
    const obj = Object.assign({}, this.state.quizData)
    const index = event.target.name

    obj.questionSet[index].QuestionText = event.target.value

    this.setState({
      quizData: obj
    })
  }

  choiceChecked = (event) => {
    const obj = Object.assign({}, this.state.quizData)
    const question = Number(event.target.name)
    const choice = Number(event.target.id)

    if (!obj.questionSet[question].choiceSet[choice].isCorrect) {
      obj.questionSet[question].choiceSet.forEach((item, index) => {
        if (index === choice) {
          item.isCorrect = true
        } else {
          item.isCorrect = false
        }
      })
    }

    this.setState({
      quizData: obj
    })
  }

  choiceTextChange = (event) => {
    const obj = Object.assign({}, this.state.quizData)
    const question = Number(event.target.name)
    const choice = Number(event.target.id)

    obj.questionSet[question].choiceSet[choice].ChoiceText = event.target.value

    this.setState({
      quizData: obj
    })
  }

  addQuestion = () => {
    const obj = Object.assign({}, this.state.quizData)

    obj.questionSet.push({
      QuestionID: null,
      QuestionText: '',
      choiceSet: [
        {
          ChoiceID: null,
          ChoiceText: '',
          isCorrect: false,
          status: false
        },
        {
          ChoiceID: null,
          ChoiceText: '',
          isCorrect: false,
          status: false
        }
      ]
    })

    this.setState({
      quizData: obj
    })
  }

  deleteQuestion = (event) => {
    const obj = Object.assign({}, this.state.quizData)
    const del = [...this.state.deletedQuestions]
    const name = Number(event.target.name)

    if (obj.questionSet[name].QuestionID) {
      del.push(obj.questionSet[name])
      obj.questionSet.splice(name, 1)

      this.setState({
        quizData: obj,
        deletedQuestions: del
      })
    } else {
      obj.questionSet.splice(name, 1)
      this.setState({
        quizData: obj
      })
    }
  }

  enableOrDisable = (event) => {
    const obj = Object.assign({}, this.state.quizData)
    const id = Number(event.target.id)
    const name = Number(event.target.name)
    const choiceSet = obj.questionSet[name].choiceSet

    if (choiceSet[id]) {
      const choice = choiceSet[id]
      const status = choice.status
      if (choice.ChoiceID) {
        if (!status) {
          choice.ChoiceText = ''
          choice.isCorrect = false
        }
        obj.questionSet[name].choiceSet[id].status = !status
      } else if (!status) {
        obj.questionSet[name].choiceSet[id] = null
      }
    } else {
      obj.questionSet[name].choiceSet[id] = {
        ChoiceID: null,
        ChoiceText: '',
        isCorrect: false,
        status: false
      }
    }

    this.setState({
      quizData: obj
    })
  }

  toggleModalMessage = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  runMutation = () => {
    const type = this.state.mutationType

    if (type === 'deleteQuiz') {
      this.setState({
        modalLoading: true,
        modalSuccess: false,
        modalText: 'Deleting quiz. Please wait...',
        modalTitle: 'Information'
      })

      const deletedQuiz = this.state.mutation({
        variables: {
          encJwt: this.state.token,
          QuizID: this.state.quizId
        },
        refetchrefetchQueries: ['GET_QUIZ_INFORMATION']
      })

      deletedQuiz
        .then(() => {
          this.setState({
            redirect: true
          })
        })
        .catch(error => {
          this.setState({
            modalLoading: false,
            modalSuccess: false,
            modalText: error,
            modalTitle: 'Error'
          })
        })
    } else if (type === 'saveChanges') {
      if (this.state.quizData.questionSet.length === 0) {
        this.setState({
          modalLoading: false,
          modalSuccess: false,
          modalText: 'To edit a quiz, it must have at least one question.',
          modalTitle: 'Information'
        })
        return
      } else if (this.state.deletedQuestions.length > 0) {
        const deleteQuestion = this.state.mutation['deleteQuestion']
        this.state.deletedQuestions.forEach(question => {
          const deletedQuestion = deleteQuestion({
            variables: {
              QuestionID: question.QuestionID,
              encJwt: this.state.token
            },
            refetchrefetchQueries: ['GET_QUIZ_INFORMATION']
          })
          deletedQuestion
            .then(() => {
              this.setState({
                modalLoading: true,
                modalSuccess: false,
                modalText: 'Saving Changes. Please wait...',
                modalTitle: 'Information'
              })
            })
            .catch(error => {
              this.setState({
                modalLoading: false,
                modalSuccess: false,
                modalText: error,
                modalTitle: 'Error'
              })
            })
        })
      }

      const updateQuiz = this.state.mutation['updateQuiz']
      const updatedQuiz = updateQuiz({
        variables: {
          QuizID: this.state.quizData.QuizID,
          QuizName: this.state.quizData.QuizName,
          encJwt: this.state.token
        },
        refetchrefetchQueries: ['GET_QUIZ_INFORMATION']
      })

      updatedQuiz
        .then(() => {
          this.setState({
            modalLoading: true,
            modalSuccess: false,
            modalText: 'Saving Changes. Please wait...',
            modalTitle: 'Information'
          })

          const updateQuestion = this.state.mutation['updateQuestion']
          const createQuestion = this.state.mutation['createQuestion']

          this.setState({
            questionCount: this.state.quizData.questionSet.length
          })

          this.state.quizData.questionSet.forEach(question => {
            let createOrUpdate
            if (question.QuestionID) {
              createOrUpdate = updateQuestion({
                variables: {
                  QuestionID: question.QuestionID,
                  QuestionText: question.QuestionText,
                  encJwt: this.state.token
                },
                refetchrefetchQueries: ['GET_QUIZ_INFORMATION']
              })
            } else {
              createOrUpdate = createQuestion({
                variables: {
                  QuestionText: question.QuestionText,
                  QuizID: this.state.quizId,
                  encJWT: this.state.token,
                  isMajor: false
                }
              })
            }
            createOrUpdate
              .then(data => {
                this.setState({
                  questionCount: this.state.questionCount - 1
                })

                const createChoice = this.state.mutation['createChoice']
                const updateChoice = this.state.mutation['updateChoice']
                const deleteChoice = this.state.mutation['deleteChoice']

                this.setState({
                  choiceCount: question.choiceSet.length
                })

                question.choiceSet.forEach(choice => {
                  if (choice && !choice.ChoiceID) {
                    const createdChoice = createChoice({
                      variables: {
                        ChoiceText: choice.ChoiceText,
                        QuestionID: data.data.createQuestion.question.QuestionID,
                        isCorrect: choice.isCorrect,
                        status: false,
                        encJWT: this.state.token
                      },
                      refetchrefetchQueries: ['GET_QUIZ_INFORMATION']
                    })

                    createdChoice
                      .then(() => {
                        this.setState({
                          choiceCount: this.state.choiceCount - 1
                        })

                        if (this.state.choiceCount === 0 && this.state.questionCount === 0) {
                          this.setState({
                            modalOpen: true,
                            modalText: 'You have successfully saved the quiz.',
                            modalTitle: 'Success',
                            modalSuccess: false,
                            modalLoading: false
                          })
                        }
                      })
                      .catch(error => {
                        this.setState({
                          modalOpen: true,
                          modalText: error,
                          modalTitle: 'Error',
                          modalSuccess: false,
                          modalLoading: false
                        })
                      })
                  } else if (choice && choice.status) {
                    const deletedChoice = deleteChoice({
                      variables: {
                        ChoiceID: choice.ChoiceID,
                        encJwt: this.state.token
                      },
                      refetchrefetchQueries: ['GET_QUIZ_INFORMATION']
                    })

                    deletedChoice
                      .then(() => {
                        this.setState({
                          choiceCount: this.state.choiceCount - 1
                        })

                        if (this.state.choiceCount === 0 && this.state.questionCount === 0) {
                          this.setState({
                            modalOpen: true,
                            modalText: 'You have successfully saved the quiz.',
                            modalTitle: 'Success',
                            modalSuccess: false,
                            modalLoading: false
                          })
                        }
                      })
                      .catch(error => {
                        this.setState({
                          modalOpen: true,
                          modalText: error,
                          modalTitle: 'Error',
                          modalSuccess: false,
                          modalLoading: false
                        })
                      })
                  } else if (choice) {
                    const updatedChoice = updateChoice({
                      variables: {
                        ChoiceID: choice.ChoiceID,
                        ChoiceText: choice.ChoiceText,
                        isCorrect: choice.isCorrect,
                        status: choice.status,
                        encJwt: this.state.token
                      },
                      refetchrefetchQueries: ['GET_QUIZ_INFORMATION']
                    })

                    updatedChoice
                      .then(() => {
                        this.setState({
                          choiceCount: this.state.choiceCount - 1
                        })

                        if (this.state.choiceCount === 0 && this.state.questionCount === 0) {
                          this.setState({
                            modalOpen: true,
                            modalText: 'You have successfully saved the quiz.',
                            modalTitle: 'Success',
                            modalSuccess: false,
                            modalLoading: false
                          })
                        }
                      })
                      .catch(error => {
                        this.setState({
                          modalOpen: true,
                          modalText: error,
                          modalTitle: 'Error',
                          modalSuccess: false,
                          modalLoading: false
                        })
                      })
                  }
                })
              })
              .catch(error => {
                this.setState({
                  modalOpen: true,
                  modalText: error,
                  modalTitle: 'Error',
                  modalSuccess: false,
                  modalLoading: false
                })
              })
          })
        })
        .catch(error => {
          this.setState({
            modalOpen: true,
            modalText: error,
            modalTitle: 'Error',
            modalSuccess: false,
            modalLoading: false
          })
        })
    }
  }

  render () {
    if (!this.state.quizId) {
      return <span>Loading...</span>
    }

    return (
      <Query
        query={GET_QUIZ_INFORMATION}
        variables={{ quizId: this.state.quizId }}
        onCompleted={data => {
          this.setState({
            quizData: data.singleQuiz
          })
        }}>
        {({ data, loading }) => {
          if (loading || !data) {
            return <span>Loading...</span>
          } else if (data && this.state.quizData) {
            const quizData = this.state.quizData
            return (
              <EditQuizContainer>
                <Header>To edit a quiz it must have</Header>

                <CheckList>
                  <CheckListItem>A quiz name</CheckListItem>
                  <CheckListItem>Have at least one question</CheckListItem>
                  <CheckListItem>Have at least two answer choices per question</CheckListItem>
                </CheckList>

                <Mutation mutation={CREATE_QUESTION}>
                  {createQuestion => (
                    <Mutation mutation={CREATE_CHOICE}>
                      {createChoice => (
                        <Mutation mutation={UPDATE_QUIZ}>
                          {updateQuiz => (
                            <Mutation mutation={UPDATE_QUESTION}>
                              {updateQuestion => (
                                <Mutation mutation={UPDATE_CHOICE}>
                                  {updateChoice => (
                                    <Mutation mutation={DELETE_QUESTION}>
                                      {deleteQuestion => (
                                        <Mutation mutation={DELETE_CHOICE}>
                                          {deleteChoice => (
                                            <EditQuizForm onSubmit={event => {
                                              event.preventDefault()
                                              this.setState({
                                                modalOpen: true,
                                                modalLoading: true,
                                                modalSuccess: true,
                                                modalText: 'Are you sure you want to save changes?',
                                                modalTitle: 'Information',
                                                mutation: {
                                                  'deleteQuestion': deleteQuestion,
                                                  'deleteChoice': deleteChoice,
                                                  'createQuestion': createQuestion,
                                                  'createChoice': createChoice,
                                                  'updateQuiz': updateQuiz,
                                                  'updateQuestion': updateQuestion,
                                                  'updateChoice': updateChoice
                                                },
                                                mutationType: 'saveChanges'
                                              })
                                            }}>

                                              <EditQuizName
                                                id={quizData.QuizID}
                                                name='QuizName'
                                                placeholder='Quiz Name'
                                                onChange={this.quizNameChange}
                                                required
                                                type='text'
                                                value={quizData.QuizName}
                                              />

                                              <EditQuestion
                                                questionSet={quizData.questionSet}
                                                questionTextChange={this.questionTextChange}
                                                choiceChecked={this.choiceChecked}
                                                choiceTextChange={this.choiceTextChange}
                                                deleteQuestion={this.deleteQuestion}
                                                enableOrDisable={this.enableOrDisable}
                                              />

                                              <EditQuizBtns
                                                color='secondary'
                                                onClick={this.addQuestion}
                                              >Add Question
                                              </EditQuizBtns>

                                              <EditQuizBtns
                                                color='info'
                                              >Save Changes
                                              </EditQuizBtns>

                                              <Mutation mutation={DELETE_QUIZ}>
                                                {(deleteQuiz) => (
                                                  <EditQuizBtns
                                                    color='danger'
                                                    onClick={() => {
                                                      this.setState({
                                                        modalOpen: true,
                                                        modalLoading: true,
                                                        modalSuccess: true,
                                                        modalText: 'Are you sure you want to delete this quiz?',
                                                        modalTitle: 'Information',
                                                        mutation: deleteQuiz,
                                                        mutationType: 'deleteQuiz'
                                                      })
                                                    }}
                                                  >Delete Quiz
                                                  </EditQuizBtns>
                                                )}
                                              </Mutation>
                                            </EditQuizForm>
                                          )}
                                        </Mutation>
                                      )}
                                    </Mutation>
                                  )}
                                </Mutation>
                              )}
                            </Mutation>
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
                  modalFuncOne={this.runMutation}
                  modalFuncTwo={this.toggleModalMessage}
                />
                {this.state.redirect ? <Redirect to='/rocket/quizzes' /> : null}
              </EditQuizContainer>
            )
          }
        }}
      </Query>
    )
  }
}

EditQuiz.propTypes = {
  location: PropTypes.object
}

export default EditQuiz
