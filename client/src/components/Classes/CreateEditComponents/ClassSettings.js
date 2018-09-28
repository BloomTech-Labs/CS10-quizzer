import React from 'react'
import { InputGroup, Input, Button } from 'reactstrap'

function ClassSettings (props) {
  return (
    <div>
      <h4>Settings</h4>
      <InputGroup>
        <Input placeholder={'Class Name'} />
      </InputGroup>
      <InputGroup>
        <Input type='checkbox' />
        <p>CC Me on Class Emails</p>
      </InputGroup>
      <Button>Import CSV</Button>
    </div>
  )
}

export default ClassSettings
