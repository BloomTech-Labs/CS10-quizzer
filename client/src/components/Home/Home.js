import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import FirstSection from './FirstSection'
import Footer from './Footer'
import GetStartedModal from './GetStartedModal'
import './Home.css'

class Home extends Component {
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
      <div className='home_container'>
        <NavBar />
        <FirstSection getStartedModal={this.state.getStartedModal} toggleGetStarted={this.toggleGetStarted} />
        <Footer />
        <GetStartedModal getStartedModal={this.state.getStartedModal} toggleGetStarted={this.toggleGetStarted} />
      </div>
    )
  }
}

export default Home
