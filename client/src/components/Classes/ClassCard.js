import React from 'react'
import { Card, CardTitle, CardBody, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ClassCard (props) {
  const { quizscoresSet } = props.classItem

  const allQuizScores = quizscoresSet.reduce((acc, next) => {
    return acc + next.Score
  }, 0)

  const averageGrade = allQuizScores / quizscoresSet.length

  return (
    <Card className='quiz_card'>
      <Link to={{ pathname: '/rocket/classes/editclass/', state: { classItem: props.classItem } }}>
        <CardBody>
          <CardTitle className='quiz_card_title'>{props.classItem.ClassName}</CardTitle>
          <CardText className='class_card_text'>Students: {props.classItem.studentSet.length}</CardText>
          <CardText className='class_card_text'>Average Grade: { isNaN(averageGrade) ? 'No grades yet' : `${averageGrade}%` }</CardText>
          <CardText className='class_card_text'>Quizzes: {props.classItem.quizSet.length}</CardText>
        </CardBody>
      </Link>
    </Card>
  )
}

ClassCard.propTypes = {
  classItem: PropTypes.object
}

export default ClassCard
