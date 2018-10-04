import React from 'react'
import { string } from 'prop-types'

const QuestionTitle = ({ title }) => {
  return (
    <h2>
      { title }
    </h2>
  )
}

QuestionTitle.propTypes = {
  title: string.isRequired
}

export default QuestionTitle
