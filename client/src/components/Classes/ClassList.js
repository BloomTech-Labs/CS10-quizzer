import React from 'react'
import PropTypes from 'prop-types'
import NewClassCard from './NewClassCard'

import ClassCard from './ClassCard'

const ClassList = props => {
  const { classSet } = props

  return (
    <div>
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
    </div>
  )
}

ClassList.propTypes = {
  classSet: PropTypes.array
}

export default ClassList
