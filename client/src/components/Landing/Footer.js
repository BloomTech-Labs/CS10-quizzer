import React, { Component } from 'react'
import './Landing.css'

import { quizzerFooterName, quizzerCopyright } from './style/style'

class Footer extends Component {
  render () {
    return (
      <div className='footer'>
        <span style={quizzerFooterName}>Quizzer</span>
        <span style={quizzerCopyright}>&#169; 2018 Quizzer Inc.</span>
      </div>
    )
  }
}

export default Footer
