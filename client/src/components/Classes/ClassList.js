import React from 'react'
import PropTypes from 'prop-types'
import ClassCard from './ClassCard'
import NewClassCard from './NewClassCard'

const ClassList = props => {
  const { classSet } = props

  return (
    <div className='classes_container'>
      {props.classSet.length > 0
        ? classSet.map(classItem => {
          return (
            <ClassCard
              key={classItem.ClassID}
              classItem={classItem} />
          )
        })
        : null}
      <NewClassCard />
    </div>
  )
}

ClassList.propTypes = {
  classSet: PropTypes.array
}

export default ClassList
