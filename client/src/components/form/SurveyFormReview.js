import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import fieldsConfig from './surveyFields'
import * as actions from '../../actions'
const SurveyReview = ({onBackToTheForm, form, sendSurvey, history}) => {
  const renderFields = 
    fieldsConfig.map(field =>{
      return (
        <div key={field.name}>
          <label>
            field.label
            <h4>{form[field.name]}</h4>
          </label>
        </div>
      )
    })

  return (<div>
    <h3>Please review your survey</h3>
    <div>
      {renderFields}
    </div>
    <button className='yellow darken-3 btn-flat white-text' onClick={onBackToTheForm}>Back</button>
    <button className='btn-flat green right white-text' onClick={() => sendSurvey(form, history)}>
      Send survey
      <i className='material-icons right'>email</i>  
    </button>
  </div>)
}

const mapStateToProps = state => {
  return {
    form: state.form.surveyForm.values
  }
}
export default connect(mapStateToProps, actions)(withRouter(SurveyReview))