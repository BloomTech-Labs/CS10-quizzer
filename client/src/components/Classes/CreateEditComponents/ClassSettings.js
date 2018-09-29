import React from 'react'
import { InputGroup, Input, Button } from 'reactstrap'
import { string } from 'prop-types'

function ClassSettings (props) {
  const { className } = props

  return (
    <div>
      <h4>Settings</h4>
      <InputGroup>
        <Input placeholder={className} />
      </InputGroup>
      <InputGroup>
        <Input type='checkbox' />
        <p>CC Me on Class Emails</p>
      </InputGroup>
      <Button>Import CSV</Button>
    </div>
  )
}

ClassSettings.propTypes = {
  className: string
}

export default ClassSettings
