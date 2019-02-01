import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import emailValidator from '../../utils/emailValidator';
import fieldsConfig from './surveyFields'


class SurveyForm extends Component {
  renderFields() {
    return fieldsConfig.map(({ name, label }) => {
      return (
        <Field
          type="text"
          label={label}
          name={name}
          component={SurveyField}
          key={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link
            to="/"
            type="submit"
            className="red btn-flat left white-text"
          >
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            <i className="material-icons right">done</i>Next
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  let errors = {};
  errors.recipients = emailValidator(values.recipients || '')
  fieldsConfig.forEach(({ name, fieldError }) => {
    if (!values[name]) {
      errors[name] = fieldError;
    }
  });
  return errors;
}

SurveyForm = reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);

export default SurveyForm;
