import React from 'react'
import { InputGroup, Input, Button } from 'reactstrap'

// Have a GQL query for sending new students along

function AddStudents (props) {
  return (
    <div>
      <h4>Add Students</h4>
      <InputGroup>
        <Input placeholder={'Last Name'} />
        <Input placeholder={'First Name'} />
        <Input placeholder={'Email'} />
        <Button>Add</Button>
      </InputGroup>
    </div>
  )
}

export default AddStudents
