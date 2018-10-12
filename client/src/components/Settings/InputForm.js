import React from 'react'
import PropTypes from 'prop-types'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'

import { DivStyled } from './styled'

const InputForm = (props) => {
  return (
    <DivStyled className='settings_container__input_form'>
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
        <Input type='password' name='oldPassword' value={props.oldPassword} onChange={props.handleInputChange} required />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon addonType='prepend'>New Password: </InputGroupAddon>
        <Input type='password' name='newPassword' value={props.newPassword} onChange={props.handleInputChange} />
      </InputGroup>
    </DivStyled>
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
