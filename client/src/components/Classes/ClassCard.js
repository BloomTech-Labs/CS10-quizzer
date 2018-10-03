import React from 'react'
import { Card, CardTitle, CardBody, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ClassCard (props) {
  return (
    <Card className='classes_classcard'>
      <Link to={{ pathname: '/rocket/classes/editclass/', state: { classItem: props.classItem } }}>
        <CardTitle>{props.classItem.ClassName}</CardTitle>
        <CardBody>
          <CardText>Students: {props.classItem.studentSet.length}</CardText>
          <CardText>Average Grade: Number</CardText>
          <CardText>Quizzes: {props.classItem.quizSet.length}</CardText>
        </CardBody>
      </Link>
    </Card>
  )
}

ClassCard.propTypes = {
  classItem: PropTypes.object
}

export default ClassCard
