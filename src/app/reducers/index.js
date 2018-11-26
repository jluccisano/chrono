import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {athletes, groupFilter, programSteps, notification} from './chronoReducer';
import {reducer as formReducer} from 'redux-form';

const errorMessage = (state = null, action) => {
  const {error} = action;
  if (error) {
    return error;
  }
  return state;
};

const rootReducer = combineReducers({
  errorMessage,
  routing: routerReducer,
  athletes,
  groupFilter,
  programSteps,
  notification,
  form: formReducer
});

export default rootReducer;
