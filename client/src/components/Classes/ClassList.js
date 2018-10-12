import React from 'react'
import PropTypes from 'prop-types'

import ClassCard from './ClassCard'

const ClassList = props => {
  return (
    <div>
      <ClassCard classItem={props.classroom} />
    </div>
  )
}

ClassList.propTypes = {
  classroom: PropTypes.object
}

export default ClassList
