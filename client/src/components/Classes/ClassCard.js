import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Props should contain the class ID, class name, number of students, average grade,
// and total quizzes assigned to that class.
// Clicking on a ClassCard should open the Create/Edit page for that class

function ClassCard (props) {
  return (
    <Link to={{ pathname: '/rocket/classes/createeditclass/', state: { classItem: props.classItem } }}>
      <h4>{props.classItem.ClassName}</h4>
      <p>Students: {props.classItem.studentSet.length}</p>
      <p>Average Grade: Number</p>
      <p>Quizzes: {props.classItem.quizSet.length}</p>
    </Link>
  )
}

ClassCard.propTypes = {
  classItem: PropTypes.object
}

export default ClassCard
