import React, { Component } from 'react'

import Stripe from '../Stripe/Stripe'

import './Billing.css'

class Billing extends Component {
  render () {
    return (
      <div>
        <h1>Billing</h1>

        {/**
          * this is a component brought in by react-stripe-checkout
          * this component takes a lot of possible attributes but this is all that
          * is needed for now. If we need more options make sure to check the docs
          * at https://github.com/azmenak/react-stripe-checkout
          *
          * TODO: dynamically set the currency attribute depending on the users
          *       location
          */}
        <Stripe />
      </div>
    )
  }
}

export default Billing
