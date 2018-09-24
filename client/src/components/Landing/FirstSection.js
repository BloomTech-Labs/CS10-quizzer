import React, { Component } from 'react'
import firstSectionImage from '../../images/firstImage.png'
import SignUpModal from '../Modals/SignUpModal'
import { Button } from 'reactstrap'
import './Landing.css'

class FirstSection extends Component {
  constructor () {
    super()
    this.state = {
      getStartedModal: false,
      redirect: false
    }
  }

  toggleGetStarted = () => {
    if (localStorage.getItem('token')) {
      this.setState({
        redirect: true
      })
    } else {
      this.setState({
        getStartedModal: !this.state.getStartedModal
      })
    }
  }

  render () {
    return (
      <div className='landing_container_first_section'>
        <div className='landing_container_first_section_left'>
          <h1>A web app for teachers to create quizzes.</h1>
          <p>Search millions of publicly created quizzes to improve your grades or create your own.</p>
          <Button color='info' className='first_section_left_getstarted_button' onClick={this.toggleGetStarted}>Get started</Button>
        </div>
        <img className='first_section_image' src={firstSectionImage} alt='A laptop with flowers behind it.' />
        <SignUpModal getStartedModal={this.state.getStartedModal} toggleGetStarted={this.toggleGetStarted} />
      </div>
    )
  }
}

export default FirstSection
