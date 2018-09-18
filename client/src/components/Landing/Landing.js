import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import FirstSection from './FirstSection'
import Footer from './Footer'
import GetStartedModal from './GetStartedModal'
import './Landing.css'

class Landing extends Component {
  constructor () {
    super()
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
      <div className='landing_container'>
        <NavBar />
        <FirstSection getStartedModal={this.state.getStartedModal} toggleGetStarted={this.toggleGetStarted} />
        <Footer />
        <GetStartedModal getStartedModal={this.state.getStartedModal} toggleGetStarted={this.toggleGetStarted} />
      </div>
    )
  }
}

export default Landing
