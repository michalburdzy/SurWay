import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import NewSurvey from './NewSurvey';
import ThankYou from './ThankYou';
const Landing = () => <div>LANDING</div>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <Navbar />
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Dashboard} />
            <Route path="/surveys/new" exact component={() => NewSurvey} />
            <Route path="/api/surveys/:id/:choice" exact component={ThankYou} />
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
  actions
)(App);
