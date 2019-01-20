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
    let surveys = 'No surveys'
    if(this.props.userSurveys.surveys && this.props.userSurveys.surveys.length > 0){
      surveys = this.props.userSurveys.surveys.map(survey => {
        const {title, body, subject, yes, no} = survey
        return (
          <div className="row" key={title}>
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{title}</span>
                <h3>{subject}</h3>
                <p>{body}</p>
              </div>
              <div className="card-action">
                <h3>Feedback</h3>
                <h4>Yes: {yes}</h4>
                <h4>No: {no}</h4>
              </div>
            </div>
          </div>
        </div>
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
