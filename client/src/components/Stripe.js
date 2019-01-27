import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';
class Stripe extends Component {
  render() {
    return (
      <StripeCheckout
        name="SurWay"
        description="$5 for 5 credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Buy credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions,
)(Stripe);
