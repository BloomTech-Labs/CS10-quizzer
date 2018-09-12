import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './NavBar.css'

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signup_modal: false,
            login_modal: false
        }

        this.toggle_signup = this.toggle_signup.bind(this);
        this.toggle_login = this.toggle_login.bind(this);
    }

    toggle_signup() {
        this.setState({
            signup_modal: !this.state.signup_modal
        });
    }

    toggle_login() {
        this.setState({
            login_modal: !this.state.login_modal
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
                <Modal className='signup_login_modal' isOpen={this.state.signup_modal} toggle={this.toggle_signup}>
                    <ModalHeader className='signup_login_modal_header'>
                        <span>Sign up for free to create study sets</span>
                    </ModalHeader>
                    <ModalBody className='signup_login_modal_body'>
                        <div className='modal_div'>
                            <span>USERNAME</span>
                            <input type='text' name='username' />
                        </div>
                        <div className='modal_div'>
                            <span>EMAIL</span>
                            <input type='email' name='email' />
                        </div>
                        <div className='modal_div'>
                            <span>PASSWORD</span>
                            <input type='password' name='password' />
                        </div>
                        <div className='modal_div'>
                            <span>CONFIRM PASSWORD</span>
                            <input type='password' name='password' />
                        </div>
                        <div className='modal_div'>
                            <span className='modal_text'>By clicking Sign up, you accept Quzzer's <span>Terms of Service</span> and <span>Privacy Policy</span></span>
                            <Button color="info" className='signup_login_modal_button'>Sign up</Button>
                        </div>
                    </ModalBody>
                    <ModalFooter className='signup_login_modal_footer'>
                        <span>Already have an account? <span className='signup_login_modal_login'>Log in</span></span>
                    </ModalFooter>
                </Modal>
                <Modal className='signup_login_modal' isOpen={this.state.login_modal} toggle={this.toggle_login}>
                    <ModalHeader className='signup_login_modal_header'>
                        <span>Log in</span>
                    </ModalHeader>
                    <ModalBody className='signup_login_modal_body'>
                        <div className='modal_div'>
                            <span>USERNAME OR EMAIL</span>
                            <input type='text' name='username' />
                        </div>
                        <div className='modal_div'>
                            <span>PASSWORD</span>
                            <input type='password' name='password' />
                        </div>
                        <div className='modal_div'>
                            <Button color="info" className='signup_login_modal_button'>Log in</Button>
                        </div>
                    </ModalBody>
                    <ModalFooter className='signup_login_modal_footer'>
                        <span className='modal_text'>Remember to log out on shared devices. <span>Forgot password?</span></span>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
};

export default NavBar
