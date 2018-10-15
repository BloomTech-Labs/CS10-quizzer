import React from 'react'
import { Card, CardTitle, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ClassCard (props) {
  const { quizscoresSet } = props.classroom

  const allQuizScores = quizscoresSet.reduce((acc, next) => {
    return acc + next.Score
  }, 0)

  const averageGrade = allQuizScores / quizscoresSet.length

  return (
    <Card className='quiz_card'>
      <Link className='class_card_link' to={{ pathname: '/rocket/classes/editclass/', state: { classItem: props.classroom } }}>
        <CardBody>
          <CardTitle className='quiz_card_title'>{props.classroom.ClassName}</CardTitle>
          <span className='class_card_text'>Students: {props.classroom.studentSet.length}</span>
          <br />
          <span className='class_card_text'>Average Grade: { isNaN(averageGrade) ? 'No grades yet' : `${averageGrade}%` }</span>
          <br />
          <span className='class_card_text'>Quizzes: {props.classroom.quizSet.length}</span>
        </CardBody>
      </Link>
    </Card>
  )
}

ClassCard.propTypes = {
  classroom: PropTypes.object
}

export default ClassCard
