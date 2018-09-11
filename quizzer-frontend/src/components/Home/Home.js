import React, { Component } from 'react';
import { Button } from 'reactstrap';
import firstimg from '../../images/firstimg.png';
import NavBar from '../NavBar/NavBar';
import './Home.css';

class Home extends Component {
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
}

export default Home; 
