import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// Props contains the students name

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
    return (
      <div>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Student Name
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

export default Student
