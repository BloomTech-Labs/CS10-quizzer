import React from 'react'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'
import PropTypes from 'prop-types'

const QuizList = props => {
  const { QuizName, amountOfClasses } = props

  return (
    <Card className='quiz_card'>
      <CardBody>
        <CardTitle className='quiz_card_title'>{QuizName}</CardTitle>
        <CardText className='quiz_card_text'>Classes Assigned: {amountOfClasses}</CardText>
      </CardBody>
    </Card>
  )
}

QuizList.propTypes = {
  QuizName: PropTypes.string,
  amountOfClasses: PropTypes.number
}

export default QuizList
