import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements'; 
import CheckoutForm from './components/CheckoutForm';

export default class Subscribe extends Component {
    render() {
        return (
            <StripeProvider apiKey={`process.env.STRIPE_API_KEY`}>
                <div>
                    <h1>Generic title or something</h1>
                    <Elements>
                        <CheckoutForm/>
                    </Elements>
                </div>
            </StripeProvider>
        );
    }
}