import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(e) {

    }

    render() {
        return (
            <div>
                <p> Are you ready to submit? </p>
                <CardElement />
                <button onClick={ this.submit }> Send </button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);