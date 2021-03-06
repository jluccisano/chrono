/* eslint-disable no-debugger */
/* eslint-disable react/no-string-refs */
import React from 'react';
import {connect} from 'react-redux';
import './_Chrono.scss';
import Chrono from './Chrono';
import FilterLinks from './FilterLinks';
import ControlLinks from './ControlLinks';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {GroupFilters} from '../../actions/athleteActions';
import Notification from './Notification';
import {List, ListItem} from 'material-ui/List';


const showGroup = (athletes, filter) => {
  switch (filter) {
    case GroupFilters.SHOW_ALL:
      return athletes.filter(athlete => athlete.isPresent);
    case GroupFilters.SHOW_GROUP1:
      return athletes.filter(athlete => athlete.group == 1 && athlete.isPresent);
    case GroupFilters.SHOW_GROUP2:
      return athletes.filter(athlete => athlete.group == 2 && athlete.isPresent);
    case GroupFilters.SHOW_GROUP3:
      return athletes.filter(athlete => athlete.group == 3 && athlete.isPresent);
    case GroupFilters.SHOW_GROUP4:
      return athletes.filter(athlete => athlete.group == 4 && athlete.isPresent);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

class Serie extends React.Component {

  constructor(props) {
      super(props);
      this.chronos = [];
  }

  render() {
    const athleteItems = _.map(this.props.athletes, athlete => <ListItem key={athlete.id}><Chrono
    athlete={athlete}/></ListItem>);
    return (
      <div>
        <FilterLinks/>
        <ControlLinks/>
        <List>{athleteItems}</List>
        <Notification/>
      </div>);

  }
}

Serie.propTypes = {
  athletes: PropTypes.array
};

const mapStateToProps = state => ({
  athletes: showGroup(state.athletes, state.groupFilter)
});

export default connect(mapStateToProps, null)(Serie);
