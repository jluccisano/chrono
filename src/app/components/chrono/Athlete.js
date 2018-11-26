import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as AthleteActions from '../../actions/athleteActions';

const Athlete = ({ athlete, deleteAthlete }) => {
 return (<li>{athlete.firstName} <span>Groupe:{athlete.group}</span> <button onClick={() => deleteAthlete(athlete)
 }>DELETE</button></li>);
};

Athlete.propTypes = {
  athlete: PropTypes.object.isRequired,
  deleteAthlete: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    deleteAthlete: athlete => dispatch(AthleteActions.deleteAthlete(athlete))
  };
};

export default connect(null, mapDispatchToProps)(Athlete);

