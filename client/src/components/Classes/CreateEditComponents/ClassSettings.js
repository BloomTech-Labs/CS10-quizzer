import React from 'react'
import { InputGroup, Input } from 'reactstrap'

function ClassSettings (props) {
  return (
    <div>
      <h3>Settings</h3>
      <InputGroup>
        <Input placeholder={'Class Name'} />
        <Input type='checkbox'>CC Me on Class Emails</Input>
        <Input type='button'>Import CSV</Input>
      </InputGroup>
    </div>
  )
}

export default ClassSettings
