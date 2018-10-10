import React from 'react'
import { func, string } from 'prop-types'

import { Cards } from '../Quizzes/styled'

const ViewQuizOrClass = props => {
  return (
    <Cards maxWidth={props.maxWidth}>
      {props.render(props)}
    </Cards>
  )
}

ViewQuizOrClass.propTypes = {
  render: func,
  maxWidth: string
}

export default ViewQuizOrClass
