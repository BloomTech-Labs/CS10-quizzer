import React from 'react'
// import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

// Clicking this card should redirect to the Create/Edit Class page, and since there will be
// no classID, it should default to "Create" mode
// This should always be added to the end of the list of classes

function NewClassCard (props) {
  return (
    <div>
      <h4>New Class</h4>
      {/* <Link to='/rocket/classes/createeditclass'><Button>+</Button></Link> */}
      <Button color='warning' className='add_quiz_button'>
        <span role='img' aria-labelledby='Plus Symbol'>&#x2795;</span>
      </Button>
    </div>
  )
}

export default NewClassCard
