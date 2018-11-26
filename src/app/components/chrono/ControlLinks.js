/* eslint-disable no-debugger */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import {GroupFilters, startAllFilter, stopAllFilter, lapAllFilter, resetAllFilter} from '../../actions/athleteActions';


const filterToGroup = filter => {
  switch (filter) {
    case GroupFilters.SHOW_ALL:
      return null;
    case GroupFilters.SHOW_GROUP1:
      return 1;
    case GroupFilters.SHOW_GROUP2:
      return 2;
    case GroupFilters.SHOW_GROUP3:
      return 3;
    case GroupFilters.SHOW_GROUP4:
      return 4;
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

export class ControlLinks extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const style = {
      margin: 12,
    };

    return (<div>
       <RaisedButton label="Start" secondary={true} style={style} onClick={() => this.props.startAllFilter(this.props.groupFilter)} />
       <RaisedButton label="Stop" secondary={true} style={style} onClick={() => this.props.stopAllFilter(this.props.groupFilter)} />
       <RaisedButton label="Lap" secondary={true} style={style} onClick={() => this.props.lapAllFilter(this.props.groupFilter)} />
       <RaisedButton label="Reset" secondary={true} style={style} onClick={() => this.props.resetAllFilter(this.props.groupFilter)} />
     </div>);
  }
}

ControlLinks.propTypes = {
  startAllFilter: PropTypes.func,
  stopAllFilter: PropTypes.func,
  lapAllFilter: PropTypes.func,
  resetAllFilter: PropTypes.func,
  groupFilter: PropTypes.number
};


const mapStateToProps = state => ({
  groupFilter: filterToGroup(state.groupFilter)
});

const mapDispatchToProps = (dispatch) => {
  return {
    startAllFilter: (groupFilter) => dispatch(startAllFilter(groupFilter)),
    stopAllFilter: (groupFilter) => dispatch(stopAllFilter(groupFilter)),
    lapAllFilter: (groupFilter) => dispatch(lapAllFilter(groupFilter)),
    resetAllFilter: (groupFilter) => dispatch(resetAllFilter(groupFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlLinks);
