import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements'; 
import CheckoutForm from './components/CheckoutForm';
import { NULL } from 'graphql/language/kinds';

export default class Subscribe extends Component {
    render() {
        return (
            <StripeProvider apiKey='null'>
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