import React from 'react'
import { InputGroup, Input } from 'reactstrap'

// Have a GQL query for sending new students along

function AddStudents (props) {
  return (
    <div>
      <h3>Add Students</h3>
      <InputGroup>
        <Input placeholder={'Last Name'} />
        <Input placeholder={'First Name'} />
        <Input placeholder={'Email'} />
        <Input type='button'>Add</Input>
      </InputGroup>
    </div>
  )
}

export default AddStudents
