import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import NewSurvey from './NewSurvey';
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
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/surveys/new" exact component={NewSurvey} />
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
