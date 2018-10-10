import React, { Component } from 'react'
import { GET_QUIZ_INFORMATION } from '../Queries'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import EditQuestion from '../EditQuestion/EditQuestion'
import { Query } from 'react-apollo'
import { client } from '../../index'
import './EditQuiz.css'

class EditQuiz extends Component {
  constructor () {
    super()
    this.state = {
      quizId: '',
      quizData: null
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
    
    obj.questionSet[index].Question = event.target.value
    
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
              <div className='edit_quiz_container'>
                <h4 className='edit_quiz_instructions'>
                  To edit a quiz, it must have a quiz name and have at least one question. Each question 
                  must also have at least two answer choices per question, but each question is limited to 
                  four answer choices.
                </h4>
                <form className='edit_quiz_form'> 
                 <input 
                   name='QuizName' 
                   placeholder='Name'
                   onChange={this.quizNameChange} 
                   required type='text' 
                   value={quizData.QuizName} 
                 />
                 <EditQuestion 
                   questionSet={quizData.questionSet} 
                   questionTextChange={this.questionTextChange} 
                   choiceChecked={this.choiceChecked} 
                   choiceTextChange={this.choiceTextChange} 
                 />
                 <div className='edit_quiz_buttons'> 
                   <Button color='secondary'>Add Question</Button>
                   <Button color='info'>Save Changes</Button>
                   <Button color='danger'>Delete Quiz</Button> 
                 </div> 
                </form> 
              </div>
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
