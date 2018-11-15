import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Stripe from './Stripe';

class Navbar extends Component {
  renderContent() {
    if (
      this.props.user === false ||
      this.props.user === undefined ||
      this.props.user.name === undefined
    ) {
      return (
        <li>
          <a href="/auth/google">Login</a>
        </li>
      );
    } else {
      return [
        <li key="stripe">
          <Stripe />
        </li>,
        <li key="credits">&nbsp;Credits: {this.props.user.credits}&nbsp;</li>,
        <li key="user">{this.props.user.name}</li>,
        <li key="google">
          <a href="/api/logout">Logout</a>
        </li>,
      ];
    }
  }
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo left">
            Logo
          </a>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  actions,
)(Navbar);
