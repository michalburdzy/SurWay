import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';

const Landing = () => <div>LANDING</div>;
const Dashboard = () => <div>DASHBOARD</div>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <Navbar />
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" exact component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  actions,
)(App);
