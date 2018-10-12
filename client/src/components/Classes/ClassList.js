import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'reactstrap'
import NewClassCard from './NewClassCard'

import ClassCard from './ClassCard'

const ClassList = props => {
  const { classSet } = props

  return (
    <Row>
      <NewClassCard />
      {props.classSet.length > 0
        ? classSet.map(classItem => {
          return (
            <ClassCard
              key={classItem.ClassID}
              classItem={classItem}
            />
          )
        })
        : null}
    </Row>
  )
}

ClassList.propTypes = {
  classSet: PropTypes.array
}

export default ClassList
