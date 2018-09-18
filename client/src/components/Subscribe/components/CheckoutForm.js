import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        //when user clicks submit...
            let {token} = await this.props.stripe.createToken({name: "Name"});
            let response = await fetch("/charge", {
              method: "POST",
              headers: {"Content-Type": "text/plain"},
              body: token.id
            });
        console.log(token.id)
        if (response.ok) this.setState({ complete: true });

        
    }

    render() {
        this.state.complete ? alert("Thank You!") : alert("There was a problem with your payment...");

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