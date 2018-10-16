import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import FirstSection from './FirstSection'
import Footer from './Footer'
import { Redirect } from 'react-router-dom'
import './Landing.css'

import { landingContainer } from './style/style'

class Landing extends Component {
  render () {
    return (
      <div style={landingContainer} className='landing_container'>
        <NavBar />
        <FirstSection />
        <Footer />
        {window.localStorage.getItem('token') ? <Redirect to={'/rocket/'} /> : null}
      </div>
    )
  }
}

export default Landing
