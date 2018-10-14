import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { client } from '../../index'

import EditQuestion from '../EditQuestion/EditQuestion'
import { GET_QUIZ_INFORMATION } from '../Queries'

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
      quizId: '',
      quizData: null,
      deletedQuestions: []
    }
  }

  componentDidMount () {
    if (this.props.location.state) {
      this.setState({
        quizId: this.props.location.state
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
    const question = Number(event.target.name)

    del.push(obj.questionSet.splice(question, 1))

    this.setState({
      quizData: obj,
      deletedQuestions: del
    })
  }

  enableOrDisable = (event) => {
    const obj = Object.assign({}, this.state.quizData)
    const id = Number(event.target.id)
    const name = Number(event.target.name)
    const choiceSet = obj.questionSet[name].choiceSet
    const choice = obj.questionSet[name].choiceSet[id]

    if (choiceSet.length >= id + 1) {
      const status = obj.questionSet[name].choiceSet[id].status
      if (choice.ChoiceID) {
        if (!status) {
          choice.ChoiceText = ''
          choice.isCorrect = false
        }
        obj.questionSet[name].choiceSet[id].status = !status
      } else if (!status) {
        obj.questionSet[name].choiceSet.splice(id, 1)
      }
    } else {
      obj.questionSet[name].choiceSet.push({
        ChoiceID: null,
        ChoiceText: '',
        isCorrect: false,
        status: false
      })
    }

    this.setState({
      quizData: obj
    })
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
        }}
      >
        {({ data, loading }) => {
          if (loading || !data) {
            return <span>Loading...</span>
          } else if (data && this.state.quizData) {
            const quizData = this.state.quizData
            return (
              <EditQuizContainer>
                <Header>
                  To edit a quiz it must have
                </Header>

                <CheckList>
                  <CheckListItem>A quiz name</CheckListItem>
                  <CheckListItem>Have at least one question</CheckListItem>
                  <CheckListItem>Have at least two answer choices per question</CheckListItem>
                </CheckList>

                <EditQuizForm>
                  <EditQuizName
                    id={quizData.QuizID}
                    name='QuizName'
                    placeholder='Quiz Name'
                    onChange={this.quizNameChange}
                    required type='text'
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
                  >
                  Add Question
                  </EditQuizBtns>

                  <EditQuizBtns
                    color='info'
                  >
                  Save Changes
                  </EditQuizBtns>

                  <EditQuizBtns
                    color='danger'
                  >
                  Delete Quiz
                  </EditQuizBtns>
                </EditQuizForm>
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
