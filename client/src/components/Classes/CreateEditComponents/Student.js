import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import StudentDeleteModal from './StudentDeleteModal'
import { string } from 'prop-types'

class Student extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dropdownOpen: false,
      confirmDeleteOpen: false
    }
  }

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  toggleConfirmDelete = () => {
    this.setState({
      confirmDeleteOpen: !this.state.confirmDeleteOpen
    })
  }

  render () {
    const { studentName, studentID } = this.props

    return (
      <div>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
          <DropdownToggle caret>
            {studentName}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Quiz Results</DropdownItem>
            <DropdownItem onClick={this.toggleConfirmDelete}>Remove Student</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <StudentDeleteModal name={studentName} studentID={studentID} isOpen={this.state.confirmDeleteOpen} toggle={this.toggleConfirmDelete} />
      </div>
    )
  }
}

Student.propTypes = {
  studentName: string,
  studentID: string
}

export default Student
