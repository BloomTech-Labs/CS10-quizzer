import React from 'react'
import PropTypes from 'prop-types'
import NewClassCard from './NewClassCard'
import { Cards } from '../Quizzes/styled'

import ClassCard from './ClassCard'

const ClassList = props => {
  const { classSet } = props

  return (
    <Cards className='cards'>
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
    </Cards>
  )
}

ClassList.propTypes = {
  classSet: PropTypes.array
}

export default ClassList
