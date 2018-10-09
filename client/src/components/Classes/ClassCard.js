import React from 'react'
import { Card, CardTitle, CardBody, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ClassCard (props) {
  const { quizscoresSet } = props.classItem
  console.log(quizscoresSet)

  const allQuizScores = quizscoresSet.reduce((acc, next) => {
    return acc + next.Score
  }, 0)

  const averageGrade = allQuizScores / quizscoresSet.length

  return (
    <Link to={{ pathname: '/rocket/classes/editclass/', state: { classItem: props.classItem } }}>
      <Card>
        <CardTitle>{props.classItem.ClassName}</CardTitle>
        <CardBody>
          <CardText>Students: {props.classItem.studentSet.length}</CardText>
          <CardText>Average Grade: { isNaN(averageGrade) ? 'No grades yet' : `${averageGrade}%` }</CardText>
          <CardText>Quizzes: {props.classItem.quizSet.length}</CardText>
        </CardBody>
      </Card>
    </Link>
  )
}

ClassCard.propTypes = {
  classItem: PropTypes.object
}

export default ClassCard
