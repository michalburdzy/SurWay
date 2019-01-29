import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../actions'
import {connect } from 'react-redux'

class Dashboard extends Component {

  componentDidMount(){
    this.props.getUserSurveys()
  }
  render(){
   
    let surveys = 'No surveys'
    if(this.props.userSurveys.surveys && this.props.userSurveys.surveys.length > 0){
      surveys = this.props.userSurveys.surveys.reverse().map(survey => {
        const {title, body, subject, yes, no, createdAt, updatedAt} = survey
        return (
          <div className="col s12 m6"  key={createdAt}>
            <div className="card blue-grey lighten-4">
              <div className="card-content">
                <span className="card-title ">{subject}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              <div className="card-action">
                <h3>Feedback</h3>
                <h4>Yes: {yes}</h4>
                <h4>No: {no}</h4>
                <h5 className='blue-text text-lighten-1'>Created date: {createdAt}</h5>
                <h5 className='blue-text text-lighten-1'>Last updated: {updatedAt}</h5>
              </div>
            </div>
          </div>
        )
      })
    }
      return (
        <div>
          <h1>Your Surveys</h1>
          <div className='row'>
            <ul>
              {surveys}
            </ul>
          </div>
          <div className="">
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
