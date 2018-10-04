import React from 'react'
import { func } from 'prop-types'

const ViewQuizOrClass = props => {
  return (
    <div className='cards'>
      {props.render(props)}
    </div>
  )
}

ViewQuizOrClass.propTypes = {
  render: func
}

export default ViewQuizOrClass
