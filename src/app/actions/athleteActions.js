let nextAtheleteId = 1000;

export const addAthlete = athlete => ({
  type: 'ADD_ATHELETE',
  id: nextAtheleteId++,
  firstName: athlete.firstName,
  group: athlete.group
});

export const deleteAthlete = athlete => ({
  type: 'DELETE_ATHLETE',
  athlete
});

export const setGroupFilter = filter => ({
  type: 'SET_GROUP_FILTER',
  filter
});

export const updateAthletePresent = (id, isPresent) => ({
  type: 'UPDATE_ATHLETE_PRESENT',
  id,
  isPresent
});

export const updateAthleteGroup = (id, group) => ({
  type: 'UPDATE_ATHLETE_GROUP',
  id,
  group
});


export const addAthleteLap = (id, lap) => ({
  type: 'ADD_ATHLETE_LAP',
  id,
  lap
});

export const GroupFilters = {
  SHOW_ALL:    'SHOW_ALL',
  SHOW_GROUP1: 'SHOW_GROUP1',
  SHOW_GROUP2: 'SHOW_GROUP2',
  SHOW_GROUP3: 'SHOW_GROUP3',
  SHOW_GROUP4: 'SHOW_GROUP4'
};

export const startTimer = (id, offset) => ({
  type: 'START_TIMER',
  id,
  offset
});

export const tick = (id, time) => ({
  type: 'TICK',
  id,
  time
});

export const stopTimer = (id) => ({
  type: 'STOP_TIMER',
  id
});

export const resetTimer = (id) => ({
  type: 'RESET_TIMER',
  id
});


export const startAllFilter = (group) => ({
  type: 'START_ALL_FILTER_TIMER',
  group
});

export const stopAllFilter = (group) => ({
  type: 'STOP_ALL_FILTER_TIMER',
  group
});

export const lapAllFilter = (group) => ({
  type: 'LAP_ALL_FILTER_TIMER',
  group
});

export const resetAllFilter = (group) => ({
  type: 'RESET_ALL_FILTER_TIMER',
  group
});


export const addProgramStep = () => ({
  type: 'ADD_PROGRAM_STEP'
});

export const deleteProgramStep = (id) => ({
  type: 'DELETE_PROGRAM_STEP',
  id
});

export const updateProgramStepType = (id, stepType) => ({
  type: 'UPDATE_PROGRAM_STEP_TYPE',
  id,
  stepType
});


export const updateProgramStepDuration = (id, duration) => ({
  type: 'UPDATE_PROGRAM_STEP_DURATION',
  id,
  duration
});

export const Notification = {
  OPEN:    'OPEN',
  CLOSE:   'CLOSE'
};

export const showNotification = (message, duration) => ({
  type: 'SHOW_NOTIFICATION',
  message,
  duration
});

export const hideNotification = () => ({
  type: 'HIDE_NOTIFICATION'
});


export const tickStep = (id, time) => ({
  type: 'TICK_STEP',
  id,
  time
});


export const nextStep = (id,stepIndex,countdown,time,offset) => ({
  type: 'NEXT_STEP',
  id,
  stepIndex,
  countdown,
  time,
  offset
});



export const startInterval = (id,time,offset,stepIndex,countdown) => ({
  type: 'START_INTERVAL',
  id,
  time,
  offset,
  stepIndex,
  countdown
});

export const pauseInterval = (id) => ({
  type: 'PAUSE_INTERVAL',
  id
});
