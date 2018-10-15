import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import StudentDeleteModal from './StudentDeleteModal'
import StudentResultsModal from './StudentResultsModal'
import { string } from 'prop-types'

import styled from 'styled-components'

const StudentStyled = styled.div`
`

const StudentBtnWrapperStyled = styled(ButtonDropdown)`
  display: block !important;
  margin: 0 auto;
  max-width: 200px;
  width: 100%;
`

const StudentBtStyled = styled(DropdownToggle)`
  width: 100%;

  &:after {
    position: absolute;
    top: calc(50% - 4.8px);
    right: 20px;
  }
`

class Student extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dropdownOpen: false,
      confirmDeleteOpen: false,
      resultsModal: false
    }
  }

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  toggleResultsModal = () => {
    this.setState({
      resultsModal: !this.state.resultsModal
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
      <StudentStyled className='students_list_wrapper__students_wrapper__student'>
        <StudentBtnWrapperStyled className='students_list_wrapper__students_wrapper__student__btn_wapper' isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
          <StudentBtStyled className='students_list_wrapper__students_wrapper__student__btn_wapper__btn' caret>
            {studentName}
          </StudentBtStyled>
          
          <DropdownMenu>
            <DropdownItem onClick={this.toggleResultsModal}>Quiz Results</DropdownItem>
            <DropdownItem onClick={this.toggleConfirmDelete}>Remove Student</DropdownItem>
          </DropdownMenu>
        </StudentBtnWrapperStyled>

        <StudentDeleteModal name={studentName} studentID={studentID} isOpen={this.state.confirmDeleteOpen} toggle={this.toggleConfirmDelete} />
        <StudentResultsModal name={studentName} studentID={studentID} isOpen={this.state.resultsModal} toggle={this.toggleResultsModal} />
      </StudentStyled>
    )
  }
}

Student.propTypes = {
  studentName: string,
  studentID: string
}

export default Student
