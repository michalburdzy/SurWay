import React, { Component } from 'react';
import SurveyForm from './form/SurveyForm';
import SurveyReview from './form/SurveyFormReview';
import {reduxForm} from 'redux-form'

class NewSurvey extends Component {
  state = {showReview: false}

  renderContent(){
    if(this.state.showReview){
      return (
          <SurveyReview onBackToTheForm={() => this.setState({showReview: false})}/>
      );
    }
    return <SurveyForm onSurveySubmit={() => this.setState({showReview: true})} />
  }
  render() {
    return(
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'form'
})(NewSurvey);
