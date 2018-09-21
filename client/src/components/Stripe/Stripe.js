import React, { Component } from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

class Stripe extends Component {
  getStripeToken = token => {
    const request = {
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/payments/',
      data: token
    }

    // TODO: figure out what to do when this request returns
    axios(request)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  render () {
    return (
      /**
       * this is a component brought in by react-stripe-checkout
       * this component takes a lot of possible attributes but this is all that
       * is needed for now. If we need more options make sure to check the docs
       * at https://github.com/azmenak/react-stripe-checkout
       */
      <StripeCheckout
        amount={500}
        currency='USD'
        name='Quizzer'
        token={this.getStripeToken}
        stripeKey='pk_test_6pRNASCoBOKtIshFeQd4XMUh'
      />
    )
  }
}

export default Stripe
