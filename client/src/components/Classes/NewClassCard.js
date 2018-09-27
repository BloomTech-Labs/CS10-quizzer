import React from 'react'

// Clicking this card should redirect to the Create/Edit Class page, and since there will be
// no classID, it should default to "Create" mode

function NewClassCard (props) {
  return (
    <div>
      <h1>Class Name</h1>
      <button>+</button>
    </div>
  )
}

export default NewClassCard
