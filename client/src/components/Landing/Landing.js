import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import FirstSection from './FirstSection'
import Footer from './Footer'
import './Landing.css'

import { landingContainer } from './style/style'

class Landing extends Component {
  render () {
    return (
      <div style={landingContainer} className='landing_container'>
        <NavBar />
        <FirstSection />
        <Footer />
      </div>
    )
  }
}

export default Landing
