import React from 'react';
import PropTypes from 'prop-types';
import * as AthleteActions from '../../actions/athleteActions';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';

const Link = ({name, filter, setFilter}) => {
  return (
     <FlatButton style={{minWidth: '5px'}} label={name} primary={true} onClick={e => { e.preventDefault(); setFilter(filter); }}/>
  );
};

Link.propTypes = {
  filter: PropTypes.string,
  name: PropTypes.string,
  setFilter: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: group => dispatch(AthleteActions.setGroupFilter(group))
  };
};

export default connect(null, mapDispatchToProps)(Link);
