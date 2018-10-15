import React, { Component } from 'react'
import StudentPanel from './CreateEditComponents/StudentPanel'
import ClassSettings from './CreateEditComponents/ClassSettings'
import QuizPanel from './CreateEditComponents/QuizPanel'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const EditClassWrapper = styled.div`
  flex: 1;
`

const SpacingDivStyled = styled.div`
  margin: 0 auto;
  max-width: 500px;

  @media (min-width: 818px) {
    margin: 0 0 0 3rem;
  }
`

class EditClass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      classItem: null
    }
  }

  componentDidMount = () => {
    if (this.props.location.state) {
      this.setState({
        classItem: this.props.location.state.classItem
      })
    }
  }

  render () {
    if (this.state.classItem) {
      const { ClassID, ClassName } = this.state.classItem

      return (
        <EditClassWrapper className='edit_class_container'>
          <SpacingDivStyled className='edit_class_container__spacing_div'>
            <ClassSettings classID={ClassID} className={ClassName} />
            <StudentPanel classID={ClassID} />
            <QuizPanel className={ClassName} classID={ClassID} />
          </SpacingDivStyled>
        </EditClassWrapper>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

EditClass.propTypes = {
  location: PropTypes.object
}

export default EditClass
