import React from 'react'
import { string } from 'prop-types'

const ClassList = props => {
  const { ClassName } = props

  return (
    <React.Fragment>
      <p>{ClassName}</p>

      <button
        onClick={() => console.log(`EDIT ${ClassName}`)}
      >
        Edit
      </button>
    </React.Fragment>
  )
}

ClassList.propTypes = {
  ClassName: string
}

export default ClassList
