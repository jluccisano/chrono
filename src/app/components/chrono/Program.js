/* eslint react/no-children-prop: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as AthleteActions from '../../actions/athleteActions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';


const style = {
  marginRight: 20,
};
//style={{ width: 'auto', tableLayout: 'auto' }}
const Program = props => {
  const {addProgramStep, deleteProgramStep, updateProgramStepType, updateProgramStepDuration, programSteps} = props;

  return (
      <div>
        <FloatingActionButton style={style}  onClick={() => addProgramStep()}>
            <ContentAdd />
        </FloatingActionButton>
        <Table fixedHeader={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Type</TableHeaderColumn>
                <TableHeaderColumn>Duration (secs)</TableHeaderColumn>
                <TableHeaderColumn>Delete</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {programSteps.map(step => (
               <TableRow key={step.id}>
                      <TableRowColumn style={{ width: '40%' }}>
                          <SelectField
                            autoWidth={true}
                            floatingLabelText="type"
                            value={step.type || ''}
                            onChange={(e, key, value) => updateProgramStepType(step.id, value)}>
                            <MenuItem value={1} primaryText="Run" />
                            <MenuItem value={2} primaryText="Rest" />
                          </SelectField>
                      </TableRowColumn>
                      <TableRowColumn style={{ width: '40%' }}>
                        <TextField
                            label="Rest"
                            value={step.duration || 0}
                            onChange={(e, value) => updateProgramStepDuration(step.id, value)}
                            type="number"
                          />
                      </TableRowColumn>
                      <TableRowColumn style={{ width: '20%' }}>
                          <FloatingActionButton style={style}  onClick={() => deleteProgramStep(step.id)}>
                               <ActionDelete />
                          </FloatingActionButton>
                      </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </div>
  );
};

Program.propTypes = {
  addProgramStep: PropTypes.func,
  deleteProgramStep: PropTypes.func,
  updateProgramStepDuration: PropTypes.func,
  updateProgramStepType: PropTypes.func,
  programSteps: PropTypes.array
};

const mapDispatchToProps = dispatch => {
  return {
    addProgramStep: () => dispatch(AthleteActions.addProgramStep()),
    deleteProgramStep: (id) => dispatch(AthleteActions.deleteProgramStep(id)),
    updateProgramStepDuration: (id, duration) => dispatch(AthleteActions.updateProgramStepDuration(id, duration)),
    updateProgramStepType: (id, type) => dispatch(AthleteActions.updateProgramStepType(id, type))

  };
};

const mapStateToProps = state => ({
  programSteps: state.programSteps
});


export default connect(
	mapStateToProps,
	mapDispatchToProps)(Program);
