import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../actions'
import {connect } from 'react-redux'

class Dashboard extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.getUserSurveys()
  }
  render(){
    console.log(this.props)
    let surveys = 'No surveys'
    if(this.props.userSurveys.surveys && this.props.userSurveys.surveys.length > 0){
      surveys = this.props.userSurveys.surveys.map(survey => {
        return (
          <li key={survey.title}>
            <h3>{survey.title}</h3>
          </li>
        )
      })
    }
      return (
        <div>
          <ul>
            {surveys}
          </ul>
          <div className="fixed-action-btn">
            <Link
              to="/surveys/new"
              className="btn-floating btn-large waves-effect waves-light red"
              >
              <i className="material-icons">add</i>
            </Link>
          </div>
      </div>
    );
}
};

const mapStateToProps = state => {
  const {getUserSurveys, userSurveys} = state
  return {getUserSurveys, userSurveys}
}

export default connect(mapStateToProps, actions)(Dashboard);
