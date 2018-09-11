import React, { Component } from 'react'
import { Button } from 'reactstrap'
import firstimg from '../../images/firstimg.png'
import NavBar from '../NavBar/NavBar'
import './Home.css'

class Home extends Component {
<<<<<<< HEAD
    render() {
        return (
            <div>
                <NavBar />
                <div className="main-content">
                    <div className="main-content-left">
                        <h1>A cool web app for teachers to create dynamic quizzes.</h1>
                        <p>Search millions of publicly created quizzes to improve your grades as a student or create your own if you are a teacher.</p>
                        <Button color="info" className="getstart">Get started</Button>
                    </div>
                    <img className="firstimg" src={firstimg} alt="Main Image" />
                </div>
            </div>
        )
    }
=======
  render () {
    return (
      <div>
        <NavBar />
        <div className='main-content'>
          <div className='main-content-left'>
            <h1>A cool quiz creation app for teachers.</h1>
            <p>Search millions of publicly created quizzes to improve your grades or create your own if you are a teacher.</p>
            <Button color='info' className='getstart'>Get started</Button>
          </div>
          <img className='firstimg' src={firstimg} alt='Main' />
        </div>
      </div>
    )
  }
>>>>>>> e9b2305907eb6f4a0b9df9fe6b880c666e97c2c8
}

export default Home
