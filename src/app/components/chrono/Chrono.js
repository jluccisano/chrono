/* eslint-disable no-debugger */

import React from 'react';
import {connect} from 'react-redux';
import './_Chrono.scss';
import * as AthleteActions from '../../actions/athleteActions';
import PropTypes from 'prop-types';
import uuidv4 from  'uuid/v4';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {GridList, GridTile} from 'material-ui/GridList';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Reset from 'material-ui/svg-icons/av/replay';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ElapsedTime from './ElapsedTime';

const styles = {
  chip: {
    margin: 4
  },
  button:{
    marginRight: 5,
  }
};

class Chrono extends React.Component {

  constructor(props) {
    super(props);

    if(this.props.athlete.program.isOn) {
         this.progressInterval();
    }
  }

  componentWillUnmount() {
		if (this._interval) cancelAnimationFrame(this._interval);
	}

	nextInterval() {
    var currentTime = Date.now();
    //this._interval = requestAnimationFrame(this.progressStep);

    var nextIndex = this.props.athlete.program.stepIndex + 1;

    if(this.props.programSteps.length > 0) {

        if(nextIndex <= this.props.programSteps.length) {
          var nextStep =  this.props.programSteps[nextIndex-1];
          if(nextStep.type == 2) {
             var expireAt = nextStep.duration * 1000; //sec to milliseconds
             this._interval = requestAnimationFrame(this.progressInterval);
             this.props.startInterval(this.props.athlete.id, expireAt, currentTime, nextIndex, true);
          } else {
             this._interval = requestAnimationFrame(this.progressInterval);
             this.props.startInterval(this.props.athlete.id, 0, currentTime, nextIndex, false);
          }

        } else {
             //Training finish
             //lap
             //stop
             this.props.stopTimer(this.props.athlete.id);
             //notification
             this.pause();
             this.props.showNotification('Fini ' + this.props.athlete.firstName  + ' !!!', 3000);
        }

    } else {
            this._interval = requestAnimationFrame(this.progressInterval);
            this.props.startInterval(this.props.athlete.id,0, currentTime, nextIndex);
    }
	}

	progressInterval = () => {
      // check if a rest step so stop and lap
      if(this.props.athlete.program.time <= 0 && this.props.athlete.program.countdown) {
          this.props.showNotification('Allez ' + this.props.athlete.firstName  + ' !!!', 3000);
          cancelAnimationFrame(this._interval);
          this.nextInterval();
      } else {
          this.props.tickStep(this.props.athlete.id,  Date.now());
          this._interval = requestAnimationFrame(this.progressInterval);
      }
	}

  start() {
     var currentTime =  Date.now();
     if(!this.props.athlete.timer.isOn) {
        this.props.startTimer(this.props.athlete.id, currentTime);
        this.nextInterval();
     } else {
        this.resume(currentTime);
     }
  }

  resume(currentTime) {
      this._interval = requestAnimationFrame(this.progressInterval);
      this.props.startInterval(this.props.athlete.id, this.props.athlete.program.time, currentTime, this.props.athlete.program.stepIndex);
  }

	pause() {
    cancelAnimationFrame(this._interval);
    this.props.pauseInterval(this.props.athlete.id);
  }


	lap() {
     this.props.addAthleteLap(this.props.athlete.id);
     this.nextInterval();
     this.props.updateOrder(this.props.athlete.id);
  }

  reset() {
    cancelAnimationFrame(this._interval);
    this.props.resetTimer(this.props.athlete.id);
  }

  stop() {
      cancelAnimationFrame(this._interval);
  }


  format(time) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time;
      }
      return time;
    };

    time = new Date(time);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2);

    return `${m}:${s}`;
  }


  formatLap(time) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time;
      }
      return time;
    };

    time = new Date(time);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2);
    let ms = pad(time.getMilliseconds().toString(), 3);

    return `${m}:${s}:${ms}`;
  }

  render() {
    var lapsList = this.props.athlete.laps.map((lap, index) => {
        return <GridTile style={{'font-size': '0.70em'}} key={uuidv4()}>{index+1 + ': ' + this.formatLap(lap)}</GridTile>;
    });

    return (
      <div>
        <section className="Chrono">
          <Chip style={styles.chip}>
             <Avatar size={32}>{this.props.athlete.firstName.substring(0,1)}</Avatar>{this.props.athlete.firstName}
          </Chip>
          <ElapsedTime athlete={this.props.athlete}/>
          <h1 style={{backgroundColor: this.props.athlete.program.countdown ? 'rgba(202, 51,86, .3)' : 'rgba(51, 178,  202, .3)'}}>{this.format(this.props.athlete.program.time)}</h1>
          <span>{this.props.athlete.program.stepIndex}</span>
          <div>
            <FloatingActionButton mini={true} style={styles.button} onClick={() => {this.props.athlete.program.isOn ? this
            .pause() : this.start();}}>
              { this.props.athlete.program.isOn ? <Pause/> : <Play/>}
             </FloatingActionButton>
            <FloatingActionButton mini={true} style={styles.button} onClick={() => this.lap()}>
                  <Reset/>
             </FloatingActionButton>
          </div>
          <GridList cols={2} cellHeight={'auto'} padding={1}>
              { lapsList }
          </GridList>
        </section>
      </div>
    );
  }

}

Chrono.propTypes = {
  addAthleteLap: PropTypes.func,
  athlete: PropTypes.object,
  startTimer: PropTypes.func,
  resetTimer: PropTypes.func,
  tick: PropTypes.func,
  showNotification: PropTypes.func,
  programSteps: PropTypes.array,
  tickStep: PropTypes.func,
  nextStep: PropTypes.func,
  startInterval: PropTypes.func,
  pauseInterval: PropTypes.func,
  stopTimer: PropTypes.func,
  updateOrder: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    addAthleteLap: id => dispatch(AthleteActions.addAthleteLap(id)),
    resetTimer: id => dispatch(AthleteActions.resetTimer(id)),
    tick: (id,time) => dispatch(AthleteActions.tick(id,time)),
    showNotification: (message, duration) => dispatch(AthleteActions.showNotification(message, duration)),
    tickStep: (id,time) => dispatch(AthleteActions.tickStep(id,time)),
    nextStep: (id,stepIndex,countdown,time,offset) => dispatch(AthleteActions.nextStep(id,stepIndex,countdown,time,offset)),
    startInterval: (id, time, offset,stepIndex,countdown) => dispatch(AthleteActions.startInterval(id, time, offset,stepIndex,countdown )),
    startTimer: (id, offset) => dispatch(AthleteActions.startTimer(id, offset )),
    stopTimer: id => dispatch(AthleteActions.stopTimer(id)),
    pauseInterval: id => dispatch(AthleteActions.pauseInterval(id)),
    updateOrder: id => dispatch(AthleteActions.updateOrder(id))
  };
};

const mapStateToProps = state => ({
  programSteps: state.programSteps
});


export default connect(mapStateToProps, mapDispatchToProps)(Chrono);
