import React, { Component } from 'react'
import { Button } from 'reactstrap'
import first_section_image from '../../images/first_image.png'
import facebook_icon from '../../images/facebook_icon.png'
import instagram_icon from '../../images/instagram_icon.png'
import twitter_icon from '../../images/twitter_icon.png'
import NavBar from '../NavBar/NavBar'
import './Home.css'

class Home extends Component {
<<<<<<< HEAD

    render() {
        return (
            <div class='home_container'>
                <NavBar />
                <div className='home_container_first_section'>
                    <div className='home_container_first_section_left'>
                        <h1>A cool web app for teachers to create dynamic quizzes.</h1>
                        <p>Search millions of publicly created quizzes to improve your grades as a student or create your own if you are a teacher.</p>
                        <Button color='info' className='first_section_left_getstarted_button'>Get started</Button>
                    </div>
                    <img className='first_section_image' src={first_section_image} alt='First Section Image' />
                </div>
                <div className="footer">
                    <span>Quizzer</span>
                    <span>Follow us</span>
                    <div className="footer_socialmedia_icons">
                        <img src={facebook_icon} alt="Facebook Icon" />
                        <img src={instagram_icon} alt="Instagram Icon" />
                        <img src={twitter_icon} alt="Twitter Icon" />
                    </div>
                    <span>&#169; 2018 Quizzer Inc.</span>
                </div>
            </div>
        )
    }
};
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
          <img className='firstimg' src={firstimg} alt='Hero' />
        </div>
      </div>
    )
  }
}
>>>>>>> 335c94d23378b4ed07a0205797a8a28db54b47b4

export default Home
