import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Stripe from './Stripe';

class Navbar extends Component {
  renderContent() {
    if (
      this.props.auth.user === false ||
      this.props.auth.user === undefined ||
      this.props.auth.user.name === undefined
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
        <li key="credits">
          &nbsp;Credits: {this.props.auth.user.credits}&nbsp;
        </li>,
        <li key="user">{this.props.auth.user.name}</li>,
        <li key="google">
          <a href="/api/logout">Logout</a>
        </li>
      ];
    }
  }
  render() {
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
  actions
)(Navbar);
