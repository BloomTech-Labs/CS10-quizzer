import React from 'react'

// Props should contain the class ID, class name, number of students, average grade,
// and total quizzes assigned to that class.
// Clicking on a ClassCard should open the Create/Edit page for that class

function ClassCard (props) {
  return (
    <div>
      <h3>Class Name</h3>
      <p>Students: Number</p>
      <p>Average Grade: Number</p>
      <p>Quizzes: Number</p>
    </div>
  )
}

export default ClassCard
