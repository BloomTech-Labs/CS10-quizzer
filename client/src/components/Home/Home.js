import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import firstSectionImage from '../../images/firstImage.png'
import facebookIcon from '../../images/facebookIcon.png'
import instagramIcon from '../../images/instagramIcon.png'
import twitterIcon from '../../images/twitterIcon.png'
import NavBar from '../NavBar/NavBar'
import './Home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      getStartedModal: false
    }

    this.toggleGetStarted = this.toggleGetStarted.bind(this)
  }

  toggleGetStarted () {
    this.setState({
      getStartedModal: !this.state.getStartedModal
    })
  }

  render () {
    return (
      <div className='home_container'>
        <NavBar />
        <div className='home_container_first_section'>
          <div className='home_container_first_section_left'>
            <h1>A cool web app for teachers to create dynamic quizzes.</h1>
            <p>Search millions of publicly created quizzes to improve your grades as a student or create your own if you are a teacher.</p>
            <Button color='info' className='first_section_left_getstarted_button' onClick={this.toggleGetStarted}>Get started</Button>
          </div>
          <img className='first_section_image' src={firstSectionImage} alt='A laptop with flowers behind it.' />
        </div>
        <div className='footer'>
          <span>Quizzer</span>
          <span>Follow us</span>
          <div className='footer_socialmedia_icons'>
            <img src={facebookIcon} alt='Facebook Icon' />
            <img src={instagramIcon} alt='Instagram Icon' />
            <img src={twitterIcon} alt='Twitter Icon' />
          </div>
          <span>&#169 2018 Quizzer Inc.</span>
        </div>
        <Modal className='getstarted_button_modal' isOpen={this.state.getStartedModal} toggle={this.toggleGetStarted}>
          <ModalHeader className='getstarted_button_modal_header'>
            <span>Sign up for free to create study sets</span>
          </ModalHeader>
          <ModalBody className='getstarted_button_modal_body'>
            <div className='modal_div'>
              <span>USERNAME</span>
              <input type='text' name='username' />
            </div>
            <div className='modal_div'>
              <span>EMAIL</span>
              <input type='email' name='email' />
            </div>
            <div className='modal_div'>
              <span>PASSWORD</span>
              <input type='password' name='password' />
            </div>
            <div className='modal_div'>
              <span>CONFIRM PASSWORD</span>
              <input type='password' name='password' />
            </div>
            <div className='modal_div'>
              <span className='modal_text'>By clicking Sign up, you accept Quizzer's <span>Terms of Service</span> and <span>Privacy Policy</span></span>
              <Button color='info' className='getstarted_button_modal_signup_button'>Sign up</Button>
            </div>
          </ModalBody>
          <ModalFooter className='getstarted_button_modal_footer'>
            <span>Already have an account? <span className='getstarted_button_modal_login'>Log in</span></span>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Home
