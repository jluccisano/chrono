/* eslint-disable no-debugger */
import uuidv4 from  'uuid/v4';
import {
  ADD_ATHELETE,
  DELETE_ATHLETE,
  UPDATE_ATHLETE_PRESENT,
  UPDATE_ATHLETE_GROUP,
  SET_GROUP_FILTER,
  ADD_ATHLETE_LAP,
  SET_CHRONO_STATE,
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  TICK,
  START_ALL_FILTER_TIMER,
  STOP_ALL_FILTER_TIMER,
  LAP_ALL_FILTER_TIMER,
  RESET_ALL_FILTER_TIMER,
  ADD_PROGRAM_STEP,
  DELETE_PROGRAM_STEP,
  UPDATE_PROGRAM_STEP_DURATION,
  UPDATE_PROGRAM_STEP_TYPE,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  NEXT_STEP,
  TICK_STEP,
  START_INTERVAL,
  PAUSE_INTERVAL
} from '../constants/ActionTypes';
import {GroupFilters, Notification} from '../actions/athleteActions';


export const groupFilter = (state = GroupFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case SET_GROUP_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export const notification = (state = {state: Notification.CLOSE, message: '', duration: 3000}, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {state: Notification.OPEN, message: action.message, duration: action.duration};
    case HIDE_NOTIFICATION:
      return {state: Notification.CLOSE};
    default:
      return state;
  }
};

//{id: '44732d8b-14e0-4c29-89a7-0adc1590c503', type: 1, duration: 0},
//{id: '44732d8b-14e0-4c29-89a7-0adc1590c502', type: 2, duration: 10}
export const programSteps = (state = [{id: '44732d8b-14e0-4c29-89a7-0adc1590c503', type: 1, duration: 0},
{id: '44732d8b-14e0-4c29-89a7-0adc1590c502', type: 2, duration: 3}], action) => {
  switch (action.type) {
    case ADD_PROGRAM_STEP:
      return [...state, {id: uuidv4(), type: 1, duration: 0}];
    case DELETE_PROGRAM_STEP:
      return state.filter((step) => step.id !== action.id);
    case UPDATE_PROGRAM_STEP_DURATION:
      {
       const updatedItems = state.map(item => {
          if(item.id === action.id){
            return { ...item, duration: parseInt(action.duration)};
          }
          return item;
        });
      return updatedItems;
      }
    case UPDATE_PROGRAM_STEP_TYPE:
      {
       const updatedItems = state.map(item => {
          if(item.id === action.id){
            return { ...item, type: action.stepType};
          }
          return item;
        });
      return updatedItems;
      }    default:
      return state;
  }
};

export const athletes = (state = [
  {
     id: 0,
     firstName: 'Nico',
     laps: [],
     group: 1,
     isPresent: true,
     timer: {time: 0, isOn: false},
     program: {stepIndex: 0, isOn: false, time: 0, countdown: false, offset: 0}
   },
   {
      id: 1,
      firstName: 'José',
      laps: [],
      group: 1,
      isPresent: false,
      timer: {time: 0, isOn: false},
      program: {stepIndex: 0, isOn: false, time: 0, countdown: false, offset: 0}
    },
    {
      id: 2,
      firstName: 'Damien',
      laps: [],
      group: 1,
      isPresent: false,
      timer: {time: 0, isOn: false},
      program: {stepIndex: 0, isOn: false, time: 0, countdown: false, offset: 0}
    },
    {
      id: 3,
      firstName: 'Mathieu',
      laps: [],
      group: 1,
      isPresent: false,
      timer: {time: 0, isOn: false},
      program: {stepIndex: 0, isOn: false, time: 0, countdown: false, offset: 0}
    },
    {
      id: 4,
      firstName: 'Sylvain',
      laps: [],
      group: 1,
      isPresent: false,
      timer: {time: 0, isOn: false},
      program: {stepIndex: 0, isOn: false, time: 0, countdown: false, offset: 0}
    },
    {
      id: 5,
      firstName: 'Thony',
      laps: [],
      group: 1,
      isPresent: false,
      timer: {time: 0, isOn: false},
      program: {stepIndex: 0, isOn: false, time: 0, countdown: false, offset: 0}
    },
    {
      id: 6,
      firstName: 'Basile',
      laps: [],
      group: 1,
      isPresent: false,
      timer: {time: 0, isOn: false},
      program: {stepIndex: 0, isOn: false, time: 0, countdown: false, offset: 0}
    }], action) => {
  switch (action.type) {
    case ADD_ATHELETE:
      return [
              ...state,
               {
                 id: action.id,
                 firstName: action.firstName,
                 laps: [],
                 group: action.group,
                 isPresent: false
               }
             ];
    case DELETE_ATHLETE:
      return state.filter(athlete => athlete !== action.athlete);
    case UPDATE_ATHLETE_PRESENT: {
       const updatedItems = state.map(item => {
          if(item.id === action.id){
            return { ...item, isPresent: action.isPresent};
          }
          return item;
        });
      return updatedItems;
      }
    case UPDATE_ATHLETE_GROUP: {
       const updatedItems = state.map(item => {
          if(item.id === action.id){
            return { ...item, group: parseInt(action.group) };
          }
          return item;
        });
      return updatedItems;
      }
    case ADD_ATHLETE_LAP: {
    //updatedItems.push(updatedItems.splice(index, 1)[0]);
       const updatedItems = state.map(item => {
          if(item.id === action.id){
            return { ...item, laps: [...item.laps, item.program.time]};
          }
          return item;
        });
      return updatedItems;
      }
    case SET_CHRONO_STATE:
      return state.map(item => {
          return { ...item, state: action.state };});

    case START_TIMER:
      {
       const updatedItems = state.map(item => {
          if(item.id === action.id){
            return { ...item, timer: { time: 0, isOn: true, offset: action.offset}};
          }
          return item;
        });
      return updatedItems;
      }

      case NEXT_STEP:
        {
         const updatedItems = state.map(item => {
            if(item.id === action.id){
              return { ...item, program: { stepIndex: action.stepIndex, time: action.time, isOn: true, countdown: action
              .countdown, offset: action.offset}};
            }
            return item;
          });
        return updatedItems;
        }
      case START_INTERVAL:
        {
         const updatedItems = state.map(item => {
            if(item.id === action.id){
              return { ...item,
                      program: {  time: action.time,
                                  isOn: true,
                                  offset: action.offset,
                                  stepIndex: action.stepIndex,
                                  countdown: action.countdown}};
            }
            return item;
          });
        return updatedItems;
        }
      case PAUSE_INTERVAL:
        {
         const updatedItems = state.map(item => {
            if(item.id === action.id){
              return { ...item, program: {...item.program, isOn: false}};
            }
            return item;
          });
        return updatedItems;
        }
    case STOP_TIMER:
     {
        const updatedItems = state.map(item => {
           if(item.id === action.id){
             return { ...item, timer: { ...item.timer, isOn: false}};
           }
           return item;
         });
       return updatedItems;
     }
    case RESET_TIMER:
     {
        const updatedItems = state.map(item => {
           if(item.id === action.id){
             return { ...item, timer: { isOn: false, time: 0, offset: 0}};
           }
           return item;
         });
       return updatedItems;
     }
    case TICK:
      {
       const updatedItems = state.map(item => {
          if(item.id === action.id){
            return { ...item, timer: { time: item.timer.time + (action.time - item.timer.offset), offset: action.time,
            isOn: true}};
          }
          return item;
        });
      return updatedItems;
      }
    case TICK_STEP:
      {
       const updatedItems = state.map(item => {
          if(item.id === action.id){
            if(item.program.countdown) {
              var newtime = item.program.time - (action.time - item.program.offset);
              var isOn = true;
              if(newtime < 0) {
                newtime = 0;
                isOn = false;
              }
              return { ...item, program: { ...item.program, time: newtime, offset: action.time,isOn: isOn}};
            } else {
              return { ...item, program: { ...item.program, time: item.program.time + (action.time - item.program.offset), offset: action.time,isOn: true}};
            }
          }
          return item;
        });
      return updatedItems;
      }
    case START_ALL_FILTER_TIMER: {
       debugger;
       const updatedItems = state.map(item => {
          if(item.id === action.id && (item.group && item.group == action.group)){
            return { ...item, timer: { time: 0, isOn: true, offset: action.offset}};
          }
          return item;
        });
      return updatedItems;
      }
    case STOP_ALL_FILTER_TIMER: {
       const updatedItems = state.map(item => {
          if(item.id === action.id && (item.group && item.group == action.group)){
             return { ...item, timer: { isOn: false, time: 0, offset: 0}};
          }
          return item;
        });
      return updatedItems;
      }
    case LAP_ALL_FILTER_TIMER: {
       const updatedItems = state.map(item => {
          if(item.id === action.id && (item.group && item.group == action.group)){
            return { ...item, laps: [...item.laps, item.timer.time]};
          }
          return item;
        });
      return updatedItems;
      }
    case RESET_ALL_FILTER_TIMER: {
       const updatedItems = state.map(item => {
          if(item.id === action.id && (item.group && item.group == action.group)){
             return { ...item, timer: { isOn: false, time: 0, offset: 0}};
          }
          return item;
        });
      return updatedItems;
      }
    default:
      return state;
  }
};