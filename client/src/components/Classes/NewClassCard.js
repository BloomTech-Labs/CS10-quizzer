import React from 'react'
import { Link } from 'react-router-dom'

// Clicking this card should redirect to the Create/Edit Class page, and since there will be
// no classID, it should default to "Create" mode

function NewClassCard (props) {
  return (
    <div>
      <h4>Class Name</h4>
      <Link to='/rocket/createeditclass'><button>+</button></Link>
    </div>
  )
}

export default NewClassCard
