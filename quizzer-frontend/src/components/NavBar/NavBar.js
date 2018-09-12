import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { withRouter } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './NavBar.css'

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal_signup: false,
            modal_login: false
        }

        this.toggle_signup = this.toggle_signup.bind(this);
        this.toggle_login = this.toggle_login.bind(this);
    }

    toggle_signup() {
        this.setState({
            modal_signup: !this.state.modal_signup
        });
    }

    toggle_login() {
        this.setState({
            modal_login: !this.state.modal_login
        });
    }

    render() {
        return (
            <div className='nav_container'>
                <div className='nav_container_left'>
                    <Link className='nav_container_left_logo_button' to='/'><h1>Quizzer</h1></Link>
                    <Button className='nav_container_left_createquiz_button' onClick={this.toggle_signup}>
                        <span className='createquiz_button_text' role='img' aria-labelledby='Plus Symbol'>&#x2795; Create Quiz</span>
                    </Button>
                </div>
                <div className='nav_container_right'>
                    <Button className='nav_container_right_login_button' onClick={this.toggle_login}>Log in</Button>
                    <Button className='nav_container_right_signup_button' color='info' onClick={this.toggle_signup}>Sign up</Button>
                </div>
                <Modal className='popup' isOpen={this.state.modal_signup} toggle={this.toggle_signup}>
                    <ModalHeader className='popup_header'>
                        <span>Sign up for free to create study sets</span>
                    </ModalHeader>
                    <ModalBody className='popup_body'>
                        <div>
                            <span>BIRTHDAY</span><br />
                            <input type='date' name='birthday' min='2018' />
                        </div>
                        <div>
                            <span>USERNAME</span><br />
                            <input type='text' name='username' />
                        </div>
                        <div>
                            <span>PASSWORD</span><br />
                            <input type='password' name='password' />
                        </div>
                        <span>By clicking Sign up, you accept Quzzer's Terms of Service and Privacy Policy</span><br />
                        <Button color="info">Sign up</Button>
                    </ModalBody>
                    <ModalFooter className='popup_footer'>
                        <span>Already have an account? Log in</span>
                    </ModalFooter>
                </Modal>
                <Modal className='popup' isOpen={this.state.modal_login} toggle={this.toggle_login}>
                    <ModalHeader className='popup_header'>
                        <span>Log in</span>
                    </ModalHeader>
                    <ModalBody className='popup_body'>
                        <div>
                            <span>USERNAME</span><br />
                            <input type='text' name='username' />
                        </div>
                        <div>
                            <span>PASSWORD</span><br />
                            <input type='password' name='password' />
                        </div>
                        <Button color="info">Log in</Button>
                    </ModalBody>
                    <ModalFooter className='popup_footer'>
                        <span>Remember to log out on shared devices</span>
                        <span>Forgot password?</span>
                    </ModalFooter>
                </Modal>


            </div>
        )
    }
};

export default NavBar
