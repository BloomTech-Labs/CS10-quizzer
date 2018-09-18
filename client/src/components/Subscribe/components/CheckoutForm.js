import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(e) {
        //when user clicks submit...
    }

    render() {
        return (
            <div className="checkout">
                <p> Is that your final answer? </p>
                <CardElement />
                <button onClick={ this.submit }> Submit </button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);