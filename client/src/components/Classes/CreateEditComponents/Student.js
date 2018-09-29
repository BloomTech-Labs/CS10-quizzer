import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { string } from 'prop-types'

class Student extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dropdownOpen: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render () {
    const { studentName } = this.props
    return (
      <div>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {studentName}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Quiz Results</DropdownItem>
            <DropdownItem>Remove Student</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    )
  }
}

Student.propTypes = {
  studentName: string
}

export default Student
