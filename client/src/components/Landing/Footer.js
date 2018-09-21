import React, { Component } from 'react'
import facebookIcon from '../../images/facebookIcon.png'
import instagramIcon from '../../images/instagramIcon.png'
import twitterIcon from '../../images/twitterIcon.png'
import './Landing.css'

class Footer extends Component {
  render () {
    return (
      <div className='footer'>
        <span>Quizzer</span>
        <span>Follow us</span>
        <div className='footer_socialmedia_icons'>
          <img src={facebookIcon} alt='Facebook Icon' />
          <img src={instagramIcon} alt='Instagram Icon' />
          <img src={twitterIcon} alt='Twitter Icon' />
        </div>
        <span>&#169; 2018 Quizzer Inc.</span>
      </div>
    )
  }
}

export default Footer
