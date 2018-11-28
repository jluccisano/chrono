/* eslint react/no-children-prop: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import * as AthleteActions from '../../actions/athleteActions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import Clear from 'material-ui/svg-icons/content/clear';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    id="1"
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const AddAthlete = props => {
  const { handleSubmit, pristine, reset, submitting, addAthlete } = props;
  const submit = values => {
    addAthlete(values);
  };
  return (
      <form onSubmit={handleSubmit(submit)}>
        <div style={{ display: 'inline-block' }}>
          <Field
            name="firstName"
            component={renderTextField}
            label="Nom"
            style = {{width: 150}}
          />
          <FloatingActionButton label="Submit" mini={true} type="submit" disabled={pristine || submitting}>
            <Add/>
          </FloatingActionButton>
          <FloatingActionButton label="Clear" mini={true} secondary={true} type="button" disabled={pristine || submitting} onClick={reset}>
            <Clear/>
          </FloatingActionButton>
        </div>
      </form>
  );
};

AddAthlete.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  addAthlete: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    addAthlete: athlete => dispatch(AthleteActions.addAthlete(athlete))
  };
};


export default connect(
	null,
	mapDispatchToProps
)(reduxForm({
	form: 'sampleForm',
	onSubmit: values => values
})(AddAthlete));
