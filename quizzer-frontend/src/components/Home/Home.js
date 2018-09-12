import React, { Component } from 'react'
import { Button } from 'reactstrap'
import first_section_image from '../../images/first_image.png'
import facebook_icon from '../../images/facebook_icon.png'
import instagram_icon from '../../images/instagram_icon.png'
import twitter_icon from '../../images/twitter_icon.png'
import NavBar from '../NavBar/NavBar'
import './Home.css'

class Home extends Component {

    render() {
        return (
            <div className='home_container'>
                <NavBar />
                <div className='home_container_first_section'>
                    <div className='home_container_first_section_left'>
                        <h1>A cool web app for teachers to create dynamic quizzes.</h1>
                        <p>Search millions of publicly created quizzes to improve your grades as a student or create your own if you are a teacher.</p>
                        <Button color='info' className='first_section_left_getstarted_button'>Get started</Button>
                    </div>
                    <img className='first_section_image' src={first_section_image} alt='A laptop with flowers behind it.' />
                </div>
                <div className='footer'>
                    <span>Quizzer</span>
                    <span>Follow us</span>
                    <div className='footer_socialmedia_icons'>
                        <img src={facebook_icon} alt='Facebook Icon' />
                        <img src={instagram_icon} alt='Instagram Icon' />
                        <img src={twitter_icon} alt='Twitter Icon' />
                    </div>
                    <span>&#169; 2018 Quizzer Inc.</span>
                </div>
            </div>
        )
    }
};

export default Home
