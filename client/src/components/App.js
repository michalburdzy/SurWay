import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import NewSurvey from './NewSurvey';
import ThankYou from './ThankYou';
import Landing from './Landing';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  renderHomepage(){
    if (this.props.auth.user === false){
      return <Route path="/" exact component={Landing} />
    } else {
      return <Route path="/" exact component={Dashboard} />
    }
  }
  render() {
    return (
      <div className="container">
        <Navbar />
        <BrowserRouter>
          <div>
            {this.renderHomepage()}
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
