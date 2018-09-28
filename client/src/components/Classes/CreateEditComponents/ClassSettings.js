import React from 'react'
import { InputGroup, Input, Button } from 'reactstrap'

function ClassSettings (props) {
  return (
    <div>
      <h4>Settings</h4>
      <InputGroup>
        <Input placeholder={'Class Name'} />
        <Input type='checkbox' />
        <p>CC Me on Class Emails</p>
        <Button>Import CSV</Button>
      </InputGroup>
    </div>
  )
}

export default ClassSettings
