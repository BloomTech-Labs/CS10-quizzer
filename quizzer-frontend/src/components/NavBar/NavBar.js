import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import './NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <div className='nav-container'>
                <div className="home-group">
                    <Link className="home-button" to="/"><h1>Quizzer</h1></Link>
                    <Button className="create-quiz">
                        <span className="plus">&#x2795;</span>
                        <span className="text">Create Quiz</span>
                    </Button>
                </div>
                <div className="button-group">
                    <Button className="login">Log in</Button>
                    <Button className="signup" color="info">Sign up</Button>
                </div>
            </div>
        )
    }

}

export default NavBar; 
