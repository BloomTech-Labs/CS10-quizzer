import React from 'react'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'
import PropTypes from 'prop-types'

const InputForm = (props) => {
  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>Name:</InputGroupAddon>
        <Input placeholder={props.data.teacher ? props.data.teacher[0].TeacherName : 'Loading...'} type='text' name='name' value={props.name} onChange={props.handleInputChange} />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon addonType='prepend'>Email:</InputGroupAddon>
        <Input placeholder={props.data.teacher ? props.data.teacher[0].TeacherEmail : 'Loading...'} type='email' name='email' value={props.email} onChange={props.handleInputChange} />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon addonType='prepend'>Old Password: </InputGroupAddon>
        <Input type='password' name='oldPassword' value={props.oldPassword} onChange={props.handleInputChange} />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon addonType='prepend'>New Password: </InputGroupAddon>
        <Input type='password' name='newPassword' value={props.newPassword} onChange={props.handleInputChange} />
      </InputGroup>
    </div>
  )
}

InputForm.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  email: PropTypes.string,
  handleInputChange: PropTypes.func,
  oldPassword: PropTypes.string,
  newPassword: PropTypes.string
}

export default InputForm
