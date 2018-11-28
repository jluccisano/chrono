import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import * as AthleteActions from '../../actions/athleteActions';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


const AthleteTable = ({athletes, updateAthletePresent, updateAthleteGroup}) => {

const styles = {
  toggle: {
    marginBottom: 16
  }
};
//style={{ width: 'auto', tableLayout: 'auto' }}
return (
  <Table fixedHeader={true}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Nom</TableHeaderColumn>
        <TableHeaderColumn>Groupe (1/2/3/4)</TableHeaderColumn>
        <TableHeaderColumn>Présent</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {athletes.map(athlete => (
       <TableRow key={athlete.id}>
              <TableRowColumn style={{ width: '20%', paddingLeft: '4px', paddingRight: '1px' }}>{athlete
              .firstName}</TableRowColumn>
              <TableRowColumn style={{ width: '50%', paddingLeft: '4px', paddingRight: '1px'}}><RadioButtonGroup
              labelPosition="left"
                                                name="status"
                                                defaultSelected="1"
                                                onChange={(e, value) => updateAthleteGroup(athlete.id,value)}>
                              <RadioButton style={{ display: 'inline-block', width: '35px' , marginLeft: '1px' }}
                              label="" value="1"/>
                              <RadioButton style={{ display: 'inline-block', width: '35px', marginLeft: '1px' }}
                              label="" value="2" />
                              <RadioButton style={{ display: 'inline-block', width: '35px', marginLeft: '1px' }}
                              label="" value="3" />
                              <RadioButton style={{ display: 'inline-block', width: '35px', marginLeft: '1px' }}
                              label="" value="4" />
                              </RadioButtonGroup>
              </TableRowColumn>
              <TableRowColumn style={{ width: '30%', paddingLeft: '20px', paddingRight: '1px'}}>
                <Toggle style={styles.toggle} onToggle={(e,isInputChecked) => updateAthletePresent(athlete.id,isInputChecked)}/>
              </TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>);
};

AthleteTable.propTypes = {
  athletes: PropTypes.array,
  updateAthletePresent: PropTypes.func,
  updateAthleteGroup: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    updateAthletePresent: (id, isPresent) => dispatch(AthleteActions.updateAthletePresent(id, isPresent)),
    updateAthleteGroup: (id, group) => dispatch(AthleteActions.updateAthleteGroup(id, group))
  };
};

const mapStateToProps = state => ({
  athletes: state.athletes
});

export default connect(mapStateToProps, mapDispatchToProps)(AthleteTable);
