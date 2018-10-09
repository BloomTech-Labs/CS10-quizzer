import React from 'react'
import { func } from 'prop-types'

import { Cards } from '../Quizzes/styled'

const ViewQuizOrClass = props => {
  return (
    <Cards>
      {props.render(props)}
    </Cards>
  )
}

ViewQuizOrClass.propTypes = {
  render: func
}

export default ViewQuizOrClass
