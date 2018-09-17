import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firstSectionImage from '../../images/firstImage.png'
import { Button } from 'reactstrap'
import './Home.css'

class FirstSection extends Component {
  render () {
    return (
      <div className='home_container_first_section'>
        <div className='home_container_first_section_left'>
          <h1>A web app for teachers to create quizzes.</h1>
          <p>Search millions of publicly created quizzes to improve your grades or create your own.</p>
          <Button color='info' className='first_section_left_getstarted_button' onClick={this.props.toggleGetStarted}>Get started</Button>
        </div>
        <img className='first_section_image' src={firstSectionImage} alt='A laptop with flowers behind it.' />
      </div>
    )
  }
}

FirstSection.propTypes = {
  toggleGetStarted: PropTypes.func
}

export default FirstSection
