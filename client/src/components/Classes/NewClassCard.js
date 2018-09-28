import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

// Clicking this card should redirect to the Create/Edit Class page, and since there will be
// no classID, it should default to "Create" mode
// This should always be added to the end of the list of classes

function NewClassCard (props) {
  return (
    <div>
      <h4>Class Name</h4>
      <Link to='/rocket/classes/createeditclass'><Button>+</Button></Link>
    </div>
  )
}

export default NewClassCard
