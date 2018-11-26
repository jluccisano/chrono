/* eslint react/no-children-prop: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as AthleteActions from '../../actions/athleteActions';


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
            label="First Name"
            style = {{width: 150}}
          />
          <RaisedButton label="Submit" primary={true} type="submit" disabled={pristine || submitting}/>
          <RaisedButton label="Clear" type="button" disabled={pristine || submitting} onClick={reset}/>
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
