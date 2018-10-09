import React, { Component } from 'react'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class QuizList extends Component {
  constructor () {
    super()
    this.state = {
      redirect: false,
      quizId: ''
    }
  }

  redirect = (id) => {
    this.setState({
      quizId: id,
      redirect: true
    })
  }

  render () {
    const { QuizID, QuizName, amountOfClasses } = this.props
    return (
      <Card className='quiz_card' onClick={() => this.redirect(QuizID)}>
        <CardBody>
          <CardTitle className='quiz_card_title'>{QuizName}</CardTitle>
          <CardText className='quiz_card_text'>Classes Assigned: {amountOfClasses}</CardText>
        </CardBody>
        {this.state.redirect ? <Redirect to={{
          pathname: '/rocket/quizzes/editquiz',
          state: this.state.quizId
        }} /> : null}
      </Card>
    )
  }
}

QuizList.propTypes = {
  QuizName: PropTypes.string,
  QuizID: PropTypes.string,
  amountOfClasses: PropTypes.number
}

export default QuizList
