import React from 'react'
import { Card, CardTitle, CardBody, CardText, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ClassCard (props) {
  const { quizscoresSet } = props.classItem
<<<<<<< HEAD
=======
  console.log(quizscoresSet)
>>>>>>> 6c69c6b40ec3c81c0703a2ff48ada5d8f40d0880

  const allQuizScores = quizscoresSet.reduce((acc, next) => {
    return acc + next.Score
  }, 0)

  const averageGrade = allQuizScores / quizscoresSet.length

  return (
<<<<<<< HEAD
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
=======
    <Col className='mb-3 col-12 col-sm-6 col-lg-4'>
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
    </Col>
>>>>>>> 6c69c6b40ec3c81c0703a2ff48ada5d8f40d0880
  )
}

ClassCard.propTypes = {
  classItem: PropTypes.object
}

export default ClassCard
